import React, { useEffect } from 'react';
import { X, ExternalLink, Download, Sparkles } from 'lucide-react';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption: string;
  storyNumber: number;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
  storyNumber,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#102D50]/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border-4 border-[#102D50]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#102D50] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#FFD34E]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#FFD34E] text-[#102D50] font-black text-xs flex items-center justify-center font-display">
              0{storyNumber}
            </span>
            <div>
              <h2 className="font-display text-lg sm:text-xl tracking-wide uppercase text-[#FFD34E]">
                {title}
              </h2>
              <p className="text-xs text-[#D9EEFA]">Official Campaign Illustrated Poster</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1e4472] hover:bg-[#D9272E] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image Body */}
        <div className="flex-1 overflow-auto p-4 bg-[#FFF5E7]/50 flex items-center justify-center">
          <div className="relative max-w-full">
            <img
              src={imageSrc}
              alt={title}
              className="max-h-[68vh] w-auto mx-auto rounded-xl shadow-lg border-2 border-[#102D50]/20 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
          <p className="font-medium text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#EE6237]" />
            <span>{caption}</span>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#102D50] text-[#102D50] hover:bg-[#D9EEFA] font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full View</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#102D50] text-white hover:bg-[#1a4373] font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
