# Google Maps traffic explainer

Editable Remotion project for the supplied Bengali voiceover. The composition is 1080×1920, 30 fps, about 121.77 seconds, with the original narration, SRT-derived Bengali karaoke captions, and custom frame-driven 2D illustrations.

## Requirements

- Node.js 18 or newer and pnpm 9 or newer.
- A desktop Linux, macOS, or Windows environment supported by Remotion, with Chrome/Chromium available for rendering. Remotion uses FFmpeg for MP4 encoding. The Android Termux environment where this project was created does not have the local Remotion/FFmpeg render stack.

## Install and preview

```sh
pnpm install
pnpm preview
```

## Render MP4

```sh
pnpm render
```

The output is `out/google-maps-traffic-explainer.mp4` (H.264, AAC, `yuv420p`, CRF 18). To render the composition directly, use:

```sh
pnpm exec remotion render src/index.ts TrafficExplainer out/google-maps-traffic-explainer.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --audio-codec=aac
```

## Project files

- `public/voice.mp3` — unchanged copy of the supplied voiceover.
- `public/subtitles-original.srt` — unchanged copy of the supplied subtitles.
- `public/subtitles.srt` — display-ready copy with two missing spaces restored at obvious word boundaries.
- `src/cues.json` — parsed cue timings and text used to make deterministic word timings.
- `src/Stage.tsx` and `src/Illustrations.tsx` — scene composition and reusable illustrated objects. Hind Siliguri and Manrope are local font-package dependencies, not runtime web fonts.
- `src/captions.tsx` and `src/timing.ts` — caption chunking, cue-local word timing, and active-word highlight.
- `src/corrections.json` — subtitle edits, uncertain wording, and timing notes.

## Timing and accuracy notes

The SRT’s final cue ends at 120.440 seconds. The MP3 frame stream is approximately 120.764 seconds, so the composition covers the audio and adds a one-second visual hold. Since Whisper/ASR was unavailable during project creation, each word is timed proportionally to its grapheme length inside its original SRT cue. This preserves cue boundaries but is not phoneme-accurate; `src/corrections.json` records the limitation and the one unresolved “Google Map” versus “Google Maps” spelling variation.

The illustrations use the guide’s role-based palette and flat, full-object motion. They show generic roads, cars, phones, GPS dots, historical/current information, and road incidents. No Google logo or app UI is recreated.
