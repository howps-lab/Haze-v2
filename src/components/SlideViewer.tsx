import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HazeData } from '../types/haze';
import { getClassificationDetails } from '../utils/hazeClassifier';

interface SlideViewerProps {
  currentStoryIndex: number;
  onSelectStory: (index: number) => void;
  hazeData: HazeData | null;
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentStoryIndex,
  onSelectStory,
  hazeData,
  onOpenPoster,
}) => {
  const slides = [
    {
      num: 1,
      image: '/images/story01.png',
      title: 'THE HAZE IS BACK',
      subtitle: 'Singapore air quality enters the unhealthy range',
      focus: 'Check highest 1-Hour PM2.5 readings before planning outdoor commutes or exercise.',
    },
    {
      num: 2,
      image: '/images/story02.png',
      title: 'GOING OUT? CHECK THIS FIRST',
      subtitle: 'Use 1-Hour PM2.5 to guide immediate activities',
      focus: 'Actionable guidance for walking, jogging, cycling, and children on playgrounds.',
    },
    {
      num: 3,
      image: '/images/story03.png',
      title: 'WHAT DOES YOUR PM2.5 READING MEAN?',
      subtitle: 'Four official classification bands',
      focus: 'Normal (0-55), Elevated (56-150), High (151-250), Very High (251+).',
    },
    {
      num: 4,
      image: '/images/story04.png',
      title: 'SOME PEOPLE NEED EXTRA CARE',
      subtitle: 'Vulnerable community members need early protection',
      focus: 'Guidelines for children, seniors, expectant mothers, and heart/lung patients.',
    },
    {
      num: 5,
      image: '/images/story05.png',
      title: 'DO YOU NEED AN N95? NOT ALWAYS.',
      subtitle: 'Respirator fit, exposure duration, and child safety',
      focus: 'Short commutes generally do not require N95. Reducing exposure is primary.',
    },
    {
      num: 6,
      image: '/images/story06.png',
      title: 'WHAT ELSE CAN YOU DO?',
      subtitle: 'Four practical household actions',
      focus: 'Cut outdoor time, exercise indoors, seal windows with HEPA filters, monitor health.',
    },
    {
      num: 7,
      image: '/images/story07.png',
      title: 'PROTECT THE PEOPLE YOU LOVE',
      subtitle: 'Community care and family safety',
      focus: 'Share verified official information, check on vulnerable family, stay safe together.',
    },
  ];

  const currentSlide = slides[currentStoryIndex] || slides[0];

  const handlePrev = () => {
    onSelectStory(currentStoryIndex === 0 ? slides.length - 1 : currentStoryIndex - 1);
  };

  const handleNext = () => {
    onSelectStory(currentStoryIndex === slides.length - 1 ? 0 : currentStoryIndex + 1);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-4 sm:p-8 border-4 border-[#102D50] poster-shadow">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#102D50] text-[#FFD34E] font-display font-black text-sm flex items-center justify-center">
              0{currentSlide.num}
            </span>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                STORY SLIDE {currentSlide.num} OF {slides.length}
              </span>
              <h3 className="font-display text-lg sm:text-xl text-[#102D50] uppercase tracking-wide">
                {currentSlide.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#173d6b] hover:bg-[#102D50] text-white transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#173d6b] hover:bg-[#102D50] text-white transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Centerpiece Image Container */}
        <div className="relative group rounded-2xl overflow-hidden bg-slate-50 aspect-[3/4] max-h-[60vh] max-w-md mx-auto mb-6 border-2 border-slate-200">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-102"
            onClick={() =>
              onOpenPoster(
                currentSlide.image,
                currentSlide.title,
                currentSlide.subtitle,
                currentSlide.num
              )
            }
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bottom Takeaway Card */}
        <div className="bg-[#FFF5E7] p-4 rounded-2xl border-2 border-[#FFD34E] text-center max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-[#EE6237] mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Key Takeaway</span>
          </p>
          <p className="text-sm text-[#102D50] font-semibold leading-relaxed">
            {currentSlide.focus}
          </p>
        </div>

        {/* Slide Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => onSelectStory(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentStoryIndex === idx
                  ? 'w-8 bg-[#D9272E]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${s.num}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
