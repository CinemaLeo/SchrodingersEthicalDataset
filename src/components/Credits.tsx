import { JSX } from "react";

interface CreditsProps {
  onRestart: () => void;
}

function Credits({ onRestart }: CreditsProps): JSX.Element {
  return (
    <div className="credits-screen">
      <h1>Schrödinger's Ethical Dataset</h1>
      <div className="credits-content">
        <br />
        <h3>
          <a
            href="https://www.instagram.com/sahra.azd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sahra Azadzoy
          </a>{" "}
          &<br />{" "}
          <a
            href="https://www.leobaylybarton.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leo Bayly Barton
          </a>
        </h3>
        <br />
        <h4>Based on:</h4>
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
          <br />
          <li>
            Images from{" "}
            <a
              href="https://www.kaggle.com/datasets/vekosek/cats-from-memes"
              target="_blank"
              rel="noopener noreferrer"
            >
              'Cats from memes'
            </a>{" "}
            dataset
            <br />
            under{" "}
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apache 2.0 License
            </a>
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
