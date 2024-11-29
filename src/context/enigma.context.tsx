import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Enigma from "@/lib/Enigma";
import { Plugboard } from "@/lib/Plugboard";
import { Reflector } from "@/lib/Reflector";
import Rotor from "@/lib/Rotor";

interface EnigmaContextType {
  enigma: Enigma;
  rotorPositions: number[];
  setPositions: (positions: number[]) => void;
  setRotors: (rotorIndices: number[]) => void;
  selectedPlugboard: string | null;
  handlePlugboardClick: (letter: string) => void;
  plugboardConnections: Record<string, string>;
  plugboardColors: Record<string, string>;
}

const EnigmaContext = createContext<EnigmaContextType | undefined>(undefined);

export const useEnigma = () => {
  const context = useContext(EnigmaContext);
  if (!context) {
    throw new Error("useEnigma must be used within an EnigmaProvider");
  }
  return context;
};

export const EnigmaProvider = ({ children }: { children: ReactNode }) => {
  const allRotors = [
    new Rotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ", "Q"),
    new Rotor("AJDKSIRUXBLHWTMCQGZNPYFVOE", "E"),
    new Rotor("BDFHJLCPRTXVZNYEIWGAKMUSQO", "V"),
    new Rotor("ESOVPZJAYQUIRHXLNFTGKDCMWB", "J"),
    new Rotor("VZBRGITYUPSDNHLXAWMJQOFECK", "Z"),
  ];

  const [selectedRotors, setSelectedRotors] = useState<Rotor[]>([
    allRotors[0],
    allRotors[1],
    allRotors[2],
  ]);

  const reflector = new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");
  const [plugboardConnections, setPlugboardConnections] = useState<
    Record<string, string>
  >({});
  const [plugboardColors, setPlugboardColors] = useState<
    Record<string, string>
  >({});

  const [enigma, setEnigma] = useState(
    new Enigma(selectedRotors, reflector, new Plugboard([]))
  );
  const [rotorPositions, setRotorPositions] = useState<number[]>([0, 0, 0]);
  const [selectedPlugboard, setSelectedPlugboard] = useState<string | null>(
    null
  );

  useEffect(() => {
    const plugboard = new Plugboard(
      Object.entries(plugboardConnections).map(([a, b]) => a + b)
    );
    setEnigma(new Enigma(selectedRotors, reflector, plugboard));
  }, [selectedRotors, plugboardConnections]);

  const setPositions = (positions: number[]) => {
    setRotorPositions(positions);
    enigma.setRotorPositions(positions);
  };

  const setRotors = (rotorIndices: number[]) => {
    const newRotors = rotorIndices.map((index) => allRotors[index]);
    setSelectedRotors(newRotors);
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
        setRotors,
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
