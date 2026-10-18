import React, { useState } from 'react';
import { HazeData, AirQualityStatus } from '../../types/haze';
import { getClassificationDetails } from '../../utils/hazeClassifier';
import { RefreshCw, Clock, Eye, Check, AlertCircle, XCircle, Footprints, Bike, Sparkles } from 'lucide-react';

interface ActivitySectionProps {
  hazeData: HazeData | null;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  hazeData,
  isLoading,
  onRefresh,
  onOpenPoster,
}) => {
  const liveStatus = hazeData?.currentStatus || 'normal';
  // Allow user to preview how advice changes across categories
  const [activeCategory, setActiveCategory] = useState<AirQualityStatus>(liveStatus);
  const details = getClassificationDetails(activeCategory);

  const activities = [
    {
      id: 'walking',
      title: 'WALKING',
      color: '#218451',
      bgClass: 'bg-[#218451]',
      icon: Footprints,
      characterText: 'Commuting & strolls in the park',
      info: details.outdoorActivities.walking,
    },
    {
      id: 'jogging',
      title: 'JOGGING',
      color: '#EE6237',
      bgClass: 'bg-[#EE6237]',
      icon: Sparkles,
      characterText: 'Cardio & vigorous exercise',
      info: details.outdoorActivities.jogging,
    },
    {
      id: 'cycling',
      title: 'CYCLING',
      color: '#102D50',
      bgClass: 'bg-[#102D50]',
      icon: Bike,
      characterText: 'Park connectors & roads',
      info: details.outdoorActivities.cycling,
    },
    {
      id: 'playground',
      title: 'PLAYGROUND',
      color: '#6C5CE7',
      bgClass: 'bg-[#6C5CE7]',
      icon: Sparkles,
      characterText: 'Children outdoor play & slides',
      info: details.outdoorActivities.playground,
    },
  ];

  return (
    <section id="story-2" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFF5E7] border-t-2 border-[#102D50]/15 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFD34E] text-[#102D50] font-black text-xs font-display uppercase tracking-widest mb-3">
            POSTER 02 · IMMEDIATE DECISION GUIDE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#102D50] uppercase tracking-tight">
            GOING OUT?
          </h2>
          <h3 className="font-display text-4xl sm:text-5xl text-[#D9272E] uppercase tracking-tight">
            CHECK THIS FIRST
          </h3>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-2">
            Conditions can change throughout the day. The Singapore haze portal advises using <strong>1-hour PM2.5</strong> to guide your immediate outdoor activities.
          </p>
        </div>

        {/* Central Layout: Illustration on left, Interactive Activity Cards on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Poster 02 Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story02.png"
                  alt="Going Out? Check This First poster illustration"
                  className="w-full h-full object-cover object-center cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story02.png',
                      'Going Out? Check This First',
                      'Illustrated guide for walking, jogging, cycling, and playground safety.',
                      2
                    )
                  }
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={() =>
                    onOpenPoster(
                      '/images/story02.png',
                      'Going Out? Check This First',
                      'Illustrated guide for walking, jogging, cycling, and playground safety.',
                      2
                    )
                  }
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#102D50]/90 hover:bg-[#102D50] text-[#FFD34E] text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer"
                  aria-label="Enlarge Poster 2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Poster</span>
                </button>
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Poster 02: Outdoor Activity Rules</span>
                <span className="text-[#218451] font-bold">4 Activities</span>
              </div>
            </div>
          </div>

          {/* Interactive Guidance Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Prominent Center Board (matching the illustrated bus shelter poster) */}
            <div className="bg-[#D9EEFA] rounded-2xl p-5 sm:p-6 border-3 border-[#102D50] poster-shadow text-center relative overflow-hidden">
              <div className="text-xs uppercase font-extrabold tracking-widest text-[#102D50] mb-2 font-display">
                CHECK THE LATEST
              </div>

              {/* Red Rounded Center Panel with 1-HOUR PM2.5 */}
              <div className="inline-block bg-[#D9272E] text-white rounded-2xl px-6 py-4 shadow-lg border-2 border-white relative mx-auto my-1">
                {/* Yellow sunburst accents */}
                <div className="text-yellow-300 font-display text-sm tracking-wider uppercase font-bold">
                  ★ OFFICIAL BENCHMARK ★
                </div>
                <div className="font-display text-3xl sm:text-5xl text-white tracking-wide uppercase font-black">
                  1-HOUR PM2.5
                </div>
                <div className="text-xs text-rose-100 font-medium mt-1">
                  Dominant Island Reading:{' '}
                  <span className="font-black text-white text-base">
                    {hazeData?.pm25 !== null && hazeData?.pm25 !== undefined ? `${hazeData.pm25} µg/m³` : 'Unavailable'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#102D50] font-bold mt-3">
                Use it to guide what you do outdoors right now.
              </p>

              {/* Category Quick Filter */}
              <div className="mt-4 pt-3 border-t border-[#102D50]/15 flex flex-wrap items-center justify-center gap-1.5 text-xs">
                <span className="text-[#102D50] font-semibold text-[11px] mr-1">Preview Category:</span>
                {(['normal', 'elevated', 'high', 'very-high'] as AirQualityStatus[]).map((cat) => {
                  const catDetails = getClassificationDetails(cat);
                  const isCur = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isCur
                          ? 'bg-[#102D50] text-[#FFD34E] shadow-sm scale-105'
                          : 'bg-white/80 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {catDetails.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Activity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activities.map((act) => {
                const isAllowed = act.info.allowed;
                return (
                  <div
                    key={act.id}
                    className="bg-white rounded-xl p-4 border-2 border-[#102D50] poster-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-white font-display text-sm tracking-wider uppercase"
                          style={{ backgroundColor: act.color }}
                        >
                          {act.title}
                        </span>
                        {isAllowed ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Normal</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            <span>Caution</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 font-medium mb-2">{act.characterText}</p>
                      
                      {/* Specific Advice */}
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                        {act.info.advice}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Status: {details.label}</span>
                      <span className="font-bold text-[#102D50]">{details.rangeText}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Alarm Clock Alert Card */}
            <div className="bg-[#FFF5E7] rounded-xl p-4 border-2 border-[#D9272E] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-[#D9272E]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#D9272E] animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display text-sm sm:text-base text-[#102D50] uppercase tracking-wide">
                    Air quality can change throughout the day.
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Check official 1-hour PM2.5 readings right before you leave home or school.
                  </p>
                </div>
              </div>

              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl bg-[#D9272E] hover:bg-[#bf1f26] text-white text-xs font-display tracking-wider uppercase font-bold shrink-0 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Check Again</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
