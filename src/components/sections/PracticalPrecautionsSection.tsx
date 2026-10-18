import React from 'react';
import { Eye, Home, Wind, Activity, HeartHandshake, Shield, Sparkles } from 'lucide-react';

interface PracticalPrecautionsSectionProps {
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
  onScrollToStory: (storyId: string) => void;
}

export const PracticalPrecautionsSection: React.FC<PracticalPrecautionsSectionProps> = ({
  onOpenPoster,
  onScrollToStory,
}) => {
  const steps = [
    {
      num: 1,
      title: 'CUT DOWN OUTDOOR TIME',
      color: '#EE6237',
      bgClass: 'bg-orange-50',
      borderClass: 'border-[#EE6237]',
      headline: 'Postpone unnecessary trips',
      desc: 'Reschedule casual outings, sports matches, or park walks until clearer conditions return.',
      dialogue: '“Maybe another day! Safer indoors!”',
      icon: Home,
    },
    {
      num: 2,
      title: 'MOVE ACTIVITIES INDOORS',
      color: '#102D50',
      bgClass: 'bg-blue-50',
      borderClass: 'border-[#102D50]',
      headline: 'Adjust exercise routines',
      desc: 'Swap outdoor distance running or cycling for indoor treadmill sessions, mat workouts, or yoga.',
      dialogue: '“Too hazy today. Let’s work out indoors!”',
      icon: Activity,
    },
    {
      num: 3,
      title: 'KEEP INDOOR AIR CLEAN',
      color: '#218451',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-[#218451]',
      headline: 'Seal gaps & filter air',
      desc: 'Close windows and balcony sliding doors. Turn on air-conditioning with recirculating mode and run a HEPA air purifier.',
      dialogue: '“Close doors & windows. Fresh clean air inside!”',
      icon: Wind,
    },
    {
      num: 4,
      title: 'PAY ATTENTION TO YOUR BODY',
      color: '#8E44AD',
      bgClass: 'bg-purple-50',
      borderClass: 'border-[#8E44AD]',
      headline: 'Monitor acute symptoms',
      desc: 'Watch for eye irritation, dry cough, shortness of breath, dizziness, or chest tightness. Rest immediately.',
      dialogue: '“Feeling unwell? Seek medical attention right away.”',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="story-6" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFF5E7] border-t-2 border-[#102D50]/15 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFD34E] text-[#102D50] font-black text-xs font-display uppercase tracking-widest mb-3">
            POSTER 06 · PRACTICAL STEPS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#102D50] uppercase tracking-tight">
            WHAT ELSE CAN YOU DO?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-2">
            Simple, practical everyday ways to reduce your haze exposure and keep your family comfortable.
          </p>
        </div>

        {/* Layout: Poster 06 Illustration + 4 Action Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Poster 06 Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story06.png"
                  alt="What Else Can You Do poster illustration"
                  className="w-full h-full object-cover object-center cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story06.png',
                      'What Else Can You Do?',
                      'Four practical actions to minimize haze exposure and maintain clean indoor living spaces.',
                      6
                    )
                  }
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Poster 06: Four Practical Actions</span>
                <span className="text-[#EE6237] font-bold">Indoor Protection</span>
              </div>
            </div>
          </div>

          {/* 4 Action Step Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={`rounded-2xl p-4 sm:p-5 border-3 ${step.borderClass} ${step.bgClass} poster-shadow flex flex-col justify-between transition-transform hover:-translate-y-1`}
                  >
                    <div>
                      {/* Number badge and title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-7 h-7 rounded-full text-white font-display text-sm font-black flex items-center justify-center shrink-0 shadow-sm"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.num}
                        </span>
                        <h4
                          className="font-display text-sm uppercase tracking-wide font-black"
                          style={{ color: step.color }}
                        >
                          {step.title}
                        </h4>
                      </div>

                      <div className="text-xs font-bold text-slate-900 mb-1">
                        {step.headline}
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                        {step.desc}
                      </p>
                    </div>

                    <div className="bg-white/80 rounded-xl p-2.5 border border-slate-200 text-[11px] text-slate-700 italic font-medium">
                      {step.dialogue}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inhaler & Prescription Reminder Callout */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#D9272E] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D9272E]/10 flex items-center justify-center text-[#D9272E] shrink-0">
                  <Shield className="w-5 h-5 text-[#D9272E]" />
                </div>
                <div>
                  <h4 className="font-display text-xs text-[#102D50] uppercase tracking-wider font-bold">
                    HEART OR LUNG CONDITION?
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Keep your prescribed medications readily available so you can breathe easier.
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-bold text-[#D9272E] bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 shrink-0">
                Be prepared · Breathe easier ♡
              </div>
            </div>

            {/* Bottom Slogan Bar */}
            <div className="bg-[#102D50] text-[#FFD34E] rounded-2xl p-4 text-center font-display text-base uppercase tracking-wider font-black shadow-md">
              WHEN IN DOUBT, SPEND LESS TIME IN THE HAZE.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
