# NEXUS

**Counterfactuals. Real-World Consequences.**

NEXUS is an interactive alternate-history simulator built for the Codex Nightline Hackathon by Godly K Mathews. It turns historical events into speculative, causally structured timeline branches while clearly labelling generated outcomes as simulations rather than facts.

## Features

- Interactive prime-history timeline with selectable historical records
- AI-generated alternate-history Nexus branches with causal mechanisms, confidence, assumptions, counterforces, and continuities
- Structured OpenAI Responses API output validated with Zod
- Lazy AI illustration generation with a local project cache in `public/generated/`
- Local JSON archive for generated branches in `data/nexus-timelines.json`
- Add custom prime events to the timeline and use them as branch anchors
- Prune speculative branches with an animated dissolve effect
- Browser-native text-to-speech narration — no TTS API credits required
- Intro video loader using `public/background/background_loader.mp4`
- Animated temporal-energy timeline, branch visuals, image hover previews, and responsive detail panel

## Tech Stack

- Next.js App Router
- TypeScript
- React and Tailwind CSS
- OpenAI JavaScript SDK
- Zod
- Framer Motion
- Lucide React

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
OPENAI_API_KEY=
OPENAI_TEXT_MODEL=gpt-5.6
OPENAI_IMAGE_MODEL=gpt-image-2
OPENAI_IMAGE_QUALITY=low
```

`OPENAI_API_KEY` is required only for AI branch generation and image generation. Browser narration uses the free Web Speech API and does not call OpenAI.

## Local Persistence

- Generated branch JSON is stored in `data/nexus-timelines.json` and browser storage.
- Generated images are saved under `public/generated/`, preventing duplicate image-generation calls for the same event.
- User-added prime events are saved in browser storage.

## Controls

- Select an amber timeline node to inspect a historical record.
- Use **Create Nexus** to generate an alternate branch from the selected prime event.
- Use **Add Event** to create a custom prime-history anchor.
- Use **Prune Branch** to remove a speculative branch.
- Use **Listen to Record** for browser-native narration.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```
