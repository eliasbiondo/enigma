import { createContext, useContext, useState, ReactNode } from "react";
import { Plugboard } from "@/lib/Plugboard";

interface PlugboardContextType {
  plugboard: Plugboard;
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

export const PlugboardProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [plugboard] = useState(() => new Plugboard([]));

  const handlePlugboardClick = (letter: string) => {
    if (selected === null) {
      setSelected(letter);
    } else if (selected === letter) {
      setSelected(null);
    } else {
      plugboard.addConnection(selected, letter);
      setSelected(null);
    }
  };

  return (
    <PlugboardContext.Provider
      value={{ plugboard, selected, handlePlugboardClick }}
    >
      {children}
    </PlugboardContext.Provider>
  );
};
