import { JSX } from "react";

interface MainMenuProps {
  onStart: () => void;
}

function MainMenu({ onStart }: MainMenuProps): JSX.Element {
  return (
    <div className="main-menu">
      <h1>
        Schrödinger's <br />
        Ethical Dataset
      </h1>

      <button onClick={onStart} className="start-button">
        Start
      </button>
      <br></br>
      <p>(best on mobile!)</p>
    </div>
  );
}

export default MainMenu;
