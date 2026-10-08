# Resoura

The next right thing to learn, picked for you.

Resoura is a learning companion for the web. It asks what you're learning, then gives you three good picks a day, each with a short "why this, now" line. Open one, come back, and tell it how it went.

## Status: frontend draft

The primary flow works end to end with sample data:

welcome, sign-in (stub), four onboarding questions, loading doodle, three picks, open a pick in a new tab, come back and rate it.

Not yet built: real AI picks, real sign-in, "something else today", My sources, topic switching. See the plan for the backend design (Gemini with Google Search, Supabase, once-a-day cached picks).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The footer has a "Start over" link that clears the saved draft state.

## Where things are

- `components/` the screens: Welcome, SignIn, Onboarding, Loader (line-drawn doodles), Home, PickTile, RatingCard
- `lib/picks.ts` the one function the backend will replace (`getPicks`)
- `lib/storage.ts` all persistence, currently localStorage, ready to move to Supabase
- `app/globals.css` colors and motion tokens (forest, grass, moss, leaf, paper, azure)

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS 4. Fonts: Host Grotesk and Geist Mono.
