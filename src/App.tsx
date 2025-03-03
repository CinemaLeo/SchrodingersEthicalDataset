// App.tsx
import { JSX, useState } from "react";
import MainMenu from "./components/MainMenu";
import SwipeGame from "./components/SwipeGame";
import ResultsScreen from "./components/ResultsScreen";
import ParticlesBackground from "./components/ParticlesBackground";
import {
  Stage0Cards,
  Stage1Cards,
  Stage2Cards,
  Stage3Cards,
  Stage4Cards,
  Stage5Cards,
} from "./components/GameCards";
import { GameCard, Effect } from "./components/types";
import "./App.css";

// Define types for our game
export interface GameVariables {
  quantity: number;
  privacy: number;
  cultural: number;
  racial: number;
  class: number;
  gender: number;
  overall: number;
}

type GameStage =
  | "menu"
  | "stage0"
  | "stage1"
  | "stage2"
  | "stage3"
  | "stage4"
  | "stage5"
  | "results";

function App(): JSX.Element {
  // Game state
  const [gameStage, setGameStage] = useState<GameStage>("menu");
  const [currentStageCards, setCurrentStageCards] = useState<GameCard[]>([]);

  // Game variables that will be affected by swipes
  const [gameVariables, setGameVariables] = useState<GameVariables>({
    quantity: 50,
    privacy: 50,
    cultural: 50,
    racial: 50,
    class: 50,
    gender: 50,
    overall: 50,
  });

  // Update variables based on swipe
  const handleSwipeEffect = (effect: Effect): void => {
    setGameVariables((prevVars) => {
      const newVars = { ...prevVars };
      console.log("Effect:", effect);
      // Apply each effect
      Object.entries(effect).forEach(([key, value]) => {
        if (key in newVars) {
          newVars[key as keyof GameVariables] = Math.max(
            0,
            Math.min(100, newVars[key as keyof GameVariables] + value)
          );
        }
      });

      // Calculate overall bias as mean
      newVars.overall = Math.round(
        (newVars.cultural + newVars.racial + newVars.class + newVars.gender) / 4
      );

      console.log("New Vars:", newVars);
      return newVars;
    });
  };

  // Game navigation functions
  const startGame = (): void => {
    setGameStage("stage0");
    setCurrentStageCards(Stage0Cards);
  };
  const progressToNextStage = (): void => {
    switch (gameStage) {
      case "stage0":
        setGameStage("stage1");
        setCurrentStageCards(Stage1Cards);
        break;
      case "stage1":
        setGameStage("stage2");
        setCurrentStageCards(Stage2Cards);
        break;
      case "stage2":
        setGameStage("stage3");
        setCurrentStageCards(Stage3Cards);
        break;
      case "stage3":
        setGameStage("stage4");
        setCurrentStageCards(Stage4Cards);
        break;
      case "stage4":
        setGameStage("stage5");
        setCurrentStageCards(Stage5Cards);
        break;
      case "stage5":
        setGameStage("results");
        break;
    }
  };
  const restartGame = (): void => {
    setGameStage("menu");
    setGameVariables({
      quantity: 50,
      privacy: 50,
      cultural: 50,
      racial: 50,
      class: 50,
      gender: 50,
      overall: 50,
    });
  };

  return (
    <div className="app" style={{ position: "relative", zIndex: 1 }}>
      <ParticlesBackground />

      {gameStage === "menu" && <MainMenu onStart={startGame} />}

      {(gameStage === "stage0" ||
        gameStage === "stage1" ||
        gameStage === "stage2" ||
        gameStage === "stage3" ||
        gameStage === "stage4" ||
        gameStage === "stage5") && (
        <SwipeGame
          cards={currentStageCards}
          onSwipeLeft={handleSwipeEffect}
          onSwipeRight={handleSwipeEffect}
          onComplete={progressToNextStage}
        />
      )}

      {gameStage === "results" && (
        <ResultsScreen variables={gameVariables} onRestart={restartGame} />
      )}
    </div>
  );
}
export default App;
