// @ts-nocheck
import React, { JSX, useState, useEffect } from "react";
import { useSpring, animated, to } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { GameCard, Effect, CardType } from "./types";
import Typewriter from "./Typewriter";
import { useLanguage } from "../context/LanguageContext";

const base =
  process.env.NODE_ENV === "production" ? "/SchrodingersEthicalDataset/" : "/";

const preloadImage = (url: string) => {
  const img = new Image();
  img.src = base + url;
};

interface SwipeGameProps {
  cards: GameCard[];
  onSwipeLeft: (effect: Effect) => void;
  onSwipeRight: (effect: Effect) => void;
  onComplete: () => void;
  onQuit: () => void;
}

// Pick the right field based on language, falling back to English
const pick = (en: string, zh?: string, lang?: string): string =>
  lang === "zh_tw" && zh ? zh : en;

const CardContent = ({ card }: { card: GameCard }): JSX.Element => {
  const { language } = useLanguage();
  const prompt = pick(card.prompt, card.prompt_zh, language);
  const imageLabel = pick(card.imageLabel ?? "", card.imageLabel_zh, language);

  if (card.type === CardType.IMAGE_TEXT) {
    return (
      <div className="card-content">
        <h3>{prompt}</h3>
        <div className="card-image-container">
          <img
            src={base + card.imageUrl}
            alt={imageLabel}
            className="card-image"
          />
          <div className="image-label">
            Label: <strong>{imageLabel}</strong>
          </div>
        </div>
      </div>
    );
  } else if (card.type === CardType.TYPEWRITER) {
    return (
      <div className="speech-bubble-content">
        <Typewriter text={prompt} speed={33} />
      </div>
    );
  } else if (card.type === CardType.TITLE) {
    return (
      <div
        className="card-content"
        dangerouslySetInnerHTML={{ __html: prompt }}
      />
    );
  } else {
    return (
      <div className="card-content">
        <p>{prompt}</p>
      </div>
    );
  }
};

function SwipeGame({
  cards,
  onSwipeLeft,
  onSwipeRight,
  onComplete,
  onQuit,
}: SwipeGameProps): JSX.Element {
  const { t, language } = useLanguage();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  useEffect(() => {
    if (currentCardIndex >= cards.length) {
      setCurrentCardIndex(0);
      onComplete();
    }
  }, [currentCardIndex, cards.length, onComplete]);

  useEffect(() => {
    const nextCard = cards[currentCardIndex + 1];
    if (nextCard && nextCard.type === CardType.IMAGE_TEXT) {
      preloadImage(nextCard.imageUrl);
    }
  }, [currentCardIndex, cards]);

  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.0,
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    api.start({ scale: 1, config: { tension: 260, friction: 20 } });
  }, [currentCardIndex]);

  const handleSwipeEffect = (effect: Effect, defaultNextIndex: number) => {
    if (effect.skipToId !== undefined) {
      const skipIndex = cards.findIndex((card) => card.id === effect.skipToId);
      setCurrentCardIndex(skipIndex >= 0 ? skipIndex : defaultNextIndex);
    } else {
      setCurrentCardIndex(defaultNextIndex);
    }
  };

  const handleQuit = () => {
    if (window.confirm(t("game.quitConfirm"))) {
      onQuit();
    }
  };

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      const isGone = !down && (trigger || Math.abs(mx) > 100);

      api.start({
        x: down ? mx : isGone ? window.innerWidth * dir : 0,
        y: 0,
        rotate: down ? mx / 10 : isGone ? mx / 10 : 0,
        immediate: down,
        onRest: () => {
          if (isGone) {
            setShowInstructions(false);
            const effect =
              dir < 0
                ? cards[currentCardIndex].reject
                : cards[currentCardIndex].accept;
            dir < 0 ? onSwipeLeft(effect) : onSwipeRight(effect);
            handleSwipeEffect(effect, currentCardIndex + 1);
            api.start({ x: 0, y: 0, rotate: 0, scale: 0.0, immediate: true });
          }
        },
      });

      setIsDragging(down);
    },
  );

  const currentCard = cards[currentCardIndex];
  const cardsRemaining = cards.length - currentCardIndex;

  const leftOpacity = to(x, (value) =>
    value < 0
      ? Math.max(0.6, Math.min(1, Math.abs(value) / 50))
      : Math.max(0.2, 0.6 - value / 50),
  );

  const rightOpacity = to(x, (value) =>
    value > 0
      ? Math.max(0.6, Math.min(1, value / 50))
      : Math.max(0.2, 0.6 + value / 50),
  );

  if (!currentCard) {
    return <h1>{t("game.loading")}</h1>;
  }

  const leftLabel = pick(
    currentCard.leftLabel,
    currentCard.leftLabel_zh,
    language,
  );
  const rightLabel = pick(
    currentCard.rightLabel,
    currentCard.rightLabel_zh,
    language,
  );

  return (
    <div className="swipe-game" style={{ position: "fixed" }}>
      {/* Quit / back to menu button */}
      <button
        onClick={handleQuit}
        className="small-button"
        aria-label="Return to menu"
      >
        ✕
      </button>

      {currentCard.section !== 5 && (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${((cards.length - cardsRemaining) / cards.length) * 100}%`,
            }}
          />
        </div>
      )}

      <div className="cards-container">
        <animated.div
          className={
            currentCard.type === CardType.TYPEWRITER ? "card-bubble" : "card"
          }
          {...bind()}
          style={{
            transform: to(
              [x, y, rotate, scale],
              (x, y, r, s) =>
                `translate3d(${x}px,${y}px,0) rotate(${r}deg) scale(${s})`,
            ),
            touchAction: "none",
          }}
        >
          <CardContent card={currentCard} />
          <div
            className="swipe-indicators"
            style={{ opacity: isDragging ? 1 : 0.5 }}
          >
            <animated.div
              className="swipe-left"
              style={{ opacity: leftOpacity }}
            >
              {leftLabel}
            </animated.div>
            <animated.div
              className="swipe-right"
              style={{ opacity: rightOpacity }}
            >
              {rightLabel}
            </animated.div>
          </div>
        </animated.div>
      </div>

      {showInstructions && (
        <div className="swipe-instructions">{t("game.swipeHint")}</div>
      )}
    </div>
  );
}

export default SwipeGame;
