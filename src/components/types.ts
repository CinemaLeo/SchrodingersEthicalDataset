export enum CardType {
  TEXT_ONLY = "TEXT_ONLY",
  TYPEWRITER = "TYPEWRITER",
  IMAGE_TEXT = "IMAGE_TEXT",
  TITLE = "TITLE",
}

export interface Effect {
  quantity?: number;
  privacy?: number;
  cultural?: number;
  racial?: number;
  class?: number;
  gender?: number;
  overall?: number;
  skipToId?: number;
}

export interface GameCard {
  section: number;
  id: number;
  type: CardType;
  // English content
  prompt: string;
  imageUrl?: string;
  imageLabel?: string;
  leftLabel: string;
  rightLabel: string;
  // Traditional Chinese content (optional — falls back to English if missing)
  prompt_zh?: string;
  imageLabel_zh?: string;
  leftLabel_zh?: string;
  rightLabel_zh?: string;
  // Effects
  reject: Effect;
  accept: Effect;
}
