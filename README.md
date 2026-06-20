# 🧭 Career Guider

An AI-powered career guidance website for **Indian students**, built with Next.js.
It solves a common problem: students often don't know which careers fit their interests
and education. Career Guider gives them a clear, India-specific roadmap.

## Two modes

1. **Discover my path** — enter your education (class / stream / degree) and your interest
   areas → get suggested careers + a step-by-step roadmap from your current stage.
2. **I have a goal** — enter a target goal (e.g. "become a doctor") + your current
   education → get a complete step-by-step guide to reach it.

Roadmaps are anchored to the Indian system: real entrance exams (JEE, NEET, CUET, CLAT,
CAT, GATE, UPSC…), real degrees and institutions (IITs, NITs, AIIMS, IIMs, NLUs…),
realistic timelines, and both government and private/affordable paths.

## Tech

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS**
- **Google Gemini** (`gemini-2.5-flash`) via the official `@google/genai` SDK
- **Zod** for request validation
- No database, no login. The Gemini key is used **server-side only** through a Next.js
  Route Handler (`app/api/guide/route.ts`), so it is never exposed to the browser.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Get a free Gemini API key from https://aistudio.google.com/app/apikey

3. Add it to `.env.local`:

   ```bash
   GEMINI_API_KEY=your_key_here
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Project structure

```
app/
  page.tsx              # Landing page (two modes)
  discover/page.tsx     # Mode 1: interests + education -> roadmap
  goal/page.tsx         # Mode 2: goal + education -> guide
  api/guide/route.ts    # Server-side Gemini proxy (key stays here)
components/             # EducationFields, InterestPicker, RoadmapView, CareerCard, ...
lib/
  india.ts             # Indian education constants (levels, streams, exams, interests)
  schema.ts            # Zod request schema + result types
  gemini.ts            # Gemini client, response schema, prompt builders
  useGuide.ts          # Client hook that calls /api/guide
```

## Deploy

Deploys to Vercel's free tier out of the box. Set `GEMINI_API_KEY` as an environment
variable in the Vercel project settings.

> Note: there is no auth, so the API key is yours. Before a wide public launch, consider
> adding rate-limiting to `app/api/guide/route.ts`.
