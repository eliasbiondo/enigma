import { createContext, useContext, useState, ReactNode } from "react";

interface PlugboardContextType {
  connections: Record<string, string | null>;
  selected: string | null;
  handlePlugboardClick: (letter: string) => void;
}

const PlugboardContext = createContext<PlugboardContextType | undefined>(
  undefined
);

export const usePlugboard = () => {
  const context = useContext(PlugboardContext);
  if (!context) {
    throw new Error("usePlugboard must be used within a PlugboardProvider");
  }
  return context;
};

function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = Math.floor(
    Math.abs(Math.sin(hash) * 16777215) % 16777215
  ).toString(16);

  const hexColor = `#${"000000".substring(0, 6 - color.length) + color}`;

  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.5) {
    const darkenFactor = 0.7;
    const newR = Math.floor(r * darkenFactor);
    const newG = Math.floor(g * darkenFactor);
    const newB = Math.floor(b * darkenFactor);
    return `#${newR.toString(16).padStart(2, "0")}${newG
      .toString(16)
      .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
  }

  return hexColor;
}

export const PlugboardProvider = ({ children }: { children: ReactNode }) => {
  const [connections, setConnections] = useState<Record<string, string | null>>(
    {}
  );
  const [selected, setSelected] = useState<string | null>(null);

  const handlePlugboardClick = (letter: string) => {
    if (selected === null) {
      setSelected(letter);
    } else if (selected === letter) {
      setSelected(null);
    } else {
      const pair = [selected, letter].sort().join("");
      const color = hashColor(pair);

      setConnections((prevConnections) => {
        const newConnections = { ...prevConnections };

        if (newConnections[selected] === color) {
          newConnections[selected] = null;
          newConnections[letter] = null;
        } else {
          newConnections[selected] = color;
          newConnections[letter] = color;
        }

        return newConnections;
      });

      setSelected(null);
    }
  };

  return (
    <PlugboardContext.Provider
      value={{ connections, selected, handlePlugboardClick }}
    >
      {children}
    </PlugboardContext.Provider>
  );
};
