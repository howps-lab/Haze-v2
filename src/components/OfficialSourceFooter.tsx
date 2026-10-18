import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Info, Clock } from 'lucide-react';
import { HazeData } from '../types/haze';
import { formatObservationTime } from '../utils/hazeClassifier';

interface OfficialSourceFooterProps {
  hazeData: HazeData | null;
}

export const OfficialSourceFooter: React.FC<OfficialSourceFooterProps> = ({ hazeData }) => {
  const officialLinks = [
    { name: 'Official Haze Portal', url: 'https://www.haze.gov.sg/' },
    { name: '1-Hour PM2.5 Readings', url: 'https://www.haze.gov.sg/resources/1-hr-pm2.5-readings' },
    { name: 'Pollutant Concentrations', url: 'https://www.haze.gov.sg/resources/pollutant-concentrations' },
    { name: 'Readings Over Last 24 Hours', url: 'https://www.haze.gov.sg/resources/readings-over-the-last-24-hours' },
    { name: 'Historical Readings', url: 'https://www.haze.gov.sg/resources/historical-readings' },
    { name: 'NEA Open Data API', url: 'https://data.gov.sg/' },
  ];

  return (
    <footer className="bg-[#102D50] text-[#D9EEFA] border-t-4 border-[#FFD34E] pt-12 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#D9272E] text-white font-display text-sm font-black flex items-center justify-center shadow-md">
                SG
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wider font-bold">
                THE HAZE
              </h3>
            </div>
            <p className="text-sm font-bold text-[#FFD34E]">
              Stay Informed. Breathe Better. Protect the People You Love.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              An interactive illustrated public health campaign created specifically for Singapore residents, families, commuters, students, and vulnerable individuals.
            </p>
            
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#218451]" />
              <span>Independent informational interface powered by official government open data.</span>
            </div>
          </div>

          {/* Official Government Data Sources */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display text-sm uppercase tracking-wider text-white font-bold border-b border-[#2b588f] pb-1.5">
              Official Government Data Resources
            </h4>
            <ul className="space-y-2 text-xs">
              {officialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFD34E] flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#FFD34E]" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Integrity & Freshness Metadata */}
          <div className="md:col-span-3 space-y-3 bg-[#173d6b] p-4 rounded-2xl border border-[#2b588f]">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#FFD34E] font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Data Provenance</span>
            </h4>
            
            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Primary Source:</span>
                <span className="text-white font-medium">National Environment Agency</span>
              </div>

              <div>
                <span className="text-slate-400 block">Observation Timestamp:</span>
                <span className="text-white font-medium">
                  {formatObservationTime(hazeData?.observedAt)}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Client Retrieval:</span>
                <span className="text-white font-medium">
                  {hazeData?.fetchedAt ? formatObservationTime(hazeData.fetchedAt) : 'Just now'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Integrity Guarantee:</span>
                <span className="text-emerald-400 font-semibold">
                  Zero fabricated readings
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-6 border-t border-[#204c82] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            Public health advice referenced from Singapore Ministry of Health (MOH) and National Environment Agency (NEA) guidelines.
          </p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Take Care Singapore · Breathe Better Together</span>
            <Heart className="w-3.5 h-3.5 text-[#D9272E] fill-[#D9272E]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
