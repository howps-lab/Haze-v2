import React, { useEffect, useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HazeData, SingaporeRegion } from './types/haze';
import { fetchHazeData } from './services/hazeApi';
import { classifyPM25 } from './utils/hazeClassifier';
import { LiveClock } from './components/LiveClock';
import { StoryNavigation } from './components/StoryNavigation';
import { RegionalReadings } from './components/RegionalReadings';
import { PosterModal } from './components/PosterModal';
import { SlideViewer } from './components/SlideViewer';
import { OfficialSourceFooter } from './components/OfficialSourceFooter';

// Story Sections
import { HeroSection } from './components/sections/HeroSection';
import { ActivitySection } from './components/sections/ActivitySection';
import { PM25ExplainerSection } from './components/sections/PM25ExplainerSection';
import { VulnerableGroupsSection } from './components/sections/VulnerableGroupsSection';
import { MaskGuidanceSection } from './components/sections/MaskGuidanceSection';
import { PracticalPrecautionsSection } from './components/sections/PracticalPrecautionsSection';
import { FamilyProtectionSection } from './components/sections/FamilyProtectionSection';

export default function App() {
  const [realHazeData, setRealHazeData] = useState<HazeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextPollSeconds, setNextPollSeconds] = useState<number>(60);
  const [selectedRegion, setSelectedRegion] = useState<SingaporeRegion | 'All'>('All');

  // View mode: 'vertical' (scroll campaign) vs 'slides' (interactive slide reader)
  const [viewMode, setViewMode] = useState<'vertical' | 'slides'>('vertical');
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  // Full-size poster inspection modal
  const [posterModal, setPosterModal] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    caption: string;
    num: number;
  }>({
    isOpen: false,
    imageSrc: '',
    title: '',
    caption: '',
    num: 1,
  });

  // Load official data
  const loadData = useCallback(async (forceRefresh: boolean = false) => {
    setIsLoading(true);
    try {
      const data = await fetchHazeData(forceRefresh);
      setRealHazeData(data);
      setNextPollSeconds(60);
    } catch (err) {
      console.error('Failed to load official haze data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and 60-second auto-poll interval
  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      setNextPollSeconds((prev) => {
        if (prev <= 1) {
          loadData();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Track active section on scroll in vertical mode
  useEffect(() => {
    if (viewMode !== 'vertical') return;

    const storyIds = ['story-1', 'story-2', 'story-3', 'story-4', 'story-5', 'story-6', 'story-7'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = storyIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(storyIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentStoryIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  // Smooth scroll handler
  const handleScrollToStory = (storyId: string) => {
    if (viewMode === 'slides') {
      const idx = ['story-1', 'story-2', 'story-3', 'story-4', 'story-5', 'story-6', 'story-7'].indexOf(storyId);
      if (idx !== -1) setCurrentStoryIndex(idx);
      return;
    }
    const el = document.getElementById(storyId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStory = (idx: number) => {
    setCurrentStoryIndex(idx);
    if (viewMode === 'vertical') {
      const el = document.getElementById(`story-${idx + 1}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenPoster = (src: string, title: string, caption: string, num: number) => {
    setPosterModal({
      isOpen: true,
      imageSrc: src,
      title,
      caption,
      num,
    });
  };

  // Derive effective haze data taking regional filter into account
  const effectiveData: HazeData | null = React.useMemo(() => {
    if (!realHazeData) return null;

    // If a specific region is filtered:
    if (selectedRegion !== 'All') {
      const regMatch = realHazeData.regions.find((r) => r.region === selectedRegion);
      if (regMatch && regMatch.pm25 !== null && regMatch.pm25 !== undefined) {
        return {
          ...realHazeData,
          pm25: regMatch.pm25,
          psi: regMatch.psi ?? realHazeData.psi,
          currentStatus: classifyPM25(regMatch.pm25),
        };
      }
    }

    return realHazeData;
  }, [realHazeData, selectedRegion]);

  return (
    <div className="min-h-screen bg-[#FFF5E7] flex flex-col font-sans selection:bg-[#FFD34E] selection:text-[#102D50]">
      {/* Top Live Singapore Clock Header with Slides Mode button on far right of Refresh */}
      <LiveClock
        hazeData={realHazeData}
        isLoading={isLoading}
        onRefresh={() => loadData(true)}
        nextPollSeconds={nextPollSeconds}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode((m) => (m === 'vertical' ? 'slides' : 'vertical'))}
      />

      {/* Sticky Story Navigation */}
      <StoryNavigation
        currentStoryIndex={currentStoryIndex}
        onSelectStory={handleSelectStory}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'vertical' ? (
          <div>
            {/* Story 1: Hero */}
            <HeroSection
              hazeData={effectiveData}
              onOpenPoster={handleOpenPoster}
              onScrollToStory={handleScrollToStory}
            />

            {/* Regional Map & Filter Strip */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 my-4">
              <RegionalReadings
                hazeData={realHazeData}
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
              />
            </div>

            {/* Story 2: Going Out Activity Guide */}
            <ActivitySection
              hazeData={effectiveData}
              isLoading={isLoading}
              onRefresh={() => loadData(true)}
              onOpenPoster={handleOpenPoster}
            />

            {/* Story 3: What Does Your PM2.5 Reading Mean? */}
            <PM25ExplainerSection
              hazeData={effectiveData}
              onOpenPoster={handleOpenPoster}
              onScrollToStory={handleScrollToStory}
            />

            {/* Story 4: Some People Need Extra Care */}
            <VulnerableGroupsSection
              hazeData={effectiveData}
              onOpenPoster={handleOpenPoster}
              onScrollToStory={handleScrollToStory}
            />

            {/* Story 5: Do You Need an N95? Not Always. */}
            <MaskGuidanceSection
              onOpenPoster={handleOpenPoster}
              onScrollToStory={handleScrollToStory}
            />

            {/* Story 6: What Else Can You Do? */}
            <PracticalPrecautionsSection
              onOpenPoster={handleOpenPoster}
              onScrollToStory={handleScrollToStory}
            />

            {/* Story 7: Protect the People You Love */}
            <FamilyProtectionSection
              hazeData={effectiveData}
              onOpenPoster={handleOpenPoster}
            />
          </div>
        ) : (
          <SlideViewer
            currentStoryIndex={currentStoryIndex}
            onSelectStory={setCurrentStoryIndex}
            hazeData={effectiveData}
            onOpenPoster={handleOpenPoster}
          />
        )}
      </main>

      {/* Official Government Source & Attribution Footer */}
      <OfficialSourceFooter hazeData={realHazeData} />

      {/* Full-size Poster Modal */}
      <PosterModal
        isOpen={posterModal.isOpen}
        onClose={() => setPosterModal((p) => ({ ...p, isOpen: false }))}
        imageSrc={posterModal.imageSrc}
        title={posterModal.title}
        caption={posterModal.caption}
        storyNumber={posterModal.num}
      />
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
