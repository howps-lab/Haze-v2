import { HazeData } from '../types/haze';
import { normaliseOfficialHazeData } from '../utils/hazeClassifier';

/**
 * Service to fetch official Singapore Haze data.
 * Tries server-side API `/api/haze` first (with caching and timeout handling).
 * If unavailable (e.g. running statically or serverless), falls back directly to official
 * `api.data.gov.sg` endpoints client-side.
 */
export async function fetchHazeData(forceRefresh: boolean = false): Promise<HazeData> {
  // Strategy 1: Try backend proxy
  try {
    const url = `/api/haze${forceRefresh ? '?refresh=true' : ''}`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json.data as HazeData;
      }
    }
  } catch (backendErr) {
    console.warn('Backend proxy fetch failed, falling back to direct data.gov.sg:', backendErr);
  }

  // Strategy 2: Direct official client-side fetch fallback
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const [pm25Res, psiRes] = await Promise.all([
      fetch('https://api.data.gov.sg/v1/environment/pm25', { signal: controller.signal }),
      fetch('https://api.data.gov.sg/v1/environment/psi', { signal: controller.signal }).catch(() => null),
    ]);
    clearTimeout(timeout);

    if (pm25Res && pm25Res.ok) {
      const pm25Data = await pm25Res.json();
      const psiData = psiRes && psiRes.ok ? await psiRes.json() : null;
      return normaliseOfficialHazeData(pm25Data, psiData);
    }
  } catch (directErr) {
    console.error('Direct government API fetch failed:', directErr);
  }

  // Failsafe: return safe unavailable status without falsifying readings
  return normaliseOfficialHazeData(null);
}
