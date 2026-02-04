
import { Mood } from './types';

export const MOOD_CONFIG: Record<Mood, { color: string; label: string; icon: string }> = {
  [Mood.CALM]: { color: 'bg-emerald-400/20', label: 'Calm', icon: '🌊' },
  [Mood.HEAVY]: { color: 'bg-slate-600/40', label: 'Heavy', icon: '⛰️' },
  [Mood.LIGHT]: { color: 'bg-amber-200/20', label: 'Light', icon: '☀️' },
  [Mood.TURBULENT]: { color: 'bg-rose-500/20', label: 'Turbulent', icon: '🌪️' },
  [Mood.QUIET]: { color: 'bg-indigo-400/20', label: 'Quiet', icon: '🌙' },
};

export const STORAGE_KEY = 'steady_heart_diary_data';
