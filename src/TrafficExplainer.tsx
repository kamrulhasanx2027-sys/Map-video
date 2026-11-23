import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Captions} from './captions';
import {LAYOUT} from './layout';
import {Stage} from './Stage';
import {theme} from './theme';

export const TrafficExplainer: React.FC = () => <AbsoluteFill style={{
  width: LAYOUT.width,
  height: LAYOUT.height,
  overflow: 'hidden',
  backgroundColor: theme.bg,
  color: theme.text,
  fontFamily: 'Hind Siliguri, sans-serif',
}}>
  <Stage />
  <Captions />
  <Audio src={staticFile('voice.mp3')} volume={1} />
</AbsoluteFill>;
