// Define card types
export enum CardType {
  TEXT_ONLY = "text_only",
  IMAGE_TEXT = "image_text",
  TYPEWRITER = "typewriter",
  TITLE = "title",
}

export interface BaseGameCard {
  section: number;
  id: number;
  type: CardType;
  prompt: string;
  reject: Effect;
  accept: Effect;
  leftLabel: string;
  rightLabel: string;
}

export interface TitleCard extends BaseGameCard {
    type: CardType.TITLE;
  }

export interface TextOnlyCard extends BaseGameCard {
  type: CardType.TEXT_ONLY;
}

export interface TypewriterCard extends BaseGameCard {
    type: CardType.TYPEWRITER;
  }

export interface ImageTextCard extends BaseGameCard {
  type: CardType.IMAGE_TEXT;
  imageUrl: string;
  imageLabel: string;
}

export type GameCard = TitleCard | TextOnlyCard | TypewriterCard | ImageTextCard;

export interface Effect {
  quantity?: number;
  privacy?: number;
  cultural?: number;
  racial?: number;
  class?: number;
  gender?: number;
  skipToId?: number;
}
  