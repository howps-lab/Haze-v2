import React from 'react';
import { Eye, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, ExternalLink } from 'lucide-react';

interface MaskGuidanceSectionProps {
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
  onScrollToStory: (storyId: string) => void;
}

export const MaskGuidanceSection: React.FC<MaskGuidanceSectionProps> = ({
  onOpenPoster,
  onScrollToStory,
}) => {
  return (
    <section id="story-5" className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t-2 border-[#102D50]/15 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#D9EEFA] text-[#102D50] font-black text-xs font-display uppercase tracking-widest mb-3">
            POSTER 05 · RESPIRATOR & MASK FACTS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#102D50] uppercase tracking-tight">
            DO YOU NEED AN N95?
          </h2>
          <h3 className="font-display text-4xl sm:text-5xl text-[#D9272E] uppercase tracking-tight flex items-center justify-center gap-2">
            <span>NOT ALWAYS</span>
            <span className="text-2xl text-[#FFD34E]">.</span>
          </h3>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-2">
            For short periods outdoors, such as commuting, an N95 is generally not needed. Official health guidelines emphasize duration and intensity of exposure.
          </p>
        </div>

        {/* Layout: Poster 05 Illustration + Two Comparison Columns + Child Fit & Rule Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Poster 05 Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story05.png"
                  alt="Do You Need an N95? Not Always poster illustration"
                  className="w-full h-full object-cover object-center cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story05.png',
                      'Do You Need an N95? Not Always.',
                      'Guidelines on short trips, prolonged exposure, child fit, and respirator usage.',
                      5
                    )
                  }
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={() =>
                    onOpenPoster(
                      '/images/story05.png',
                      'Do You Need an N95? Not Always.',
                      'Guidelines on short trips, prolonged exposure, child fit, and respirator usage.',
                      5
                    )
                  }
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#102D50]/90 hover:bg-[#102D50] text-[#FFD34E] text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer"
                  aria-label="Enlarge Poster 5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Poster</span>
                </button>
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Poster 05: Practical Mask Advice</span>
                <span className="text-[#102D50] font-bold">Fit & Duration</span>
              </div>
            </div>
          </div>

          {/* Educational Comparison Columns */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Short Trip Column (Green) */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 sm:p-5 border-3 border-[#218451] poster-shadow flex flex-col justify-between">
                <div>
                  <div className="px-3 py-1 rounded-full bg-[#218451] text-white font-display text-xs tracking-wider uppercase font-bold inline-block mb-3">
                    SHORT TRIP OUTDOORS
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-800 font-medium mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#218451] shrink-0 mt-0.5" />
                      <span>Walking to the MRT or bus interchange</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#218451] shrink-0 mt-0.5" />
                      <span>Going to school, work, or neighbourhood shops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#218451] shrink-0 mt-0.5" />
                      <span>Short outdoor errands under 15–30 minutes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#218451] text-white rounded-xl p-3 text-center">
                  <span className="font-display text-sm uppercase tracking-wide font-black block">
                    ✔ N95 generally not needed
                  </span>
                  <span className="text-[10px] text-emerald-100 mt-0.5 block">
                    Normal breathing for brief transit carries minimal total particulate dose.
                  </span>
                </div>
              </div>

              {/* Longer Exposure Column (Orange) */}
              <div className="bg-orange-50/60 rounded-2xl p-4 sm:p-5 border-3 border-[#EE6237] poster-shadow flex flex-col justify-between">
                <div>
                  <div className="px-3 py-1 rounded-full bg-[#EE6237] text-white font-display text-xs tracking-wider uppercase font-bold inline-block mb-3">
                    LONGER OUTDOOR EXPOSURE
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-800 font-medium mb-4">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#EE6237] shrink-0 mt-0.5" />
                      <span>Spending several continuous hours outdoors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#EE6237] shrink-0 mt-0.5" />
                      <span>Outdoor construction, landscaping, or delivery work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#EE6237] shrink-0 mt-0.5" />
                      <span>Air quality enters Unhealthy or Very High range</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#EE6237] text-white rounded-xl p-3 text-center">
                  <span className="font-display text-sm uppercase tracking-wide font-black block">
                    ⚠ Check latest haze guidance
                  </span>
                  <span className="text-[10px] text-orange-100 mt-0.5 block">
                    Consider an N95 if prolonged outdoor exertion is unavoidable.
                  </span>
                </div>
              </div>

            </div>

            {/* What about children? Callout Card */}
            <div className="bg-rose-50 rounded-2xl p-4 sm:p-5 border-2 border-[#D9272E] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <span className="font-display text-sm text-[#D9272E] uppercase tracking-wide font-black flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>WHAT ABOUT CHILDREN?</span>
                </span>
                <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  Respirator Fit Matters
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Adult N95 masks may <strong>not fit children’s smaller facial contours properly</strong>, causing unfiltered air to leak through the sides. Additionally, the increased breathing resistance can make breathing uncomfortable for young kids. The most effective approach for children is simply <strong>reducing outdoor exposure</strong> when haze levels rise.
              </p>
            </div>

            {/* Bottom Key Principle Box */}
            <div className="bg-[#D9EEFA] rounded-2xl p-4 border-2 border-[#102D50] flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#102D50] text-[#FFD34E] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-display text-xs text-[#102D50] uppercase tracking-wider font-bold">
                  MASKS ARE ONLY ONE PART OF PROTECTION
                </h4>
                <p className="text-slate-700 font-medium mt-0.5 leading-snug">
                  Wearing a mask does not make prolonged outdoor pollution exposure harmless. Reducing unnecessary outdoor time and keeping indoor air clean remain the primary defences.
                </p>
              </div>
            </div>

            {/* Link to MOH / NEA Official Advice */}
            <div className="text-right">
              <a
                href="https://www.haze.gov.sg/resources/faqs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#102D50] hover:text-[#D9272E] font-bold underline transition-colors"
              >
                <span>Read Ministry of Health & NEA Respirator FAQs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
