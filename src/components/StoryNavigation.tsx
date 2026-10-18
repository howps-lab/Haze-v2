import React from 'react';
import { BookOpen, Layers } from 'lucide-react';

interface StoryNavigationProps {
  currentStoryIndex: number;
  onSelectStory: (index: number) => void;
  viewMode: 'vertical' | 'slides';
  onToggleViewMode: () => void;
}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentStoryIndex,
  onSelectStory,
  viewMode,
  onToggleViewMode,
}) => {
  const stories = [
    { num: 1, id: 'story-1', title: 'The Haze Is Back' },
    { num: 2, id: 'story-2', title: 'Check This First' },
    { num: 3, id: 'story-3', title: 'What PM2.5 Means' },
    { num: 4, id: 'story-4', title: 'Extra Care' },
    { num: 5, id: 'story-5', title: 'Do You Need N95?' },
    { num: 6, id: 'story-6', title: 'What Else Can You Do?' },
    { num: 7, id: 'story-7', title: 'Protect Loved Ones' },
  ];

  return (
    <div className="sticky top-0 z-40 bg-[#102D50]/95 backdrop-blur-md text-white border-b border-[#FFD34E]/40 px-3 py-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Brand Tag */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#D9272E] text-white font-display flex items-center justify-center font-black text-xs shadow-sm">
            SG
          </div>
          <span className="font-display tracking-wider text-sm sm:text-base text-white uppercase font-black">
            THE HAZE <span className="text-[#FFD34E]">GUIDE</span>
          </span>
        </div>

        {/* Center: Story Jump Buttons (1 to 7) */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {stories.map((story, idx) => {
            const isActive = currentStoryIndex === idx;
            return (
              <button
                key={story.id}
                onClick={() => onSelectStory(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFD34E] text-[#102D50] shadow-sm font-black scale-105'
                    : 'bg-[#173d6b] text-[#D9EEFA] hover:bg-[#204c82] hover:text-white'
                }`}
                title={story.title}
                aria-label={`Jump to Story ${story.num}: ${story.title}`}
              >
                <span className="font-display">{story.num}</span>
                <span className="hidden md:inline text-[11px] font-medium">{story.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <button
            onClick={onToggleViewMode}
            className="px-2.5 py-1 rounded-lg bg-[#D9272E] text-white hover:bg-[#b81d23] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Toggle between scroll flow and slide viewer"
          >
            {viewMode === 'vertical' ? (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Slides Mode</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scroll Flow</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
