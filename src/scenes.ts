export type SceneKind =
  | 'question' | 'no-counter' | 'phones' | 'gps-flow' | 'many-cars'
  | 'speed-comparison' | 'jam-inference' | 'traffic-colors' | 'gps-not-only'
  | 'history' | 'current-road' | 'incident' | 'combined' | 'self-signal'
  | 'route-question';

export type SceneBeat = {start: number; end: number; kind: SceneKind; label: string};

export const scenes: SceneBeat[] = [
  {start: 0, end: 8.64, kind: 'question', label: ''},
  {start: 8.64, end: 19.3, kind: 'no-counter', label: 'মানুষ traffic গোনে না'},
  {start: 19.3, end: 26.5, kind: 'phones', label: 'কোটি কোটি smartphone'},
  {start: 26.5, end: 34.5, kind: 'gps-flow', label: 'GPS · location · গতি'},
  {start: 34.5, end: 43.8, kind: 'many-cars', label: 'অবস্থান + গতি'},
  {start: 43.8, end: 54.78, kind: 'speed-comparison', label: 'সাধারণ গতি বনাম এখন'},
  {start: 54.78, end: 63.8, kind: 'jam-inference', label: 'algorithm'},
  {start: 63.8, end: 72.8, kind: 'traffic-colors', label: 'traffic পরিস্থিতি'},
  {start: 72.8, end: 81.5, kind: 'gps-not-only', label: 'শুধু GPS নয়'},
  {start: 81.5, end: 90.5, kind: 'history', label: 'ঐতিহাসিক traffic data'},
  {start: 90.5, end: 99.5, kind: 'current-road', label: 'বর্তমান পরিস্থিতি'},
  {start: 99.5, end: 108.8, kind: 'incident', label: 'দুর্ঘটনা · রাস্তা বন্ধ'},
  {start: 108.8, end: 112.98, kind: 'combined', label: 'তথ্য একসঙ্গে বিশ্লেষণ'},
  {start: 112.98, end: 116, kind: 'self-signal', label: 'তোমার ফোনও সাহায্য করে'},
  {start: 116, end: 121.764, kind: 'route-question', label: ''},
];

export const sceneAt = (time: number): {scene: SceneBeat; index: number} => {
  const index = scenes.findIndex((scene) => time >= scene.start && time < scene.end);
  const safeIndex = index < 0 ? scenes.length - 1 : index;
  return {scene: scenes[safeIndex], index: safeIndex};
};
