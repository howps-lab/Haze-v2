import React, { useEffect, useState } from 'react';
import { formatSingaporeTime } from '../utils/hazeClassifier';
import { RefreshCw, Radio, AlertTriangle, WifiOff } from 'lucide-react';
import { HazeData } from '../types/haze';

interface LiveClockProps {
  hazeData: HazeData | null;
  isLoading: boolean;
  onRefresh: () => void;
  nextPollSeconds: number;
}

export const LiveClock: React.FC<LiveClockProps> = ({
  hazeData,
  isLoading,
  onRefresh,
  nextPollSeconds,
}) => {
  const [currentTime, setCurrentTime] = useState<{
    fullDate: string;
    timeString: string;
    iso: string;
  }>(() => formatSingaporeTime());

  // Independent clock interval running every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatSingaporeTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Determine status indicator
  const getStatusBadge = () => {
    if (isLoading) {
      return {
        label: 'Updating',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        dotColor: 'bg-amber-500 animate-ping',
        icon: RefreshCw,
        description: 'Retrieving latest official haze readings...',
      };
    }
    if (!hazeData || !hazeData.sourceAvailable) {
      return {
        label: 'Unavailable',
        color: 'bg-rose-100 text-rose-800 border-rose-300',
        dotColor: 'bg-rose-500',
        icon: WifiOff,
        description: 'Unable to reach official source. Retaining safe state.',
      };
    }
    if (hazeData.isStale) {
      return {
        label: 'Delayed',
        color: 'bg-orange-100 text-orange-800 border-orange-300',
        dotColor: 'bg-orange-500',
        icon: AlertTriangle,
        description: 'Official data older than 2 hours. Showing last verified report.',
      };
    }
    return {
      label: 'Live Connection',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      dotColor: 'bg-emerald-500 animate-pulse',
      icon: Radio,
      description: 'Connected to official Singapore government environmental feed.',
    };
  };

  const status = getStatusBadge();
  const StatusIcon = status.icon;

  return (
    <div className="bg-[#102D50] text-white py-1.5 px-3 sm:px-5 shadow-sm border-b-2 border-[#FFD34E]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Live Singapore Clock - Reduced by ~30% */}
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-7 bg-[#FFD34E] rounded-full hidden sm:block" />
          <div>
            <div className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[#D9EEFA] font-semibold flex items-center gap-1">
              <span>SINGAPORE STANDARD TIME</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#FFD34E]"></span>
              <span>LIVE CLOCK</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-sm sm:text-base tracking-wide text-white">
                {currentTime.fullDate}
              </span>
              <span className="font-display text-sm sm:text-lg text-[#FFD34E] font-bold tabular-nums">
                {currentTime.timeString}
              </span>
            </div>
          </div>
        </div>

        {/* Feed Status & Refresh Action (Observation Time section removed) */}
        <div className="flex items-center gap-2 text-xs">
          {/* Status Indicator */}
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-semibold ${status.color}`}
            title={status.description}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
            <StatusIcon className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{status.label}</span>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFD34E] text-[#102D50] hover:bg-[#ffe082] active:bg-[#f5c93d] font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs"
            title="Force refresh air-quality data from Singapore government portal"
            aria-label="Refresh haze readings"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
            <span className="text-[10px] opacity-75 font-normal hidden lg:inline">
              ({nextPollSeconds}s)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
