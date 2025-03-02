import { CardType, GameCard } from "./types";

// Cards with prompts for the game - now with two different types
export const GameCards: GameCard[] = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTRO /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Stage0Cards: GameCard[] = [
  // Tutorial / Intro
  {
    id: 0,
    type: CardType.TYPEWRITER,
    prompt: "Welcome to the team.",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Er...",
    rightLabel: "Thanks!",
  },
  {
    id: 1,
    type: CardType.TYPEWRITER,
    prompt:
      "You've been hired to help us build a dataset for our client's revolutionary AI.",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Boring...",
    rightLabel: "What is it?",
  },
  {
    id: 2,
    type: CardType.TYPEWRITER,
    prompt: "This algorithm will be able to identify the FUNNNIEST cat memes.",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Why?",
    rightLabel: "Why?",
  },
  {
    id: 3,
    type: CardType.TYPEWRITER,
    prompt: "Our client said something about 'controlling the internet'...",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "...",
    rightLabel: "So...",
  },
  {
    id: 4,
    type: CardType.TYPEWRITER,
    prompt: "...but that's none of our business. We're just engineers!",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "...",
    rightLabel: "Of course!",
  },
  {
    id: 5,
    type: CardType.TYPEWRITER,
    prompt:
      "I'm sure you know all about dataset ethics, so I'll leave you to it!",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Ethics?",
    rightLabel: "Great!",
  },
  {
    id: 6,
    type: CardType.TYPEWRITER,
    prompt: "Good luck!",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "...",
    rightLabel: "...",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stage 1 /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Stage1Cards: GameCard[] = [
  // Data Aquisition
  {
    id: 7,
    type: CardType.TITLE,
    prompt:
      "<h2>Stage 1:</h2><br/><h1><span style='color: #5EF0C6'><b>Data Acquisition</b></span></h1><br/>",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Start",
    rightLabel: "Start",
  },
  {
    id: 3,
    type: CardType.TEXT_ONLY,
    prompt: "Stage 2 - Labeling",
    leftEffect: { privacy: +10, cultural: -10 },
    rightEffect: { privacy: -5, cultural: +15 },
    leftLabel: "Reject",
    rightLabel: "Accept",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stage 2 /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Stage2Cards: GameCard[] = [
  // Labeling
  {
    id: 7,
    type: CardType.TITLE,
    prompt:
      "<h2>Stage 2:</h2><br/><h1><span style='color: #00BBF9'><b>Labelling</b></span></h1><br/>",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Start",
    rightLabel: "Start",
  },
  {
    id: 3,
    type: CardType.TEXT_ONLY,
    prompt: "Stage 2 - Labeling",
    leftEffect: { privacy: +10, cultural: -10 },
    rightEffect: { privacy: -5, cultural: +15 },
    leftLabel: "Reject",
    rightLabel: "Accept",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stage 3 /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Stage3Cards: GameCard[] = [
  // Data Cleaning
  {
    id: 7,
    type: CardType.TITLE,
    prompt:
      "<h2>Stage 2:</h2><br/><h1><span style='color: #637A9F'><b>Data Cleaning</b></span></h1><br/>",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Start",
    rightLabel: "Start",
  },
  {
    id: 2,
    type: CardType.IMAGE_TEXT,
    prompt: "Is this image correctly labeled as 'cat'?",
    imageUrl: "/images/cat_sample.jpg", // You would replace with actual image paths
    imageLabel: "cat",
    leftEffect: { quantity: -10, cultural: -5 },
    rightEffect: { quantity: +10, cultural: +5 },
    leftLabel: "Incorrect",
    rightLabel: "Correct",
  },
  {
    id: 4,
    type: CardType.IMAGE_TEXT,
    prompt: "Does this image show a 'dog' as labeled?",
    imageUrl: "/images/dog_sample.jpg",
    imageLabel: "dog",
    leftEffect: { quantity: -10, cultural: -5 },
    rightEffect: { quantity: +10, cultural: +5 },
    leftLabel: "Incorrect",
    rightLabel: "Correct",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stage 4 /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Stage4Cards: GameCard[] = [
  // DataValidation
  {
    id: 7,
    type: CardType.TITLE,
    prompt:
      "<h2>Stage 2:</h2><br/><h1><span style='color: #FF2E63'><b>Data Validation</b></span></h1><br/>",
    leftEffect: {},
    rightEffect: {},
    leftLabel: "Start",
    rightLabel: "Start",
  },
  {
    id: 5,
    type: CardType.TEXT_ONLY,
    prompt: "Stage 4 - Data Validation",
    leftEffect: { privacy: +10, quantity: -5 },
    rightEffect: { privacy: -15, quantity: +20 },
    leftLabel: "Reject",
    rightLabel: "Accept",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stage 5 /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Stage5Cards: GameCard[] = [
  // Results & Conclusion
  {
    id: 5,
    type: CardType.TEXT_ONLY,
    prompt: "Stage 5 - Results & Conclusion",
    leftEffect: { privacy: +10, quantity: -5 },
    rightEffect: { privacy: -15, quantity: +20 },
    leftLabel: "Reject",
    rightLabel: "Accept",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exclamation Cards ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ExclamationCards: GameCard[] = [
  // ExclamationCards
  {
    id: 5,
    type: CardType.TEXT_ONLY,
    prompt: "Exclamation card!",
    leftEffect: { privacy: +10, quantity: -5 },
    rightEffect: { privacy: -15, quantity: +20 },
    leftLabel: "Reject",
    rightLabel: "Accept",
  },
];

export default GameCards;
