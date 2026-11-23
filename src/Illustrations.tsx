import React from 'react';
import {theme} from './theme';

type TransformProps = {x: number; y: number; scale?: number; opacity?: number; rotate?: number};

export const Car: React.FC<TransformProps & {color?: string; slow?: boolean; frame?: number; seed?: number}> =
  ({x, y, scale = 1, opacity = 1, rotate = -18, color = theme.data, slow = false, frame = 0, seed = 0}) => {
    const bob = Math.sin(frame * (slow ? 0.055 : 0.11) + seed) * (slow ? 2 : 5);
    return <g transform={`translate(${x} ${y + bob}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <rect x="-98" y="-50" width="196" height="98" rx="30" fill={color} stroke={theme.text} strokeWidth="5" />
      <path d="M-50 -49 L-25 -86 Q-18 -96 0 -96 L36 -96 Q50 -96 62 -80 L84 -48 Z" fill={theme.surfaceHi} stroke={theme.text} strokeWidth="5" strokeLinejoin="round" />
      <path d="M-16 -88 L-37 -52 M2 -89 L36 -89 Q45 -89 53 -77 L68 -52 L-5 -52 Z" fill={theme.data} opacity="0.8" />
      <rect x="-80" y="-8" width="34" height="12" rx="6" fill={theme.text} opacity="0.82" />
      <rect x="56" y="-8" width="30" height="12" rx="6" fill={theme.warn} />
      <circle cx="-60" cy="45" r="23" fill={theme.bg} stroke={theme.text} strokeWidth="5" />
      <circle cx="-60" cy="45" r="9" fill={theme.muted} />
      <circle cx="59" cy="45" r="23" fill={theme.bg} stroke={theme.text} strokeWidth="5" />
      <circle cx="59" cy="45" r="9" fill={theme.muted} />
    </g>;
  };

export const Phone: React.FC<TransformProps & {frame?: number; seed?: number; showPin?: boolean}> =
  ({x, y, scale = 1, opacity = 1, rotate = 0, frame = 0, seed = 0, showPin = true}) => {
    const bob = Math.sin(frame * 0.08 + seed) * 5;
    return <g transform={`translate(${x} ${y + bob}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <rect x="-58" y="-104" width="116" height="208" rx="26" fill={theme.surfaceHi} stroke={theme.text} strokeWidth="6" />
      <rect x="-45" y="-82" width="90" height="156" rx="12" fill={theme.bg} stroke={theme.border} strokeWidth="3" />
      <path d="M-31 23 C-10 6 5 -20 31 -47" fill="none" stroke={theme.flow} strokeWidth="7" strokeDasharray="12 10" />
      <circle cx="0" cy="89" r="6" fill={theme.muted} />
      {showPin && <g transform="translate(22 -34)">
        <path d="M0 36 C-7 21 -24 8 -24 -7 A24 24 0 1 1 24 -7 C24 8 7 21 0 36Z" fill={theme.data} stroke={theme.text} strokeWidth="4" />
        <circle cy="-8" r="7" fill={theme.surface} />
      </g>}
    </g>;
  };

export const Person: React.FC<TransformProps & {frame?: number}> = ({x, y, scale = 1, opacity = 1, frame = 0}) => {
  const bob = Math.sin(frame * 0.08) * 3;
  return <g transform={`translate(${x} ${y + bob}) scale(${scale})`} opacity={opacity} stroke={theme.text} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
    <rect x="-21" y="-72" width="18" height="70" rx="9" fill={theme.data} />
    <rect x="5" y="-72" width="18" height="70" rx="9" fill={theme.data} />
    <path d="M-39 -133 L-52 -76 M39 -133 L52 -78" stroke={theme.text} strokeWidth="17" fill="none" />
    <path d="M-39 -133 L-52 -76 M39 -133 L52 -78" stroke={theme.data} strokeWidth="10" fill="none" />
    <rect x="-37" y="-145" width="74" height="79" rx="24" fill={theme.flow} />
    <circle cy="-177" r="30" fill={theme.skin} />
    <path d="M-28 -181 Q-25 -209 0 -209 Q27 -209 29 -179 Q10 -192 -28 -181Z" fill={theme.surface} stroke="none" />
    <circle cx="-9" cy="-176" r="3" fill={theme.bg} stroke="none" />
    <circle cx="9" cy="-176" r="3" fill={theme.bg} stroke="none" />
    <rect x="48" y="-91" width="26" height="45" rx="5" fill={theme.surfaceHi} />
  </g>;
};

export const Calendar: React.FC<TransformProps> = ({x, y, scale = 1, opacity = 1}) =>
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} stroke={theme.text} strokeWidth="5" strokeLinejoin="round">
    <rect x="-92" y="-90" width="184" height="180" rx="23" fill={theme.surfaceHi} />
    <path d="M-92 -38 H92" stroke={theme.accent} strokeWidth="15" />
    <path d="M-48 -105 V-70 M48 -105 V-70" stroke={theme.text} strokeWidth="12" strokeLinecap="round" />
    <path d="M-47 -8 H47 M-47 29 H10" stroke={theme.data} strokeWidth="11" strokeLinecap="round" />
    <circle cx="42" cy="33" r="8" fill={theme.warn} stroke="none" />
  </g>;

export const AlertSign: React.FC<TransformProps> = ({x, y, scale = 1, opacity = 1}) =>
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <path d="M0 -100 L96 68 Q105 88 84 88 H-84 Q-105 88 -96 68Z" fill={theme.bad} stroke={theme.text} strokeWidth="6" strokeLinejoin="round" />
    <path d="M0 -42 V20" stroke={theme.text} strokeWidth="15" strokeLinecap="round" />
    <circle cy="48" r="8" fill={theme.text} />
  </g>;

export const DataNode: React.FC<TransformProps & {label?: string}> = ({x, y, scale = 1, opacity = 1, label}) =>
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <circle r="76" fill={theme.surface} stroke={theme.data} strokeWidth="6" />
    <circle r="53" fill={theme.surfaceHi} stroke={theme.flow} strokeWidth="4" strokeDasharray="12 9" />
    <circle r="16" fill={theme.accent} />
    <circle cx="-34" cy="-15" r="9" fill={theme.data} />
    <circle cx="34" cy="-15" r="9" fill={theme.data} />
    <circle cy="34" r="9" fill={theme.data} />
    {label && <text y="122" textAnchor="middle" fill={theme.text} fontSize="34" fontFamily="Hind Siliguri,sans-serif" fontWeight="700">{label}</text>}
  </g>;
