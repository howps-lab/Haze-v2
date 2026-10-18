import React from 'react';
import { HazeData, AirQualityStatus } from '../../types/haze';
import { getClassificationDetails } from '../../utils/hazeClassifier';
import { Smile, Meh, Frown, AlertOctagon, Eye, ArrowRight, ShieldCheck, Scale, ArrowDown } from 'lucide-react';

interface PM25ExplainerSectionProps {
  hazeData: HazeData | null;
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
  onScrollToStory: (storyId: string) => void;
}

export const PM25ExplainerSection: React.FC<PM25ExplainerSectionProps> = ({
  hazeData,
  onOpenPoster,
  onScrollToStory,
}) => {
  const currentStatus = hazeData?.currentStatus || 'normal';
  const currentPM25 = hazeData?.pm25;

  const categories: {
    status: AirQualityStatus;
    range: string;
    advice: string;
    characterScene: string;
    icon: any;
    color: string;
    textColor: string;
  }[] = [
    {
      status: 'normal',
      range: '0 – 55',
      advice: 'Normal activities',
      characterScene: 'Healthy outdoor jogging, cycling, and park strolls in clear air.',
      icon: Smile,
      color: '#218451',
      textColor: 'text-[#218451]',
    },
    {
      status: 'elevated',
      range: '56 – 150',
      advice: 'Reduce strenuous outdoor activity',
      characterScene: 'Pace your runs, take breaks, and lower intense exertion.',
      icon: Meh,
      color: '#F4B52C',
      textColor: 'text-[#B8800B]',
    },
    {
      status: 'high',
      range: '151 – 250',
      advice: 'Avoid strenuous outdoor activity',
      characterScene: 'Shift workouts to indoor gyms, stretching, or home fitness.',
      icon: Frown,
      color: '#EE6237',
      textColor: 'text-[#EE6237]',
    },
    {
      status: 'very-high',
      range: '251 & above',
      advice: 'Minimise outdoor activity',
      characterScene: 'Stay indoors, keep windows closed, and run an air purifier.',
      icon: AlertOctagon,
      color: '#D9272E',
      textColor: 'text-[#D9272E]',
    },
  ];

  return (
    <section id="story-3" className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t-2 border-[#102D50]/15 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#D9EEFA] text-[#102D50] font-black text-xs font-display uppercase tracking-widest mb-3">
            POSTER 03 · AIR QUALITY CLASSIFICATION
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#102D50] uppercase tracking-tight">
            WHAT DOES YOUR
          </h2>
          <h3 className="font-display text-4xl sm:text-5xl text-[#D9272E] uppercase tracking-tight">
            PM2.5 READING MEAN?
          </h3>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-2">
            Use the 1-hour PM2.5 reading to guide what you do outdoors right now.
          </p>

          <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-[#102D50] text-[#FFD34E] font-display text-sm tracking-wider uppercase">
            1-HOUR PM2.5 (µg/m³) BANDS
          </div>
        </div>

        {/* Layout: Poster 03 Illustration + 4 Color Bands */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Poster 03 Visual Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story03.png"
                  alt="What Does Your PM2.5 Reading Mean poster illustration"
                  className="w-full h-full object-cover object-center cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story03.png',
                      'What Does Your PM2.5 Reading Mean?',
                      'Official 4-band PM2.5 chart with healthy adult recommendations.',
                      3
                    )
                  }
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={() =>
                    onOpenPoster(
                      '/images/story03.png',
                      'What Does Your PM2.5 Reading Mean?',
                      'Official 4-band PM2.5 chart with healthy adult recommendations.',
                      3
                    )
                  }
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#102D50]/90 hover:bg-[#102D50] text-[#FFD34E] text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer"
                  aria-label="Enlarge Poster 3"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Poster</span>
                </button>
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Poster 03: Four PM2.5 Bands</span>
                <span className="text-[#EE6237] font-bold">Scale & Guidance</span>
              </div>
            </div>
          </div>

          {/* 4 Coloured Classification Panels with Highlight on Live Band */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Visual Concentration Scale Bar */}
            <div className="bg-[#FFF5E7] p-3.5 rounded-xl border border-[#FFD34E] mb-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#102D50] uppercase mb-1.5">
                <span>Concentration Spectrum:</span>
                <span>Current: {currentPM25 !== null && currentPM25 !== undefined ? `${currentPM25} µg/m³` : 'Unknown'}</span>
              </div>
              <div className="h-3 rounded-full flex overflow-hidden shadow-inner border border-slate-300">
                <div className="w-[22%] bg-[#218451]" title="Normal (0-55)" />
                <div className="w-[38%] bg-[#F4B52C]" title="Elevated (56-150)" />
                <div className="w-[25%] bg-[#EE6237]" title="High (151-250)" />
                <div className="w-[15%] bg-[#D9272E]" title="Very High (251+)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
                <span>0</span>
                <span>55</span>
                <span>150</span>
                <span>250</span>
                <span>300+ µg/m³</span>
              </div>
            </div>

            {/* 4 Row Cards */}
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isCurrent = currentStatus === cat.status;

              return (
                <div
                  key={cat.status}
                  className={`rounded-2xl p-4 border-3 transition-all relative overflow-hidden ${
                    isCurrent
                      ? 'border-[#102D50] bg-white shadow-xl ring-4 ring-[#FFD34E]/60 transform -translate-y-0.5'
                      : 'border-slate-200 bg-white/90 hover:border-slate-400'
                  }`}
                >
                  {/* Active Indicator Ribbon */}
                  {isCurrent && (
                    <div className="absolute top-0 right-0 bg-[#102D50] text-[#FFD34E] text-[10px] font-black font-display tracking-widest uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                      CURRENT SINGAPORE STATUS
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Left: Icon and Name Badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                        style={{ backgroundColor: cat.color }}
                      >
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div>
                        <div
                          className="font-display text-xl uppercase tracking-wide font-black"
                          style={{ color: cat.color }}
                        >
                          {cat.status === 'very-high' ? 'VERY HIGH' : cat.status.toUpperCase()}
                        </div>
                        <div className="font-display text-2xl font-black text-[#102D50] tabular-nums">
                          {cat.range} <span className="text-xs font-sans font-bold text-slate-500">µg/m³</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Advice & Context */}
                    <div className="sm:max-w-xs text-left sm:text-right">
                      <div className="font-bold text-slate-900 text-sm leading-snug">
                        {cat.advice}
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {cat.characterScene}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Comparison between 1-hr PM2.5 and 24-hr PSI card */}
            <div className="bg-[#D9EEFA] p-4 rounded-2xl border-2 border-[#102D50] flex flex-col sm:flex-row items-center gap-3 mt-4 text-xs">
              <div className="w-10 h-10 rounded-full bg-[#102D50] text-[#FFD34E] flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-[#102D50] block uppercase tracking-wide">
                  1-Hour PM2.5 vs 24-Hour PSI: How do they differ?
                </span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">
                  <strong>1-Hour PM2.5</strong> reflects rapid air quality fluctuations and guides immediate hourly activities right now. <strong>24-Hour PSI</strong> averages overall pollution over a full day and is intended for planning activities ahead for tomorrow.
                </p>
              </div>
            </div>

            {/* Bottom Reminder for Healthy Adults + CTA to Next Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#D9272E] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#D9272E] text-white font-display text-xs tracking-wider uppercase font-bold inline-block mb-1">
                  THIS IS FOR HEALTHY ADULTS
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  Children, elderly, pregnant women, and people with heart or lung conditions need extra precautions.
                </p>
              </div>

              <button
                onClick={() => onScrollToStory('story-4')}
                className="px-5 py-2.5 rounded-xl bg-[#102D50] hover:bg-[#19406f] text-[#FFD34E] font-display text-xs tracking-wider uppercase font-bold shrink-0 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Who Needs Extra Care?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
