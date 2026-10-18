import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { normaliseOfficialHazeData } from './src/utils/hazeClassifier.ts';
import { HazeData } from './src/types/haze.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const portArgIndex = process.argv.indexOf('--port');
const portArg = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
const PORT = portArg || 3000;

// In-memory cache for official Singapore haze data
let cachedHazeData: HazeData | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds cache

async function fetchFromOfficialSource(): Promise<HazeData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const [pm25Res, psiRes] = await Promise.all([
      fetch('https://api.data.gov.sg/v1/environment/pm25', {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      }),
      fetch('https://api.data.gov.sg/v1/environment/psi', {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeoutId);

    if (!pm25Res.ok) {
      throw new Error(`PM2.5 API responded with status ${pm25Res.status}`);
    }

    const pm25Data = await pm25Res.json();
    const psiData = psiRes.ok ? await psiRes.json() : null;

    const normalised = normaliseOfficialHazeData(pm25Data, psiData);
    cachedHazeData = normalised;
    lastCacheTime = Date.now();
    return normalised;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error('Error fetching official haze data:', err?.message || err);

    // If we have previous cached data, return it marked as stale
    if (cachedHazeData) {
      return {
        ...cachedHazeData,
        isStale: true,
        sourceAvailable: false,
      };
    }

    // Otherwise return safe unavailable structure without fake data
    return normaliseOfficialHazeData(null);
  }
}

app.use(express.json());

// API route for live haze data
app.get('/api/haze', async (_req, res) => {
  const forceRefresh = _req.query.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && cachedHazeData && now - lastCacheTime < CACHE_TTL_MS) {
    return res.json({
      success: true,
      cached: true,
      cacheAgeSeconds: Math.round((now - lastCacheTime) / 1000),
      data: cachedHazeData,
    });
  }

  const freshData = await fetchFromOfficialSource();
  return res.json({
    success: true,
    cached: false,
    cacheAgeSeconds: 0,
    data: freshData,
  });
});

// API health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    service: 'Singapore Haze Monitor API',
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Singapore Haze Monitor Server running on port ${PORT} (0.0.0.0)`);
  });
}

startServer();
