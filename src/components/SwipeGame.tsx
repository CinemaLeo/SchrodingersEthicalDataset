// @ts-nocheck to avoid fucking bullshit animated.div errors
import React, { JSX, useState, useEffect } from "react";
import { useSpring, animated, to } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { GameCard, Effect, CardType } from "./types";
import Typewriter from "./Typewriter";

interface SwipeGameProps {
  cards: GameCard[];
  onSwipeLeft: (effect: Effect) => void;
  onSwipeRight: (effect: Effect) => void;
  onComplete: () => void;
}

// Component to render the appropriate card content based on card type
const CardContent = ({ card }: { card: GameCard }): JSX.Element => {
  if (card.type === CardType.IMAGE_TEXT) {
    return (
      <div className="card-content">
        <h3>{card.prompt}</h3>
        <div className="card-image-container">
          <img
            src={card.imageUrl}
            alt={card.imageLabel}
            className="card-image"
          />
          <div className="image-label">
            Label: <strong>{card.imageLabel}</strong>
          </div>
        </div>
      </div>
    );
  } else if (card.type === CardType.TYPEWRITER) {
    console.log("Typewriter Card Prompt:", card.prompt);
    return (
      <div className="card-content">
        <Typewriter text={card.prompt} speed={50} />
      </div>
    );
  } else if (card.type === CardType.TITLE) {
    return (
      <div
        className="card-content"
        dangerouslySetInnerHTML={{ __html: card.prompt }}
      />
    );
  } else {
    return (
      <div className="card-content">
        <p>{card.prompt}</p>
      </div>
    );
  }
};

function SwipeGame({
  cards,
  onSwipeLeft,
  onSwipeRight,
  onComplete,
}: SwipeGameProps): JSX.Element {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    if (currentCardIndex >= cards.length) {
      setCurrentCardIndex(0); // Reset for next section
      onComplete();
    }
  }, [currentCardIndex, cards.length, onComplete]);

  // Updated spring animation to include scale
  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.0,
    config: { tension: 200, friction: 20 },
  }));

  // Trigger entrance animation on card change
  useEffect(() => {
    api.start({
      scale: 1,
      config: {
        tension: 260,
        friction: 20,
      },
    });
  }, [currentCardIndex]);

  const handleSwipeEffect = (effect: Effect, defaultNextIndex: number) => {
    if (effect.skipToId !== undefined) {
      const skipIndex = cards.findIndex((card) => card.id === effect.skipToId);
      setCurrentCardIndex(skipIndex >= 0 ? skipIndex : defaultNextIndex);
    } else {
      setCurrentCardIndex(defaultNextIndex);
    }
  };

  // Set up drag gesture
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2; // Minimum velocity to trigger swipe
      const dir = xDir < 0 ? -1 : 1; // Direction of the swipe

      // If swiping and above velocity threshold, or if released above a distance threshold
      const isGone = !down && (trigger || Math.abs(mx) > 100);

      // Spring animation
      api.start({
        x: down ? mx : isGone ? window.innerWidth * dir : 0,
        y: down ? 0 : 0,
        rotate: down ? mx / 10 : isGone ? mx / 10 : 0,
        immediate: down,
        onRest: () => {
          if (isGone) {
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
    }
  );

  // Current card
  const currentCard = cards[currentCardIndex];

  // Cards remaining counter
  const cardsRemaining = cards.length - currentCardIndex;

  // Create derived values for opacity using to()
  const leftOpacity = to(x, (value) =>
    value < 0
      ? Math.max(0.6, Math.min(1, Math.abs(value) / 50))
      : Math.max(0.2, 0.6 - value / 50)
  );

  const rightOpacity = to(x, (value) =>
    value > 0
      ? Math.max(0.6, Math.min(1, value / 50))
      : Math.max(0.2, 0.6 + value / 50)
  );

  if (!currentCard) {
    console.log("No current card");
    return <h1>Loading...</h1>;
  }

  return (
    <div className="swipe-game">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${((cards.length - cardsRemaining) / cards.length) * 100}%`,
          }}
        />
      </div>
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
                `translate3d(${x}px,${y}px,0) rotate(${r}deg) scale(${s})`
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
              {currentCard.leftLabel}
            </animated.div>
            <animated.div
              className="swipe-right"
              style={{ opacity: rightOpacity }}
            >
              {currentCard.rightLabel}
            </animated.div>
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default SwipeGame;
