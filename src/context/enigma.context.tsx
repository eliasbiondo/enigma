import React, { createContext, useContext, useState, ReactNode } from "react";
import Enigma from "@/lib/Enigma";
import { Plugboard } from "@/lib/Plugboard";
import { Reflector } from "@/lib/Reflector";
import Rotor from "@/lib/Rotor";

// Define context type
interface EnigmaContextType {
  enigma: Enigma;
  rotorPositions: number[];
  setPositions: (positions: number[]) => void;
  selectedPlugboard: string | null;
  handlePlugboardClick: (letter: string) => void;
  plugboardConnections: Record<string, string>;
  plugboardColors: Record<string, string>;
}

// Create Enigma context
const EnigmaContext = createContext<EnigmaContextType | undefined>(undefined);

// Custom hook to use Enigma context
export const useEnigma = () => {
  const context = useContext(EnigmaContext);
  if (!context) {
    throw new Error("useEnigma must be used within an EnigmaProvider");
  }
  return context;
};

// Enigma Provider component
export const EnigmaProvider = ({ children }: { children: ReactNode }) => {
  const rotors = [
    new Rotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ", "Q"),
    new Rotor("AJDKSIRUXBLHWTMCQGZNPYFVOE", "E"),
    new Rotor("BDFHJLCPRTXVZNYEIWGAKMUSQO", "V"),
  ];

  const reflector = new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");
  const [plugboardConnections, setPlugboardConnections] = useState<
    Record<string, string>
  >({});
  const [plugboardColors, setPlugboardColors] = useState<
    Record<string, string>
  >({});

  const enigma = new Enigma(rotors, reflector, new Plugboard([]));

  const [rotorPositions, setRotorPositions] = useState<number[]>([0, 0, 0]);
  const [selectedPlugboard, setSelectedPlugboard] = useState<string | null>(
    null
  );

  const setPositions = (positions: number[]) => {
    setRotorPositions(positions);
    enigma.setRotorPositions(positions);
  };

  const addConnection = (a: string, b: string) => {
    setPlugboardConnections((prev) => ({
      ...prev,
      [a]: b,
      [b]: a,
    }));

    const color = enigma.plugboard.hashColor(a + b);
    setPlugboardColors((prev) => ({
      ...prev,
      [a]: color,
      [b]: color,
    }));
  };

  const handlePlugboardClick = (letter: string) => {
    if (selectedPlugboard === null) {
      setSelectedPlugboard(letter);
    } else if (selectedPlugboard === letter) {
      setSelectedPlugboard(null);
    } else {
      addConnection(selectedPlugboard, letter);
      setSelectedPlugboard(null);
    }
  };

  return (
    <EnigmaContext.Provider
      value={{
        enigma,
        rotorPositions,
        setPositions,
        selectedPlugboard,
        handlePlugboardClick,
        plugboardConnections,
        plugboardColors,
      }}
    >
      {children}
    </EnigmaContext.Provider>
  );
};
