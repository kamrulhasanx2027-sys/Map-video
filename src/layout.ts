export const LAYOUT = {
  width: 1080,
  height: 1920,
  fps: 30,
  safeFromY: 1500,
  stageTop: 280,
  stageBottom: 1300,
  captionY: 1390,
  captionFont: 60,
} as const;

export const AUDIO_SECONDS = 120.764;
export const END_HOLD_SECONDS = 1;
export const DURATION_IN_FRAMES = Math.ceil(
  (AUDIO_SECONDS + END_HOLD_SECONDS) * LAYOUT.fps,
);
