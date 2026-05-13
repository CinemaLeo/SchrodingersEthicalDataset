import { JSX } from "react";
import { GameVariables } from "../App";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../locales/translations";

interface ResultsScreenProps {
  variables: GameVariables;
  onContinue: () => void;
}

function ResultsScreen({ variables, onContinue }: ResultsScreenProps): JSX.Element {
  const { t, language } = useLanguage();

  return (
    <div className="results-screen">
      <h1>{t("results.title")}</h1>
      <h4>{t("results.subtitle")}</h4>
      <div className="stat-bars">
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="stat-item">
            <div className="stat-label">
              {t(`results.labels.${key}`)}
            </div>
            <div className="stat-bar-container">
              <div
                className="stat-bar"
                style={{
                  width: `${value}%`,
                  backgroundColor: getBarColor(key, value),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="results-evaluation" style={{ textAlign: "center" }}>
        <h3>{t("results.yourDatasetIs")}</h3>
        <h1 style={{ color: "#000000" }}>
          {generateSummary(variables, language)}
        </h1>
      </div>

      <button onClick={onContinue} className="restart-button">
        {t("results.continue")}
      </button>
    </div>
  );
}

function getBarColor(stat: string, value: number): string {
  const colorSchemes: Record<string, string[]> = {
    quantity: ["#ff4d4d", "#ffcc00", "#66cc33"],
    privacy:  ["#ff4d4d", "#ffcc00", "#66cc33"],
    cultural: ["#66cc33", "#ffcc00", "#ff4d4d"],
    racial:   ["#66cc33", "#ffcc00", "#ff4d4d"],
    class:    ["#66cc33", "#ffcc00", "#ff4d4d"],
    gender:   ["#66cc33", "#ffcc00", "#ff4d4d"],
    overall:  ["#66cc33", "#ffcc00", "#ff4d4d"],
  };
  const scheme = colorSchemes[stat] || ["#ff4d4d", "#ffcc00", "#66cc33"];
  if (value < 33) return scheme[0];
  if (value < 66) return scheme[1];
  return scheme[2];
}

function generateSummary(variables: GameVariables, language: string): string {
  const lang = language === "zh_tw" ? "zh_tw" : "en";
  const s = translations[lang].results.summary;

  const values = Object.entries(variables).map(([key, value]) => ({
    key: key as keyof GameVariables,
    value,
    deviation: Math.abs(50 - value),
  }));

  const maxDeviation = Math.max(...values.map((v) => v.deviation));
  const extremeValues = values.filter((v) => v.deviation === maxDeviation);
  const mostExtreme = extremeValues[Math.floor(Math.random() * extremeValues.length)];

  const intensityBank =
    mostExtreme.deviation > 35
      ? s.intensity.extreme
      : mostExtreme.deviation > 25
      ? s.intensity.high
      : s.intensity.moderate;

  const intensity = intensityBank[Math.floor(Math.random() * intensityBank.length)];
  const descriptor =
    mostExtreme.value > 50
      ? s.descriptors[mostExtreme.key].high
      : s.descriptors[mostExtreme.key].low;

  return `${intensity} ${descriptor}`;
}

export default ResultsScreen;
