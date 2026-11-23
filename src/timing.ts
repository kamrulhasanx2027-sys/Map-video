import cueData from './cues.json';

export type Cue = {start: number; end: number; text: string};
export type WordTiming = {word: string; start: number; end: number};
export type CaptionChunk = {words: WordTiming[]; start: number; end: number};

export const cues: Cue[] = cueData as Cue[];
const segmenter = new Intl.Segmenter('bn', {granularity: 'grapheme'});
const graphemeLength = (text: string) => [...segmenter.segment(text)].length;

export const distributeWords = (input: Cue[]): WordTiming[] => {
  const words: WordTiming[] = [];
  for (const cue of input) {
    const parts = cue.text.trim().split(/\s+/).filter(Boolean);
    const total = parts.reduce((n, word) => n + graphemeLength(word), 0) || 1;
    let cursor = cue.start;
    for (const word of parts) {
      const duration = (cue.end - cue.start) * graphemeLength(word) / total;
      words.push({word, start: cursor, end: cursor + duration});
      cursor += duration;
    }
  }
  return words;
};

export const chunkWords = (words: WordTiming[]): CaptionChunk[] => {
  const chunks: CaptionChunk[] = [];
  let current: WordTiming[] = [];
  const flush = () => {
    if (!current.length) return;
    chunks.push({words: current, start: current[0].start, end: current[current.length - 1].end});
    current = [];
  };
  for (const word of words) {
    const joined = [...current, word].map((item) => item.word).join(' ');
    const gap = current.length ? word.start - current[current.length - 1].end : 0;
    if (current.length && (current.length >= 3 || graphemeLength(joined) > 24 || gap > 0.45)) flush();
    current.push(word);
    if (/[।,?!;:—]$/.test(word.word)) flush();
  }
  flush();
  return chunks;
};

export const chunks = chunkWords(distributeWords(cues));

export const getCaptionState = (time: number) => {
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const next = chunks[i + 1];
    const until = next ? Math.min(next.start, chunk.end + 0.28) : chunk.end + 0.28;
    if (time < chunk.start - 0.02 || time >= until) continue;
    let active = -1;
    chunk.words.forEach((word, index) => {
      if (time >= word.start) active = index;
    });
    return {chunk, active};
  }
  return null;
};

export const LAST_CUE_END = cues[cues.length - 1]?.end ?? 0;
