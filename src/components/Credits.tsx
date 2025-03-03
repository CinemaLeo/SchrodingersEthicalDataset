import { JSX } from "react";

interface CreditsProps {
  onRestart: () => void;
}

function Credits({ onRestart }: CreditsProps): JSX.Element {
  return (
    <div className="credits-screen">
      <h1>Schrodinger's Ethical Dataset</h1>
      <div className="credits-content">
        <br />
        <h3>
          Sahra Azadzoy &{" "}
          <a
            href="https://www.leobaylybarton.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leo Bayly Barton
          </a>
        </h3>
        <br />
        <br />
        <br />
        <h2>Based on:</h2>
        <ul>
          <li>
            <a
              href="https://arxiv.org/pdf/2409.00252"
              target="_blank"
              rel="noopener noreferrer"
            >
              Building Better Datasets
            </a>
            {" by Kate Crawford (2024)"}
          </li>
          <li>
            <a
              href="https://www.semanticscholar.org/paper/A-Taxonomy-of-Challenges-to-Curating-Fair-Datasets-Zhao-Scheuerman/052e971db7ec9202c5ff91e8bf25e4d9059d463d"
              target="_blank"
              rel="noopener noreferrer"
            >
              A Taxonomy of Challenges to Curating Fair Datasets
            </a>
            {" by Dora Zhao, M. Scheuerman, Alice Xiang et al. (2024)"}
          </li>
        </ul>

        <button onClick={onRestart} className="restart-button">
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Credits;
