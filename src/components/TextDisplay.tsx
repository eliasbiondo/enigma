import React, { useState, useEffect } from "react";
import { useEnigma } from "@/context/enigma.context";
import { Keyboard } from "@/lib/Keyboard";

interface TextDisplayProps {
  onLampChange: (lamp: string | null) => void;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ onLampChange }) => {
  const { enigma } = useEnigma();
  const [plainText, setPlainText] = useState("");
  const [cipheredText, setCipheredText] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (event.ctrlKey || event.metaKey) {
        if (key === "V") {
          return;
        }
        return;
      }

      if (Keyboard.includes(key)) {
        event.preventDefault();
        setPlainText((prev) => prev + key);
        const cipheredChar = enigma.processMessage(key);
        setCipheredText((prev) => prev + cipheredChar);
        onLampChange(cipheredChar);

        setTimeout(() => onLampChange(null), 500);
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const pasteData = event.clipboardData?.getData("text") || "";
      const filteredData = pasteData
        .toUpperCase()
        .split("")
        .filter((char) => Keyboard.includes(char))
        .join("");
      setPlainText((prev) => prev + filteredData);
      setCipheredText(
        (prev) =>
          prev +
          filteredData
            .split("")
            .map((char) => enigma.processMessage(char))
            .join("")
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("paste", handlePaste);
    };
  }, [enigma, onLampChange]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <h2>Plain Text: {plainText}</h2>
      </div>
      <div>
        <h2>Ciphered Text: {cipheredText}</h2>
      </div>
    </div>
  );
};

export default TextDisplay;
