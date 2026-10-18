import { AirQualityStatus, ClassificationDetails, HazeData, RegionalReading, SingaporeRegion } from '../types/haze';

/**
 * Classifies 1-hour PM2.5 readings into official Singapore categories:
 * 0 - 55 µg/m³: Normal (Green)
 * 56 - 150 µg/m³: Elevated (Amber)
 * 151 - 250 µg/m³: High (Orange)
 * 251 µg/m³ & above: Very High (Red)
 * 
 * Safe handling:
 * Missing, NaN, null, undefined, or negative values return 'unavailable'
 * and NEVER default to Normal.
 */
export function classifyPM25(pm25: number | null | undefined): AirQualityStatus {
  if (pm25 === null || pm25 === undefined || isNaN(pm25) || typeof pm25 !== 'number' || pm25 < 0) {
    return 'unavailable';
  }

  if (pm25 <= 55) {
    return 'normal';
  } else if (pm25 <= 150) {
    return 'elevated';
  } else if (pm25 <= 250) {
    return 'high';
  } else {
    return 'very-high';
  }
}

/**
 * Provides comprehensive public health advice and metadata for each PM2.5 category
 */
export function getClassificationDetails(status: AirQualityStatus): ClassificationDetails {
  switch (status) {
    case 'normal':
      return {
        category: 'normal',
        label: 'Normal',
        rangeText: '0 – 55 µg/m³',
        colorHex: '#218451',
        badgeBg: 'bg-[#218451]/15',
        badgeText: 'text-[#218451]',
        borderColor: 'border-[#218451]',
        meaning: 'Air quality is good. Particulate pollution is low and poses little or no risk.',
        healthyAdultsAdvice: 'Normal activities can continue. Enjoy your outdoor exercise, sports, and daily commute freely.',
        vulnerableGroupsAdvice: 'Normal activities can continue. Standard health precautions apply.',
        outdoorActivities: {
          walking: { allowed: true, advice: 'Great conditions for outdoor walking and commuting.' },
          jogging: { allowed: true, advice: 'Safe to jog and do vigorous exercise outdoors.' },
          cycling: { allowed: true, advice: 'Clear conditions for road or park cycling.' },
          playground: { allowed: true, advice: 'Safe for children to play outdoors freely.' },
        },
      };

    case 'elevated':
      return {
        category: 'elevated',
        label: 'Elevated',
        rangeText: '56 – 150 µg/m³',
        colorHex: '#F4B52C',
        badgeBg: 'bg-[#F4B52C]/20',
        badgeText: 'text-[#B8800B]',
        borderColor: 'border-[#F4B52C]',
        meaning: 'Air quality is moderately affected. Particulate concentrations are elevated above standard clean baselines.',
        healthyAdultsAdvice: 'Reduce strenuous outdoor activity. Pace yourself during workouts or take more frequent breaks.',
        vulnerableGroupsAdvice: 'Children, older adults, pregnant women, and people with heart/lung disease should avoid strenuous outdoor exertion.',
        outdoorActivities: {
          walking: { allowed: true, advice: 'Casual walking is fine; take regular shaded rests.' },
          jogging: { allowed: false, advice: 'Reduce pace and intensity, or move workout indoors.' },
          cycling: { allowed: false, advice: 'Avoid hard sprints or prolonged long-distance rides.' },
          playground: { allowed: true, advice: 'Keep playtime light; have children drink plenty of water.' },
        },
      };

    case 'high':
      return {
        category: 'high',
        label: 'High',
        rangeText: '151 – 250 µg/m³',
        colorHex: '#EE6237',
        badgeBg: 'bg-[#EE6237]/20',
        badgeText: 'text-[#EE6237]',
        borderColor: 'border-[#EE6237]',
        meaning: 'Air quality is unhealthy. Prolonged exposure can trigger respiratory irritation and exacerbate symptoms.',
        healthyAdultsAdvice: 'Avoid strenuous outdoor activity. Choose indoor exercise such as home workouts, yoga, or indoor gyms.',
        vulnerableGroupsAdvice: 'Vulnerable groups should avoid outdoor activities and remain indoors with windows and doors closed.',
        outdoorActivities: {
          walking: { allowed: false, advice: 'Limit outdoor walking to essential short trips.' },
          jogging: { allowed: false, advice: 'Do not jog outdoors. Shift exercise entirely indoors.' },
          cycling: { allowed: false, advice: 'Avoid outdoor cycling due to elevated breathing rates.' },
          playground: { allowed: false, advice: 'Move play indoors; avoid outdoor playgrounds.' },
        },
      };

    case 'very-high':
      return {
        category: 'very-high',
        label: 'Very High',
        rangeText: '251 µg/m³ and above',
        colorHex: '#D9272E',
        badgeBg: 'bg-[#D9272E]/20',
        badgeText: 'text-[#D9272E]',
        borderColor: 'border-[#D9272E]',
        meaning: 'Air quality is very unhealthy. Serious risk of eye, throat, and respiratory discomfort for the general population.',
        healthyAdultsAdvice: 'Minimise outdoor activity. Stay indoors, keep windows closed, and use an air purifier if available.',
        vulnerableGroupsAdvice: 'Strictly avoid outdoor activity. Vulnerable persons must stay indoors and have prescribed medication on hand.',
        outdoorActivities: {
          walking: { allowed: false, advice: 'Minimise all outdoor exposure. Wear a well-fitted N95 if outdoors for extended periods.' },
          jogging: { allowed: false, advice: 'Outdoor jogging strictly not recommended.' },
          cycling: { allowed: false, advice: 'Outdoor cycling strictly not recommended.' },
          playground: { allowed: false, advice: 'Outdoor playgrounds must be avoided.' },
        },
      };

    case 'unavailable':
    default:
      return {
        category: 'unavailable',
        label: 'Unavailable',
        rangeText: 'Reading not available',
        colorHex: '#64748B',
        badgeBg: 'bg-slate-200',
        badgeText: 'text-slate-700',
        borderColor: 'border-slate-300',
        meaning: 'Official haze data could not be retrieved or is currently being verified.',
        healthyAdultsAdvice: 'Please check back shortly or visit haze.gov.sg for official government updates.',
        vulnerableGroupsAdvice: 'If experiencing respiratory symptoms or noticing haze odor, stay indoors and seek medical advice if needed.',
        outdoorActivities: {
          walking: { allowed: true, advice: 'Check local sky visibility before heading out.' },
          jogging: { allowed: true, advice: 'Proceed with caution until official data updates.' },
          cycling: { allowed: true, advice: 'Proceed with caution until official data updates.' },
          playground: { allowed: true, advice: 'Proceed with caution until official data updates.' },
        },
      };
  }
}

/**
 * Checks whether an observation timestamp is stale (e.g. older than 120 minutes)
 */
export function isDataStale(observedAt: string | null | undefined, thresholdMinutes: number = 120): boolean {
  if (!observedAt) return true;
  try {
    const obsDate = new Date(observedAt);
    if (isNaN(obsDate.getTime())) return true;
    const now = new Date();
    const diffMs = now.getTime() - obsDate.getTime();
    return diffMs > thresholdMinutes * 60 * 1000;
  } catch {
    return true;
  }
}

/**
 * Formats a Date object in Singapore Standard Time (Asia/Singapore)
 * Requirements:
 * - 12-hour format with AM/PM
 * - Full date with weekday
 * - Timezone 'SGT'
 */
export function formatSingaporeTime(date: Date = new Date()): {
  fullDate: string;
  timeString: string;
  iso: string;
} {
  const dateFormatter = new Intl.DateTimeFormat('en-SG', {
    timeZone: 'Asia/Singapore',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat('en-SG', {
    timeZone: 'Asia/Singapore',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return {
    fullDate: dateFormatter.format(date).toUpperCase(),
    timeString: `${timeFormatter.format(date)} SGT`,
    iso: date.toISOString(),
  };
}

/**
 * Formats an ISO observation string for display in Singapore local time
 */
export function formatObservationTime(isoString: string | null | undefined): string {
  if (!isoString) return 'Not available';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Not available';
    const formatter = new Intl.DateTimeFormat('en-SG', {
      timeZone: 'Asia/Singapore',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${formatter.format(d)} SGT`;
  } catch {
    return 'Not available';
  }
}

/**
 * Normalises raw responses from Singapore government APIs (data.gov.sg / haze.gov.sg)
 * into the required strict HazeData contract.
 */
export function normaliseOfficialHazeData(
  pm25Payload: any,
  psiPayload?: any,
  advisoryText?: string | null
): HazeData {
  const fetchedAt = new Date().toISOString();

  if (!pm25Payload || !pm25Payload.items || !Array.isArray(pm25Payload.items) || pm25Payload.items.length === 0) {
    return {
      source: 'Singapore National Environment Agency (data.gov.sg / haze.gov.sg)',
      observedAt: null,
      fetchedAt,
      currentStatus: 'unavailable',
      pm25: null,
      pm25Min: null,
      pm25Max: null,
      psi: null,
      psiMin: null,
      psiMax: null,
      psiForecast: null,
      regions: [],
      advisory: advisoryText || null,
      isStale: true,
      sourceAvailable: false,
    };
  }

  const latestPm25Item = pm25Payload.items[0];
  const observedAt = latestPm25Item.timestamp || null;
  const pm25Readings = latestPm25Item.readings?.pm25_one_hourly || {};

  const regionMap: Record<string, SingaporeRegion> = {
    north: 'North',
    south: 'South',
    east: 'East',
    west: 'West',
    central: 'Central',
  };

  const regions: RegionalReading[] = [];
  const pm25Values: number[] = [];
  const psiValues: number[] = [];

  const latestPsiItem = psiPayload?.items?.[0];
  const psi24HrReadings = latestPsiItem?.readings?.psi_twenty_four_hourly || {};

  (['north', 'south', 'east', 'west', 'central'] as const).forEach((regKey) => {
    const regionName = regionMap[regKey];
    const rawVal = pm25Readings[regKey];
    const numPm25 = typeof rawVal === 'number' && !isNaN(rawVal) && rawVal >= 0 ? rawVal : null;
    if (numPm25 !== null) pm25Values.push(numPm25);

    const rawPsi = psi24HrReadings[regKey];
    const numPsi = typeof rawPsi === 'number' && !isNaN(rawPsi) && rawPsi >= 0 ? rawPsi : null;
    if (numPsi !== null) psiValues.push(numPsi);

    regions.push({
      region: regionName,
      pm25: numPm25,
      psi: numPsi,
    });
  });

  // Calculate min, max, highest readings
  const pm25Min = pm25Values.length > 0 ? Math.min(...pm25Values) : null;
  const pm25Max = pm25Values.length > 0 ? Math.max(...pm25Values) : null;
  // Represent highest reading by highest regional reading or central reading
  const pm25Dominant = pm25Max !== null ? pm25Max : null;

  const psiMin = psiValues.length > 0 ? Math.min(...psiValues) : null;
  const psiMax = psiValues.length > 0 ? Math.max(...psiValues) : null;
  const psiDominant = psiMax !== null ? psiMax : null;

  const currentStatus = classifyPM25(pm25Dominant);
  const stale = isDataStale(observedAt, 120);

  return {
    source: 'National Environment Agency (haze.gov.sg / data.gov.sg)',
    observedAt,
    fetchedAt,
    currentStatus,
    pm25: pm25Dominant,
    pm25Min,
    pm25Max,
    psi: psiDominant,
    psiMin,
    psiMax,
    psiForecast: psiDominant ? (psiDominant > 100 ? 'Unhealthy' : psiDominant > 50 ? 'Moderate' : 'Good') : null,
    regions,
    advisory: advisoryText || (currentStatus === 'elevated' || currentStatus === 'high' || currentStatus === 'very-high'
      ? 'Air quality has elevated levels in parts of Singapore. Vulnerable individuals and children should reduce strenuous outdoor exertion.'
      : 'Air quality in Singapore is currently in the Normal band. Safe for all healthy outdoor activities.'),
    isStale: stale,
    sourceAvailable: true,
  };
}
