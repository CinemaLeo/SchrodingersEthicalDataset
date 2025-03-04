import { JSX } from "react";
import { GameVariables } from "../App";

interface ResultsScreenProps {
  variables: GameVariables;
  onContinue: () => void;
}

const labelMappings: Record<string, string> = {
  quantity: "Data Quantity",
  privacy: "Data Privacy",
  cultural: "Cultural Bias",
  racial: "Racial Bias",
  class: "Class Bias",
  gender: "Gender Bias",
  overall: "Overall Bias",
};

function ResultsScreen({
  variables,
  onContinue,
}: ResultsScreenProps): JSX.Element {
  return (
    <div className="results-screen">
      <h1>Dataset Certification</h1>
      <h2>Schrödinger's Ethical Dataset</h2>
      <div className="stat-bars">
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="stat-item">
            <div className="stat-label">
              {labelMappings[key] || key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <div className="stat-bar-container">
              <div
                className="stat-bar"
                style={{
                  width: `${value}%`,
                  backgroundColor: getBarColor(key, value),
                }}
              ></div>
              {/* <div className="stat-value">{value}%</div> */}
            </div>
          </div>
        ))}
      </div>

      <div className="results-evaluation" style={{ textAlign: "center" }}>
        <h3>Your Dataset is...</h3>
        <h1 style={{ color: "#000000" }}>{generateSummary(variables)}</h1>
      </div>

      <button onClick={onContinue} className="restart-button">
        Continue
      </button>
    </div>
  );
}

// Helper functions for the results screen
function getBarColor(stat: string, value: number): string {
  // Different color schemes for different stats
  const colorSchemes: Record<string, string[]> = {
    quantity: ["#ff4d4d", "#ffcc00", "#66cc33"], // Red to Green
    privacy: ["#ff4d4d", "#ffcc00", "#66cc33"], // Red to Green
    cultural: ["#66cc33", "#ffcc00", "#ff4d4d"], // Green to Red (reversed)
    racial: ["#66cc33", "#ffcc00", "#ff4d4d"], // Green to Red (reversed)
    class: ["#66cc33", "#ffcc00", "#ff4d4d"], // Green to Red (reversed)
    gender: ["#66cc33", "#ffcc00", "#ff4d4d"], // Green to Red (reversed)
    overall: ["#66cc33", "#ffcc00", "#ff4d4d"], // Green to Red (reversed)
  };

  const scheme = colorSchemes[stat] || ["#ff4d4d", "#ffcc00", "#66cc33"];

  if (value < 33) return scheme[0];
  if (value < 66) return scheme[1];
  return scheme[2];
}

// function generateEvaluation(variables: GameVariables): string {
//   // Generate a text evaluation based on the variable values
//   const highestStat = Object.entries(variables).reduce(
//     (max, [key, value]) => (value > max.value ? { key, value } : max),
//     { key: "", value: 0 }
//   );
//
//   const lowestStat = Object.entries(variables).reduce(
//     (min, [key, value]) => (value < min.value ? { key, value } : min),
//     { key: "", value: 100 }
//   );
//
//   return `You prioritized ${
//     labelMappings[highestStat.key] ||
//     highestStat.key.charAt(0).toUpperCase() + highestStat.key.slice(1)
//   } but it came at the cost of ${
//     labelMappings[lowestStat.key] ||
//     lowestStat.key.charAt(0).toUpperCase() + lowestStat.key.slice(1)
//   }.`;
// }

function generateSummary(variables: GameVariables): string {
  const intensityWords = {
    extreme: [
      "outrageously",
      "incredibly",
      "dangerously",
      "literally",
      "absolutely",
    ],
    high: ["notably", "seriously", "significantly", "surprisingly"],
    moderate: ["somewhat", "moderately", "relatively", "fairly"],
  };

  const categoryDescriptors: Record<
    keyof GameVariables,
    { high: string; low: string }
  > = {
    quantity: { high: "comprehensive", low: "incomplete" },
    privacy: { high: "secure", low: "illegal" },
    cultural: { high: "culturally-specific", low: "inclusive" },
    racial: { high: "racist", low: "equitable" },
    class: { high: "classist", low: "balanced" },
    gender: { high: "sexist", low: "fair" },
    overall: { high: "biased", low: "unbiased" },
  };

  // Find the most extreme value
  const values = Object.entries(variables).map(([key, value]) => ({
    key: key as keyof GameVariables,
    value,
    deviation: Math.abs(50 - value), // How far from neutral (50%)
  }));

  // Find all values that share the maximum deviation
  const maxDeviation = Math.max(...values.map((v) => v.deviation));
  const extremeValues = values.filter((v) => v.deviation === maxDeviation);

  // Randomly select one of the extreme values
  const mostExtreme =
    extremeValues[Math.floor(Math.random() * extremeValues.length)];

  // Select intensity based on deviation
  let intensityBank =
    mostExtreme.deviation > 35
      ? intensityWords.extreme
      : mostExtreme.deviation > 25
      ? intensityWords.high
      : intensityWords.moderate;

  const intensity =
    intensityBank[Math.floor(Math.random() * intensityBank.length)];
  const descriptor =
    mostExtreme.value > 50
      ? categoryDescriptors[mostExtreme.key].high
      : categoryDescriptors[mostExtreme.key].low;

  return `${intensity} ${descriptor}`;
}
export default ResultsScreen;
