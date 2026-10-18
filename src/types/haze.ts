export type AirQualityStatus =
  | "normal"
  | "elevated"
  | "high"
  | "very-high"
  | "unavailable";

export type SingaporeRegion = "North" | "South" | "East" | "West" | "Central";

export interface RegionalReading {
  region: SingaporeRegion;
  pm25?: number | null;
  psi?: number | null;
}

export interface HazeData {
  source: string;
  observedAt?: string | null;
  fetchedAt: string;
  currentStatus: AirQualityStatus;
  pm25?: number | null;
  pm25Min?: number | null;
  pm25Max?: number | null;
  psi?: number | null;
  psiMin?: number | null;
  psiMax?: number | null;
  psiForecast?: string | null;
  regions: RegionalReading[];
  advisory?: string | null;
  isStale: boolean;
  sourceAvailable: boolean;
}

export interface ClassificationDetails {
  category: AirQualityStatus;
  label: string;
  rangeText: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  meaning: string;
  healthyAdultsAdvice: string;
  vulnerableGroupsAdvice: string;
  outdoorActivities: {
    walking: { allowed: boolean; advice: string };
    jogging: { allowed: boolean; advice: string };
    cycling: { allowed: boolean; advice: string };
    playground: { allowed: boolean; advice: string };
  };
}
