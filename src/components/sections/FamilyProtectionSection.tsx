import React, { useState } from 'react';
import { HazeData } from '../../types/haze';
import { getClassificationDetails, formatObservationTime } from '../../utils/hazeClassifier';
import { Share2, Check, Copy, ExternalLink, Heart, Eye, CheckSquare, Square, Shield } from 'lucide-react';

interface FamilyProtectionSectionProps {
  hazeData: HazeData | null;
  onOpenPoster: (src: string, title: string, caption: string, num: number) => void;
}

export const FamilyProtectionSection: React.FC<FamilyProtectionSectionProps> = ({
  hazeData,
  onOpenPoster,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [checklist, setChecklist] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: 'c1', text: 'Check today’s 1-hour PM2.5 reading before leaving the house', done: true },
    { id: 'c2', text: 'Remind elderly parents and kids to avoid strenuous outdoor play', done: false },
    { id: 'c3', text: 'Close home windows and turn on air purifier with clean HEPA filter', done: false },
    { id: 'c4', text: 'Keep prescribed asthma inhalers and chronic medication accessible', done: false },
    { id: 'c5', text: 'Share current haze updates with family WhatsApp and chat groups', done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: 'THE HAZE — Singapore Air Quality & Public Guide',
      text: `Current Singapore 1-Hour PM2.5 is ${hazeData?.pm25 ?? 'reported'} µg/m³ (${hazeData?.currentStatus?.toUpperCase() ?? 'CHECK'}). Stay informed and protect the people you love!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const status = hazeData?.currentStatus || 'normal';
  const details = getClassificationDetails(status);

  return (
    <section id="story-7" className="py-12 sm:py-20 px-4 sm:px-6 bg-[#FFF5E7] border-t-4 border-[#102D50] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-[#D9272E] text-white font-black text-xs font-display uppercase tracking-widest mb-3">
            POSTER 07 · FAMILY & COMMUNITY PROTECTION
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#102D50] uppercase tracking-tight">
            PROTECT
          </h2>
          <h3 className="font-display text-4xl sm:text-6xl text-[#D9272E] uppercase tracking-tight flex items-center justify-center gap-2">
            <span>THE PEOPLE YOU LOVE</span>
            <Heart className="w-8 h-8 sm:w-12 h-12 text-[#D9272E] fill-[#D9272E] inline-block animate-pulse" />
          </h3>
          <p className="text-base sm:text-lg text-slate-700 font-medium mt-2">
            Haze conditions can change throughout the day. Look out for one another and share official advice with those you care about.
          </p>
        </div>

        {/* Layout: Family Illustration Centerpiece + Checklist + Sharing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Poster 07 Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-3 border-4 border-[#102D50] poster-shadow overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src="/images/story07.png"
                  alt="Protect The People You Love poster illustration of multi-generational Singapore family"
                  className="w-full h-full object-cover object-center cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    onOpenPoster(
                      '/images/story07.png',
                      'Protect The People You Love',
                      'Multi-generational Singapore family at home, emphasizing care, mutual protection, and community vigilance.',
                      7
                    )
                  }
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={() =>
                    onOpenPoster(
                      '/images/story07.png',
                      'Protect The People You Love',
                      'Multi-generational Singapore family at home, emphasizing care, mutual protection, and community vigilance.',
                      7
                    )
                  }
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#102D50]/90 hover:bg-[#102D50] text-[#FFD34E] text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer"
                  aria-label="Enlarge Poster 7"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Poster</span>
                </button>
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Poster 07: Family Protection</span>
                <span className="text-[#D9272E] font-bold flex items-center gap-1">
                  <span>Community Care</span>
                  <Heart className="w-3 h-3 fill-[#D9272E]" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Status Summary, Interactive Checklist & Share Card */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Live Status Snapshot Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-3 border-[#102D50] poster-shadow">
              <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-100">
                <span className="font-display text-sm uppercase text-[#102D50] font-bold">
                  Official Singapore Status Snapshot
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase font-display"
                  style={{
                    backgroundColor: `${details.colorHex}22`,
                    color: details.colorHex,
                  }}
                >
                  {details.label}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#FFF5E7] p-2.5 rounded-xl border border-[#FFD34E]/60">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Dominant 1-Hr PM2.5</span>
                  <span className="font-display text-xl font-bold" style={{ color: details.colorHex }}>
                    {hazeData?.pm25 ?? '—'} µg/m³
                  </span>
                </div>

                <div className="bg-[#FFF5E7] p-2.5 rounded-xl border border-[#FFD34E]/60">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Dominant 24-Hr PSI</span>
                  <span className="font-display text-xl font-bold text-[#102D50]">
                    {hazeData?.psi ?? '—'}
                  </span>
                </div>

                <div className="bg-[#FFF5E7] p-2.5 rounded-xl border border-[#FFD34E]/60 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Observation</span>
                  <span className="text-[11px] font-semibold text-slate-800 line-clamp-1">
                    {formatObservationTime(hazeData?.observedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Family Protection Interactive Checklist */}
            <div className="bg-white rounded-2xl p-5 border-3 border-[#102D50] poster-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-base text-[#102D50] uppercase tracking-wide flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#218451]" />
                  <span>Household Haze Checklist</span>
                </h4>
                <span className="text-xs font-bold text-[#218451]">
                  {checklist.filter((c) => c.done).length} / {checklist.length} Complete
                </span>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer select-none ${
                      item.done
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <button
                      className="mt-0.5 text-slate-600 focus:outline-none"
                      aria-label={item.done ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {item.done ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <span className={`text-xs font-medium leading-snug ${item.done ? 'line-through opacity-80' : ''}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent Share Banner with Native Web Share & Fallback */}
            <div className="bg-[#D9272E] text-white rounded-2xl p-5 sm:p-6 shadow-xl border-2 border-white flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-[#FFD34E] text-xs font-extrabold uppercase font-display tracking-widest mb-1">
                  <Heart className="w-3.5 h-3.5 fill-[#FFD34E]" />
                  <span>COMMUNITY ACTION</span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl uppercase tracking-wide font-black">
                  SHARE WITH SOMEONE YOU CARE ABOUT
                </h4>
                <p className="text-xs text-rose-100 font-medium mt-1">
                  It might help them stay safer and make better outdoor decisions today.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShare}
                  className="px-5 py-3 rounded-xl bg-white text-[#D9272E] hover:bg-[#FFF5E7] font-display text-sm uppercase tracking-wider font-black flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Now</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title="Copy Link to Clipboard"
                  aria-label="Copy Link"
                >
                  {copied ? <Check className="w-5 h-5 text-[#FFD34E]" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {copied && (
              <div className="bg-[#102D50] text-[#FFD34E] text-xs py-2 px-4 rounded-xl text-center font-bold animate-fade-in shadow-md">
                ✓ Link copied to clipboard! Share it in your family or group chat.
              </div>
            )}

            {shareSuccess && (
              <div className="bg-[#218451] text-white text-xs py-2 px-4 rounded-xl text-center font-bold animate-fade-in shadow-md">
                ✓ Shared successfully! Thank you for caring for Singapore.
              </div>
            )}

            {/* Official Portal Outlink & Reassuring Closing Message */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-slate-600">
              <a
                href="https://www.haze.gov.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#102D50] text-[#FFD34E] font-bold hover:bg-[#19406f] transition-colors"
              >
                <span>Visit Official Haze.gov.sg Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <p className="text-xs font-semibold text-slate-700 italic text-center sm:text-right">
                “Stay informed. Take care of one another. Breathe better together.” ♡
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
