export const theme = {
  bg: '#0A090C',
  surface: '#17171B',
  surfaceHi: '#222126',
  border: 'rgba(255,255,255,0.12)',
  text: '#F2F2F4',
  muted: '#8A8A92',
  accent: '#D8F838',
  onAccent: '#0A090C',
  data: '#5AC8FA',
  flow: '#4A8BF5',
  good: '#2E9A4A',
  warn: '#E89808',
  bad: '#E84838',
  indicator: 'rgba(232,152,8,0.45)',
  skin: '#D5A078',
} as const;

export type Theme = typeof theme;
