import React from 'react';
import { HazeData } from '../../types/haze';
import { Eye, Heart, Baby, Users, Stethoscope, Pill, AlertTriangle, ShieldAlert } from 'lucide-react';

interface VulnerableGroupsSectionProps {
  hazeData: HazeData | null;
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
  onScrollToStory: (storyId: string) => void;
}

export const VulnerableGroupsSection: React.FC<VulnerableGroupsSectionProps> = ({
  hazeData,
  onOpenPoster,
  onScrollToStory,
}) => {
  const vulnerableGroups = [
    {
      id: 'children',
      number: 1,
      title: 'CHILDREN',
      color: '#102D50',
      headerBg: 'bg-[#102D50]',
      desc: 'Young children have developing lungs and breathe more air per kilogram of body weight, making them more vulnerable to haze particles.',
      precaution: 'Limit outdoor playground time. Move physical activities indoors.',
      icon: Baby,
    },
    {
      id: 'elderly',
      number: 2,
      title: 'ELDERLY',
      color: '#218451',
      headerBg: 'bg-[#218451]',
      desc: 'Older adults may have underlying health conditions and reduced lung reserves. High particulate levels place extra strain on the heart.',
      precaution: 'Take gentle indoor walks and stay well hydrated in sheltered spaces.',
      icon: Users,
    },
    {
      id: 'pregnant',
      number: 3,
      title: 'PREGNANT WOMEN',
      color: '#8E44AD',
      headerBg: 'bg-[#8E44AD]',
      desc: 'Fine particulate matter (PM2.5) enters the bloodstream through lung capillaries. Reducing exposure protects both mother and developing child.',
      precaution: 'Avoid outdoor exercise and stay in well-ventilated or air-conditioned indoor rooms.',
      icon: Heart,
    },
    {
      id: 'heart-lung',
      number: 4,
      title: 'HEART OR LUNG CONDITIONS',
      color: '#D9272E',
      headerBg: 'bg-[#D9272E]',
      desc: 'Individuals with asthma, COPD, bronchitis, or cardiovascular diseases may suffer acute flare-ups from haze exposure.',
      precaution: 'Carry prescribed reliever inhalers and medication at all times.',
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="story-4" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFF5E7] border-t-2 border-[#102D50]/15 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFD34E] text-[#102D50] font-black text-xs font-display uppercase tracking-widest mb-3">
            POSTER 04 · VULNERABLE POPULATIONS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#102D50] uppercase tracking-tight">
            SOME PEOPLE NEED
          </h2>
          <h3 className="font-display text-4xl sm:text-5xl text-[#D9272E] uppercase tracking-tight">
            EXTRA CARE
          </h3>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-2">
            Air pollution does not affect everyone equally. Extra precautions are critical for children, older adults, expectant mothers, and those with existing medical conditions.
          </p>
        </div>

        {/* Layout: Poster 04 Illustration + 4 Groups + Precaution Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Poster 04 Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story04.png"
                  alt="Some People Need Extra Care poster illustration"
                  className="w-full h-full object-cover object-center cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story04.png',
                      'Some People Need Extra Care',
                      'Specific advice for children, elderly, pregnant women, and chronic condition patients.',
                      4
                    )
                  }
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Poster 04: Vulnerable Individuals</span>
                <span className="text-[#D9272E] font-bold">Health Protocols</span>
              </div>
            </div>
          </div>

          {/* 4 Cards & Rising PM2.5 Threshold Guidance */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 4 Illustrated Population Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {vulnerableGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.id}
                    className="bg-white rounded-2xl p-4 border-2 border-[#102D50] poster-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-white font-display text-xs tracking-wider uppercase flex items-center gap-1.5"
                          style={{ backgroundColor: group.color }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{group.title}</span>
                        </span>
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center font-display">
                          {group.number}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-2.5">
                        {group.desc}
                      </p>
                    </div>

                    <div className="bg-[#FFF5E7] p-2.5 rounded-xl border border-[#FFD34E]/60 text-[11px] text-[#102D50] font-semibold">
                      💡 {group.precaution}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* "WHEN PM2.5 RISES..." Special Rule Banner */}
            <div className="bg-white rounded-2xl p-5 border-3 border-[#102D50] poster-shadow">
              <div className="text-center mb-3">
                <span className="px-4 py-1.5 rounded-full bg-[#102D50] text-[#FFD34E] font-display text-sm uppercase tracking-wider font-black inline-block">
                  WHEN PM2.5 RISES...
                </span>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Stricter exposure thresholds for vulnerable individuals compared to healthy adults
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-amber-50 rounded-xl p-3 border-2 border-[#F4B52C]">
                  <div className="flex items-center gap-2 font-display text-sm uppercase tracking-wide text-[#B8800B] font-bold mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F4B52C]" />
                    <span>ELEVATED (56–150 µg/m³)</span>
                  </div>
                  <p className="text-xs text-amber-950 font-bold">
                    Avoid strenuous outdoor activity.
                  </p>
                  <p className="text-[11px] text-amber-800 font-medium mt-0.5">
                    (Healthy adults only need to reduce intensity, but vulnerable persons should avoid strenuous exertion completely).
                  </p>
                </div>

                <div className="bg-rose-50 rounded-xl p-3 border-2 border-[#D9272E]">
                  <div className="flex items-center gap-2 font-display text-sm uppercase tracking-wide text-[#D9272E] font-bold mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D9272E]" />
                    <span>HIGH / VERY HIGH (151+ µg/m³)</span>
                  </div>
                  <p className="text-xs text-rose-950 font-bold">
                    Avoid outdoor activity completely.
                  </p>
                  <p className="text-[11px] text-rose-800 font-medium mt-0.5">
                    Stay indoors in clean, filtered environments and monitor closely for symptoms.
                  </p>
                </div>
              </div>
            </div>

            {/* Inhaler & Doctor Medical Care Callout */}
            <div className="bg-[#D9EEFA] rounded-2xl p-4 border-2 border-[#102D50] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white text-[#D9272E] border-2 border-[#102D50] flex items-center justify-center shrink-0 shadow-sm">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-sm text-[#102D50] uppercase tracking-wide font-black">
                    Heart or Lung Condition?
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Keep necessary medication and inhalers readily available. Be prepared so you can breathe easier.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl px-4 py-2 border border-[#102D50] text-center shrink-0">
                <span className="text-[11px] font-bold text-[#D9272E] uppercase block">
                  Feeling Unwell?
                </span>
                <span className="text-xs text-[#102D50] font-black font-display">
                  Seek Medical Attention
                </span>
              </div>
            </div>

            {/* Footer Tagline */}
            <div className="text-center py-1">
              <span className="text-xs font-bold text-slate-600 italic">
                Take Care. Breathe Better. Together. ♡
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
