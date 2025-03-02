import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return; // Prevent running on empty text
    setDisplayedText(""); // Reset before typing starts

    let index = -1;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        index++;
        setDisplayedText((prev) => prev + text[index]);
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default Typewriter;
