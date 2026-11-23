import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {LAYOUT} from './layout';
import {AlertSign, Calendar, Car, DataNode, Person, Phone} from './Illustrations';
import {sceneAt, scenes, type SceneBeat} from './scenes';
import {theme} from './theme';

const ROAD = 'M 30 1120 C 255 1080 465 930 625 825 S 860 675 1050 605';
const CURVE = 'M 160 780 C 330 710 630 730 930 520';

const City: React.FC<{frame: number}> = ({frame}) => {
  const buildings = [
    {x: 42, w: 132, h: 210}, {x: 205, w: 175, h: 290}, {x: 402, w: 145, h: 205},
    {x: 576, w: 180, h: 255}, {x: 789, w: 122, h: 195}, {x: 938, w: 128, h: 270},
  ];
  return <g opacity="0.76">
    {buildings.map((b, i) => <g key={b.x} transform={`translate(${b.x} ${900 - b.h})`}>
      <rect width={b.w} height={b.h} rx="9" fill={theme.surface} stroke={theme.border} strokeWidth="3" />
      {Array.from({length: 3}, (_, row) => Array.from({length: Math.max(2, Math.floor(b.w / 48))}, (_, col) =>
        <rect key={`${row}-${col}`} x={18 + col * 42} y={24 + row * 46} width="18" height="22" rx="4"
          fill={(i + row + col) % 8 === 0 ? theme.warn : theme.surfaceHi} opacity={(i + row + col) % 8 === 0 ? 0.8 : 1} />))}
      <rect x="0" y={b.h - 15} width={b.w} height="15" fill={theme.surfaceHi} />
    </g>)}
    <line x1="36" y1="900" x2="1045" y2="900" stroke={theme.border} strokeWidth="4" />
    <line x1="55" y1="902" x2="1030" y2="902" stroke={theme.muted} strokeWidth="2" opacity="0.2" />
    <circle cx={170 + (frame % 180) * 4} cy="496" r="4" fill={theme.data} opacity="0.65" />
  </g>;
};

const Road: React.FC<{color?: string; dashed?: boolean}> = ({color = theme.surfaceHi, dashed = false}) =>
  <g>
    <path d={ROAD} fill="none" stroke={theme.muted} strokeWidth="194" strokeLinecap="round" opacity="0.42" />
    <path d={ROAD} fill="none" stroke={color} strokeWidth="176" strokeLinecap="round" />
    <path d={ROAD} fill="none" stroke={theme.text} strokeWidth="5" strokeDasharray={dashed ? '10 32' : '36 32'} strokeLinecap="round" opacity="0.72" />
    <path d="M30 1224 C255 1184 465 1034 625 929 S860 779 1050 709" fill="none" stroke={theme.border} strokeWidth="4" />
    <line x1="48" y1="1264" x2="1032" y2="1264" stroke={theme.border} strokeWidth="4" />
  </g>;

const FlowDots: React.FC<{frame: number; count?: number; path?: string; color?: string; slow?: boolean}> =
  ({frame, count = 11, path = CURVE, color = theme.data, slow = false}) => {
    const duration = slow ? 170 : 90;
    return <g>
      <path d={path} fill="none" stroke={theme.flow} strokeWidth="5" strokeDasharray="15 18" opacity="0.6" />
      {Array.from({length: count}, (_, i) => {
        const progress = ((frame / duration + i / count) % 1 + 1) % 1;
        const x = 160 + progress * 770;
        const y = 780 - progress * 260 + Math.sin(progress * Math.PI * 2) * 46;
        return <g key={i} opacity={0.6 + 0.4 * Math.sin(progress * Math.PI)}>
          <circle cx={x} cy={y} r="17" fill={color} opacity="0.2" />
          <circle cx={x} cy={y} r="8" fill={color} />
        </g>;
      })}
    </g>;
  };

const Label: React.FC<{x: number; y: number; children: React.ReactNode; size?: number; color?: string}> =
  ({x, y, children, size = 34, color = theme.text}) =>
    <text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} fontFamily="Hind Siliguri,sans-serif" fontWeight="700">{children}</text>;

const Meter: React.FC<{x: number; y: number; value: string; unit: string; caption: string; color: string}> =
  ({x, y, value, unit, caption, color}) => <g transform={`translate(${x} ${y})`}>
    <rect x="-166" y="-118" width="332" height="235" rx="28" fill={theme.surface} stroke={color} strokeWidth="5" />
    <text x="-10" y="22" textAnchor="middle" fill={color} fontSize="108" fontFamily="Manrope, sans-serif" fontWeight="800">{value}</text>
    <text x="100" y="18" textAnchor="middle" fill={theme.muted} fontSize="32" fontFamily="Manrope, sans-serif" fontWeight="700">{unit}</text>
    <Label x={0} y={81} size={32}>{caption}</Label>
  </g>;

const Barrier: React.FC<{x: number; y: number}> = ({x, y}) => <g transform={`translate(${x} ${y})`}>
  <rect x="-142" y="-30" width="284" height="62" rx="15" fill={theme.surfaceHi} stroke={theme.bad} strokeWidth="7" transform="rotate(-10)" />
  <path d="M-96 -30 L-70 26 M-18 -38 L8 18 M60 -45 L86 11" stroke={theme.bad} strokeWidth="17" transform="rotate(-10)" />
  <rect x="-119" y="32" width="24" height="83" rx="7" fill={theme.muted} />
  <rect x="95" y="-7" width="24" height="83" rx="7" fill={theme.muted} />
</g>;

const TrafficState: React.FC<{frame: number}> = ({frame}) => (
  <g>
    {[['green', theme.good, 'সবুজ'], ['orange', theme.warn, 'কমলা'], ['red', theme.bad, 'লাল']].map(([id, color, name], i) => {
      const y = 640 + i * 180;
      return <g key={id}>
        <path d={`M 135 ${y + 20} C 360 ${y - 30} 650 ${y + 30} 910 ${y - 90}`} fill="none" stroke={color} strokeWidth="52" strokeLinecap="round" opacity="0.84" />
        <path d={`M 135 ${y + 20} C 360 ${y - 30} 650 ${y + 30} 910 ${y - 90}`} fill="none" stroke={theme.text} strokeWidth="3" strokeDasharray="18 23" opacity="0.75" />
        <Label x={830} y={y + 82} color={color as string} size={38}>{name as string}</Label>
        <circle cx={235 + ((frame * (i === 2 ? 0.3 : 0.85) + i * 210) % 590)} cy={y + 20 - ((frame * (i === 2 ? 0.3 : 0.85) + i * 210) % 590) * 0.32} r="10" fill={theme.text} />
      </g>;
    })}
  </g>
);

const Cluster: React.FC<{frame: number}> = ({frame}) => <g>
  <Phone x={230} y={710} scale={0.78} frame={frame} seed={2} />
  <Phone x={530} y={580} scale={0.82} frame={frame} seed={4} />
  <Phone x={830} y={710} scale={0.78} frame={frame} seed={6} />
  <path d="M260 660 Q410 440 520 500 M550 490 Q710 420 810 650" fill="none" stroke={theme.flow} strokeWidth="5" strokeDasharray="14 14" />
  <FlowDots frame={frame} count={9} />
</g>;

const SceneContent: React.FC<{scene: SceneBeat; frame: number}> = ({scene, frame}) => {
  const slow = scene.kind === 'jam-inference' || scene.kind === 'incident' || scene.kind === 'route-question';
  const carOpacity = scene.kind === 'phones' || scene.kind === 'gps-flow' ? 0.45 : 1;
  return <g>
    {scene.label && <g>
      <rect x="75" y="305" width="930" height="84" rx="24" fill={theme.surface} stroke={theme.border} strokeWidth="2" />
      <Label x={540} y={363} size={37} color={theme.accent}>{scene.label}</Label>
    </g>}
    <City frame={frame} />
    <Road />
    {[0, 1, 2, 3, 4].map((i) => <Car key={i}
      x={[135, 340, 535, 730, 925][i]}
      y={[1100, 1026, 924, 823, 725][i]}
      scale={0.65 + (i % 2) * 0.06}
      rotate={-18}
      color={scene.kind === 'question' && i === 3 ? theme.good : scene.kind === 'jam-inference' ? theme.bad : theme.data}
      opacity={carOpacity}
      slow={slow}
      frame={frame}
      seed={i * 1.4}
    />)}

    {scene.kind === 'question' && <g>
      <path d="M105 1152 C320 1110 465 962 625 855 S850 700 1010 648" fill="none" stroke={theme.bad} strokeWidth="24" strokeDasharray="5 14" opacity="0.85" />
      <Label x={220} y={620} color={theme.bad} size={39}>জ্যাম</Label>
      <Label x={870} y={455} color={theme.good} size={39}>ফাঁকা</Label>
    </g>}

    {scene.kind === 'no-counter' && <g>
      <Person x={170} y={1160} scale={0.9} frame={frame} />
      <rect x="240" y="955" width="90" height="94" rx="12" fill={theme.surfaceHi} stroke={theme.text} strokeWidth="4" transform="rotate(-12 240 955)" />
      <path d="M240 965 L330 1040 M330 965 L240 1040" stroke={theme.bad} strokeWidth="12" strokeLinecap="round" />
      <Phone x={813} y={580} scale={0.9} frame={frame} />
      <FlowDots frame={frame} count={7} />
    </g>}

    {(scene.kind === 'phones' || scene.kind === 'gps-flow' || scene.kind === 'many-cars') && <Cluster frame={frame} />}
    {scene.kind === 'many-cars' && <g>
      <Label x={540} y={465} color={theme.data} size={43}>অবস্থান + গতি</Label>
      <FlowDots frame={frame} count={14} slow />
    </g>}

    {scene.kind === 'speed-comparison' && <g>
      <Meter x={315} y={565} value="৬০" unit="km/h" caption="সাধারণত" color={theme.good} />
      <Meter x={765} y={565} value="৫" unit="km/h" caption="হঠাৎ কমে" color={theme.bad} />
      <path d="M540 470 V660" stroke={theme.border} strokeWidth="4" strokeDasharray="12 14" />
      <Car x={180 + ((frame * 4) % 150)} y={1060} scale={0.5} color={theme.good} frame={frame} />
      <Car x={765 + ((frame * 1.1) % 70)} y={810} scale={0.54} color={theme.bad} slow frame={frame} />
    </g>}

    {scene.kind === 'jam-inference' && <g>
      <path d="M300 910 Q485 705 694 690" fill="none" stroke={theme.flow} strokeWidth="7" strokeDasharray="18 16" />
      <FlowDots frame={frame} count={13} slow color={theme.bad} />
      <DataNode x={830} y={540} scale={1.2} label="algorithm" />
      <circle cx="512" cy="884" r="88" fill={theme.bad} opacity="0.15" />
      <circle cx="512" cy="884" r="42" fill="none" stroke={theme.bad} strokeWidth="9" />
      <path d="M512 855 V891 M512 913 V916" stroke={theme.bad} strokeWidth="11" strokeLinecap="round" />
    </g>}

    {scene.kind === 'traffic-colors' && <TrafficState frame={frame} />}

    {(scene.kind === 'gps-not-only' || scene.kind === 'history' || scene.kind === 'current-road') && <g>
      <Phone x={215} y={620} scale={0.75} frame={frame} />
      <Calendar x={530} y={600} scale={0.82} />
      <DataNode x={855} y={610} scale={0.84} label="traffic" />
      <path d="M290 620 H410 M650 620 H770" stroke={theme.flow} strokeWidth="6" strokeDasharray="13 13" />
      {scene.kind === 'history' && <Label x={530} y={800} color={theme.accent} size={36}>ঐতিহাসিক traffic data</Label>}
      {scene.kind === 'current-road' && <g>
        <Car x={450} y={1035} scale={0.7} frame={frame} />
        <Car x={720} y={882} scale={0.63} frame={frame} seed={3} />
      </g>}
    </g>}

    {scene.kind === 'incident' && <g>
      <AlertSign x={250} y={650} scale={0.95} />
      <Label x={250} y={790} color={theme.bad} size={34}>দুর্ঘটনা</Label>
      <Barrier x={750} y={770} />
      <Label x={750} y={900} color={theme.warn} size={34}>রাস্তা বন্ধ</Label>
      <path d="M105 1120 C280 1074 360 1004 455 950" fill="none" stroke={theme.bad} strokeWidth="20" strokeDasharray="7 16" />
      <path d="M475 935 Q540 875 600 854" fill="none" stroke={theme.warn} strokeWidth="9" strokeDasharray="15 12" />
      <Car x={387} y={975} scale={0.58} color={theme.bad} slow frame={frame} />
    </g>}

    {scene.kind === 'combined' && <g>
      <Phone x={190} y={620} scale={0.62} frame={frame} />
      <Calendar x={490} y={600} scale={0.63} />
      <AlertSign x={780} y={635} scale={0.66} />
      <path d="M260 700 Q460 830 525 923 M505 686 Q535 830 545 900 M785 715 Q670 830 590 920" fill="none" stroke={theme.flow} strokeWidth="7" strokeDasharray="16 14" />
      <FlowDots frame={frame} count={14} path="M260 700 Q430 770 548 930" />
      <DataNode x={550} y={1010} scale={1.15} label="traffic" />
      <path d="M615 1010 Q770 1015 900 910" fill="none" stroke={theme.good} strokeWidth="18" strokeLinecap="round" />
    </g>}

    {scene.kind === 'self-signal' && <g>
      <Person x={263} y={1170} scale={1.28} frame={frame} />
      <Phone x={442} y={680} scale={0.92} frame={frame} />
      <path d="M440 810 Q520 900 610 938" fill="none" stroke={theme.data} strokeWidth="8" strokeDasharray="17 15" />
      <FlowDots frame={frame} count={8} path="M440 810 Q520 900 610 938" />
      <DataNode x={835} y={650} scale={1} label="traffic" />
      <path d="M610 954 Q760 960 938 855" fill="none" stroke={theme.good} strokeWidth="22" strokeLinecap="round" />
    </g>}

    {scene.kind === 'route-question' && <g>
      <path d="M100 1120 C300 1070 420 970 555 875 S820 690 975 650" fill="none" stroke={theme.bad} strokeWidth="55" strokeLinecap="round" opacity="0.85" />
      <path d="M100 1120 C310 1160 490 1130 630 1000 S850 780 975 650" fill="none" stroke={theme.good} strokeWidth="35" strokeLinecap="round" />
      <path d="M100 1120 C300 1070 420 970 555 875 S820 690 975 650" fill="none" stroke={theme.text} strokeWidth="4" strokeDasharray="17 20" />
      <path d="M100 1120 C310 1160 490 1130 630 1000 S850 780 975 650" fill="none" stroke={theme.text} strokeWidth="3" strokeDasharray="17 20" />
      <Car x={410} y={970} scale={0.55} color={theme.bad} slow frame={frame} />
      <Car x={666} y={1002} scale={0.53} color={theme.good} frame={frame} />
      <Label x={268} y={670} color={theme.bad} size={38}>জ্যাম</Label>
      <Label x={835} y={1040} color={theme.good} size={38}>দ্রুত</Label>
      <Label x={540} y={470} size={37} color={theme.accent}>Google Maps</Label>
    </g>}
  </g>;
};

export const Stage: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / LAYOUT.fps;
  const {scene, index} = sceneAt(time);
  const localFrame = Math.max(0, Math.round((time - scene.start) * LAYOUT.fps));
  const enter = interpolate(time - scene.start, [0, 0.34], [0, 1], {extrapolateRight: 'clamp'});
  const previous = scenes[Math.max(0, index - 1)];
  const previousActive = time < scene.start + 0.34 && index > 0;

  return <svg viewBox={`0 0 ${LAYOUT.width} ${LAYOUT.height}`} width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
    <defs>
      <pattern id="dots" width="46" height="46" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.6" fill={theme.text} opacity="0.12" />
      </pattern>
      <linearGradient id="stageFade" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={theme.bg} stopOpacity="0" />
        <stop offset="0.18" stopColor={theme.bg} stopOpacity="0.07" />
        <stop offset="1" stopColor={theme.bg} stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#dots)" />
    <rect x="0" y="250" width="1080" height="1080" fill="url(#stageFade)" />
    {previousActive && <g opacity={1 - enter}><SceneContent scene={previous} frame={localFrame + 14} /></g>}
    <g opacity={enter || time >= scene.start + 0.34 ? 1 : 0}>
      <SceneContent scene={scene} frame={localFrame} />
    </g>
    <line x1="56" y1="1288" x2="1024" y2="1288" stroke={theme.border} strokeWidth="3" opacity="0.55" />
  </svg>;
};
