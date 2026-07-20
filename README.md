# NEXUS
## Built during Codex Nightline - Hackthon inside Kochi Metro Rail

**Counterfactuals. Real-World Consequences.**

NEXUS is an interactive alternate-history simulator built for the Codex Nightline Hackathon by Godly K Mathews. It turns historical events into speculative, causally structured timeline branches while clearly labelling generated outcomes as simulations rather than facts.

<img width="1694" height="890" alt="Screenshot 2026-07-19 at 4 10 05 AM" src="https://github.com/user-attachments/assets/94770594-9d5e-4628-87a2-59848fb4dd13" />

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

<img width="3420" height="1978" alt="image" src="https://github.com/user-attachments/assets/2fab0da1-3a1a-4b84-9ed8-78bf12219522" />

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
