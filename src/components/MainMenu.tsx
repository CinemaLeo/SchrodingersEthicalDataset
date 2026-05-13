import { JSX } from "react";
import { useLanguage } from "../context/LanguageContext";

interface MainMenuProps {
  onStart: () => void;
}

function MainMenu({ onStart }: MainMenuProps): JSX.Element {
  const { t, toggleLanguage } = useLanguage();

  return (
    <div className="main-menu">
      <button onClick={toggleLanguage} className="small-button">
        {t("menu.langToggle")}
      </button>

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
