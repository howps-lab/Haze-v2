# THE HAZE — Stay Informed. Breathe Better. Protect the People You Love.

An interactive illustrated public information campaign and real-time haze monitoring web application created specifically for Singapore residents, families, commuters, students, and vulnerable individuals.

Designed following the visual identity, warm cream palette, bold navy & red typography, and seven sequential public service posters published for Singapore air quality education.

---

## 🌟 Key Features

1. **Official Singapore Air Quality Data Integration**:
   - Primary data feeds from the **National Environment Agency (NEA)** via `api.data.gov.sg` and `haze.gov.sg`.
   - Live **1-hour PM2.5 readings** (in µg/m³) to guide immediate outdoor decisions.
   - Live **24-hour PSI readings** across five geographical regions: North, South, East, West, and Central Singapore.
   - Zero fabricated readings: when data is unavailable or undergoing refresh, honest system states are displayed without simulation or defaulting to normal.

2. **Live Singapore Standard Time Clock**:
   - Updates every second using `Intl.DateTimeFormat` configured with `Asia/Singapore` (SGT).
   - Keeps the live clock strictly distinct from official observation and retrieval timestamps.
   - Live connection, Updating, Delayed, and Unavailable status indicators.

3. **Complete 7-Poster Illustrated Storytelling Flow**:
   - **Story 01 — The Haze Is Back**: Hero overview with dynamic headline adapting to current readings.
   - **Story 02 — Going Out? Check This First**: Immediate 1-Hour PM2.5 activity cards for Walking, Jogging, Cycling, and Playgrounds.
   - **Story 03 — What Does Your PM2.5 Reading Mean?**: Four official bands (Normal, Elevated, High, Very High) with active highlight and visual concentration scale.
   - **Story 04 — Some People Need Extra Care**: Dedicated guidance for children, elderly, pregnant women, and chronic heart/lung conditions.
   - **Story 05 — Do You Need an N95? Not Always**: Short trips vs. prolonged exposure, mask fit, and child safety precautions.
   - **Story 06 — What Else Can You Do?**: Four practical home steps (reduce outdoor time, move activities indoors, seal windows/air purifier, monitor symptoms).
   - **Story 07 — Protect the People You Love**: Household checklist, Web Share API integration, copy-link fallback, and link to `haze.gov.sg`.

4. **Interactive Modes**:
   - **Scroll Flow Mode**: Seamless vertical reading journey through the campaign.
   - **Slide Viewer Mode**: Focused presentation reader with previous/next navigation and carousel dots.
   - **Poster Lightbox / Modal**: Enlarge and inspect any of the seven posters in high resolution.
   - **QA Test Simulation Mode**: Toggle between Live Official Data and Normal / Elevated / High / Very High test states to verify health advice behaviors.

---

## 🎨 Color Palette & Typography

- **Navy**: `#102D50` (Headlines, badges, high contrast text)
- **Red**: `#D9272E` (High/Very High alerts, accent headlines)
- **Green**: `#218451` (Normal category, positive guidance)
- **Yellow**: `#FFD34E` (Highlight strokes, warning accents)
- **Amber**: `#F4B52C` (Elevated category)
- **Orange**: `#EE6237` (High category)
- **Light Blue**: `#D9EEFA` (Subtle informational panels)
- **Warm Cream**: `#FFF5E7` (Background canvas)
- **Typography**: Display headlines powered by `Anton` and `Barlow Condensed`, paired with `Plus Jakarta Sans` for supporting body text.

---

## 📊 Official PM2.5 Classification Matrix

| 1-Hour PM2.5 Concentration | Official Category | Color Code | Healthy Adults Guidance | Vulnerable Groups Guidance |
| :--- | :--- | :--- | :--- | :--- |
| **0 – 55 µg/m³** | **Normal** | Green (`#218451`) | Normal outdoor activities | Normal activities |
| **56 – 150 µg/m³** | **Elevated** | Amber (`#F4B52C`) | Reduce strenuous outdoor activity | Avoid strenuous outdoor activity |
| **151 – 250 µg/m³** | **High** | Orange (`#EE6237`) | Avoid strenuous outdoor activity | Avoid outdoor activity |
| **251 µg/m³ & above** | **Very High** | Red (`#D9272E`) | Minimise outdoor activity | Avoid outdoor activity |

---

## ⚡ Data Architecture & Caching

1. **Server-Side Cache (`server.ts`)**:
   - Backend endpoint `/api/haze` caches official Singapore responses for **60 seconds**.
   - Handles network timeouts with an `AbortController` (6,000ms threshold).
   - Returns last verified reading with `isStale: true` if an upstream query fails.
2. **Client-Side Failover (`hazeApi.ts`)**:
   - Automatically attempts the server proxy `/api/haze`.
   - If deploying as a pure static site (or if the backend proxy is unreachable), seamlessly fails over to direct client-side fetching from `https://api.data.gov.sg/v1/environment/pm25` and `psi`.
   - Both pathways run through the identical, unit-tested normalisation and classification logic in `src/utils/hazeClassifier.ts`.

---

## 🧪 Testing

Run the automated classification and data validation suite:

```bash
npm test
```

This verifies:
- Correct classification at boundary thresholds (55, 56, 150, 151, 250, 251 µg/m³).
- Missing, negative, and invalid values return `unavailable` and never silently default to `normal`.
- Five Singapore regions (North, South, East, West, Central) map correctly.
- Observation timestamps remain distinct from retrieval timestamps.
- Stale data detection triggers accurately for observations older than 120 minutes.

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Full-Stack Development Server**:
   ```bash
   npm run dev
   ```
   Opens on `http://localhost:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Vercel Deployment Instructions

1. **Option A: GitHub Integration (Recommended)**:
   - Push this repository to GitHub.
   - Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
   - Select your repository.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **Deploy**.

2. **Option B: Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Custom Domain Setup**:
   - In your Vercel Project Settings, navigate to **Domains**.
   - Enter your custom domain (e.g., `haze.sg` or `thehaze.yourdomain.com`).
   - Configure the required DNS CNAME / A records as provided by Vercel.

---

## 🏛️ Official Attribution

This application is an independent public information resource. Official air quality observations and PSI data are provided by the Singapore National Environment Agency (NEA) via [data.gov.sg](https://data.gov.sg) and [haze.gov.sg](https://www.haze.gov.sg).
