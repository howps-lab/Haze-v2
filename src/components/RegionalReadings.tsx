import React from 'react';
import { HazeData, RegionalReading, SingaporeRegion } from '../types/haze';
import { classifyPM25, getClassificationDetails } from '../utils/hazeClassifier';
import { MapPin, Wind, Activity } from 'lucide-react';

interface RegionalReadingsProps {
  hazeData: HazeData | null;
  selectedRegion: SingaporeRegion | 'All';
  onSelectRegion: (region: SingaporeRegion | 'All') => void;
}

export const RegionalReadings: React.FC<RegionalReadingsProps> = ({
  hazeData,
  selectedRegion,
  onSelectRegion,
}) => {
  const regions: SingaporeRegion[] = ['North', 'South', 'East', 'West', 'Central'];

  const getRegionData = (name: SingaporeRegion): RegionalReading | undefined => {
    return hazeData?.regions.find((r) => r.region === name);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border-3 border-[#102D50] poster-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b pb-3 border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D9272E]" />
            <h3 className="font-display text-xl sm:text-2xl text-[#102D50] tracking-wide uppercase">
              Singapore Regional Air Quality
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            1-Hour PM2.5 (µg/m³) and 24-Hour PSI reported across 5 official geographic zones
          </p>
        </div>

        {/* Region selector filter */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-[#FFF5E7] rounded-xl border border-[#FFD34E]/60 shrink-0">
          <button
            onClick={() => onSelectRegion('All')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              selectedRegion === 'All'
                ? 'bg-[#102D50] text-[#FFD34E]'
                : 'text-[#102D50] hover:bg-white'
            }`}
          >
            All Island
          </button>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => onSelectRegion(reg)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#102D50] text-[#FFD34E]'
                  : 'text-[#102D50] hover:bg-white'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 5 Regional Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {regions.map((regionName) => {
          const data = getRegionData(regionName);
          const pm25 = data?.pm25;
          const psi = data?.psi;
          const status = classifyPM25(pm25);
          const details = getClassificationDetails(status);
          const isSelected = selectedRegion === regionName || selectedRegion === 'All';

          return (
            <div
              key={regionName}
              onClick={() => onSelectRegion(regionName)}
              className={`rounded-xl p-3.5 border-2 transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-[#102D50] bg-white shadow-md transform -translate-y-0.5'
                  : 'border-slate-200 bg-slate-50 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Category Color Accent Header Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: details.colorHex }}
              />

              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-base text-[#102D50] uppercase tracking-wide">
                  {regionName}
                </span>
                <span
                  className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${details.colorHex}22`,
                    color: details.colorHex,
                  }}
                >
                  {details.label}
                </span>
              </div>

              {/* 1-Hour PM2.5 metric */}
              <div className="mb-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                  <Wind className="w-3 h-3" />
                  <span>1-HR PM2.5</span>
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className="font-display text-2xl font-bold tracking-tight"
                    style={{ color: details.colorHex }}
                  >
                    {pm25 !== null && pm25 !== undefined ? pm25 : '—'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">µg/m³</span>
                </div>
              </div>

              {/* 24-Hour PSI metric (enlarged by 80%) */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-600 font-bold uppercase">
                    <Activity className="w-3.5 h-3.5 text-[#D9272E]" />
                    <span>24-HR PSI</span>
                  </div>
                  {psi && psi > 100 && (
                    <span className="text-[10px] font-black text-[#D9272E] uppercase">Unhealthy</span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-2xl sm:text-3xl font-black text-[#102D50] tracking-tight">
                    {psi !== null && psi !== undefined ? psi : '—'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">PSI index</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
