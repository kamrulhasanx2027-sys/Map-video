import React from 'react';
import {Composition} from 'remotion';
import {DURATION_IN_FRAMES, LAYOUT} from './layout';
import {TrafficExplainer} from './TrafficExplainer';

import '@fontsource/hind-siliguri/600.css';
import '@fontsource/hind-siliguri/700.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';

export const Root: React.FC = () => <>
  <Composition
    id="TrafficExplainer"
    component={TrafficExplainer}
    width={LAYOUT.width}
    height={LAYOUT.height}
    fps={LAYOUT.fps}
    durationInFrames={DURATION_IN_FRAMES}
  />
</>;
