import { JSX } from "react";
import { useLanguage, Language } from "../context/LanguageContext";

interface MainMenuProps {
  onStart: () => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "zh_tw", label: "中文" },
];

function MainMenu({ onStart }: MainMenuProps): JSX.Element {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="main-menu">
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
      >
        {LANGUAGES.map(({ code, label }) => {
          const active = language === code;
          return (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              aria-pressed={active}
              className="small-button"
              style={{
                padding: "8px 18px",
                fontSize: 16,
                fontWeight: active ? 700 : 400,
                opacity: active ? 1 : 0.55,
                boxShadow: active ? "0 0 0 3px #ffffff" : "none",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <h1>
        Schrödinger's <br />
        Ethical Dataset
      </h1>

      <button onClick={onStart} className="start-button">
        {t("menu.start")}
      </button>
      <br />
      <p>{t("menu.hint")}</p>
    </div>
  );
}

export default MainMenu;
