import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {LAYOUT} from './layout';
import {getCaptionState} from './timing';
import {theme} from './theme';

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  const state = getCaptionState(time);
  if (!state) return null;
  const opacity = interpolate(time - state.chunk.start, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <div style={{
      position: 'absolute', top: LAYOUT.captionY, left: 60, right: 60,
      transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center',
      opacity, pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
        maxWidth: 960, gap: '4px 7px', padding: '16px 22px', borderRadius: 28,
        background: theme.surfaceHi, border: `2px solid ${theme.border}`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.34)', color: theme.text,
        fontFamily: 'Hind Siliguri, sans-serif', fontWeight: 700,
        fontSize: LAYOUT.captionFont, lineHeight: 1.12, textAlign: 'center',
      }}>
        {state.chunk.words.map((item, index) => {
          const active = index === state.active;
          const done = index < state.active;
          return <span key={`${item.start}-${item.word}`} style={{
            padding: '0 5px', borderRadius: 10,
            background: active ? theme.accent : 'transparent',
            color: active ? theme.onAccent : done ? theme.text : theme.muted,
            opacity: active || done ? 1 : 0.76,
          }}>{item.word}</span>;
        })}
      </div>
    </div>
  );
};
