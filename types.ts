
export enum Mood {
  CALM = 'calm',
  HEAVY = 'heavy',
  LIGHT = 'light',
  TURBULENT = 'turbulent',
  QUIET = 'quiet',
}

export type Page = 'landing' | 'dashboard' | 'write' | 'vault' | 'ground' | 'echo' | 'letter';

export interface JournalEntry {
  id: string;
  date: number;
  content: string;
  mood: Mood;
  energyLevel: number;
}

export interface ReflectionInsight {
  summary: string;
  pattern: string;
  encouragement: string;
}

export interface AppState {
  entries: JournalEntry[];
  activePage: Page;
}
