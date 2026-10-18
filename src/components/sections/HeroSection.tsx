import React from 'react';
import { HazeData } from '../../types/haze';
import { getClassificationDetails, formatObservationTime } from '../../utils/hazeClassifier';
import { ArrowDown, Wind, ShieldAlert, Sparkles, Eye, Info, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  hazeData: HazeData | null;
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
  onScrollToStory: (storyId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hazeData,
  onOpenPoster,
  onScrollToStory,
}) => {
  const status = hazeData?.currentStatus || 'unavailable';
  const details = getClassificationDetails(status);
  const pm25Val = hazeData?.pm25;
  const isHazy = status === 'elevated' || status === 'high' || status === 'very-high';

  return (
    <section id="story-1" className="relative py-8 sm:py-14 px-4 sm:px-6 overflow-hidden">
      {/* Background Decorative Haze & Warm Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D9EEFA]/60 via-[#FFF5E7] to-[#FFF5E7] pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#FFD34E]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Story Illustration Poster Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden transform transition-transform hover:scale-[1.01]">
              {/* Badge Overlay */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102D50] text-[#FFD34E] text-xs font-black uppercase font-display tracking-wider shadow-md">
                <span>POSTER 01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD34E]"></span>
                <span>PUBLIC PSA</span>
              </div>

              {/* Poster Image with Gentle Breathe Animation */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story01.png"
                  alt="The Haze Is Back illustrated Singapore public information campaign poster"
                  className="w-full h-full object-cover object-top animate-breathe cursor-pointer"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story01.png',
                      'The Haze Is Back',
                      'Singapore illustrated street with residents observing haze conditions.',
                      1
                    )
                  }
                  referrerPolicy="no-referrer"
                />

                {/* Quick inspect button */}
                <button
                  onClick={() =>
                    onOpenPoster(
                      '/images/story01.png',
                      'The Haze Is Back',
                      'Singapore illustrated street with residents observing haze conditions.',
                      1
                    )
                  }
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#102D50]/90 hover:bg-[#102D50] text-[#FFD34E] text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer"
                  aria-label="Enlarge Poster 1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Poster</span>
                </button>
              </div>

              {/* Caption Under Card */}
              <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Neighbourhood & Street Scene</span>
                <span className="text-[#102D50] font-bold">1-Hr PM2.5 Focus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Headline, Official Data Overlay, and Action Guides */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Campaign Category Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-md bg-[#102D50] text-[#FFD34E] text-xs font-black uppercase tracking-wider font-display">
                OFFICIAL AIR QUALITY ADVISORY
              </span>
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wide">
                HAZE.GOV.SG & DATA.GOV.SG
              </span>
            </div>

            {/* Dynamic Hand-lettered Poster Style Headline */}
            <div className="space-y-1 mb-4">
              {isHazy ? (
                <>
                  <h1 className="font-display text-4xl sm:text-6xl text-[#102D50] leading-none uppercase tracking-tight">
                    THE HAZE
                  </h1>
                  <h2 className="font-display text-4xl sm:text-6xl text-[#D9272E] leading-none uppercase tracking-tight flex items-center gap-3">
                    <span>IS BACK</span>
                    <span className="text-2xl sm:text-4xl text-[#FFD34E] inline-block animate-bounce">!</span>
                  </h2>
                </>
              ) : (
                <>
                  <h1 className="font-display text-3xl sm:text-5xl text-[#102D50] leading-tight uppercase tracking-tight">
                    CHECK TODAY'S
                  </h1>
                  <h2 className="font-display text-4xl sm:text-6xl text-[#218451] leading-none uppercase tracking-tight">
                    AIR QUALITY
                  </h2>
                </>
              )}
            </div>

            {/* Subtitle with highlighted badge */}
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-snug mb-6">
              Singapore's air quality is currently in the{' '}
              <span
                className="font-bold px-2 py-0.5 rounded-md text-white font-display uppercase tracking-wide inline-block"
                style={{ backgroundColor: details.colorHex }}
              >
                {details.label} Range
              </span>
              . Here is what you should know before heading outdoors.
            </p>

            {/* Prominent Live 1-Hour PM2.5 Hero Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border-3 border-[#102D50] poster-shadow mb-6 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: details.colorHex }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Value & Category */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase">
                    <Wind className="w-4 h-4 text-[#102D50]" />
                    <span>Dominant 1-Hour PM2.5</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className="font-display text-5xl sm:text-6xl font-black tracking-tight"
                      style={{ color: details.colorHex }}
                    >
                      {pm25Val !== null && pm25Val !== undefined ? pm25Val : 'N/A'}
                    </span>
                    <span className="text-sm font-bold text-slate-500">µg/m³</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Official Band:{' '}
                    <strong className="text-slate-900">{details.label}</strong> ({details.rangeText})
                  </div>
                </div>

                {/* Immediate Health Advice */}
                <div className="bg-[#FFF5E7] p-3.5 rounded-xl border border-[#FFD34E]/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#102D50] uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#EE6237]" />
                    <span>Immediate Guidance</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {details.healthyAdultsAdvice}
                  </p>
                </div>
              </div>

              {/* Observation & Data Integrity Note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>Observation: {formatObservationTime(hazeData?.observedAt)}</span>
                </span>
                <span className="text-slate-400">
                  Range across island: {hazeData?.pm25Min ?? '—'} – {hazeData?.pm25Max ?? '—'} µg/m³
                </span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onScrollToStory('story-2')}
                className="px-6 py-3.5 rounded-xl bg-[#D9272E] hover:bg-[#bf1f26] text-white font-display text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Check Going Out Guide</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={() => onScrollToStory('story-3')}
                className="px-6 py-3.5 rounded-xl bg-[#102D50] hover:bg-[#19406f] text-[#FFD34E] font-display text-base uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>What PM2.5 Means</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
