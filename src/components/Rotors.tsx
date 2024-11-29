import React from "react";
import { useEnigma } from "@/context/enigma.context";

interface RotorLetterProps {
  letter: string;
}

function RotorLetter({ letter }: RotorLetterProps) {
  return (
    <div className="px-2 py-3 bg-neutral-300 text-neutral-600">{letter}</div>
  );
}

interface RotorProps {
  letters: string[];
}

function Rotor({ letters }: RotorProps) {
  return (
    <div className="flex flex-col border-4 border-neutral-900 relative">
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-neutral-900 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neutral-900 to-transparent" />
      {letters.map((letter, index) => (
        <RotorLetter key={index} letter={letter} />
      ))}
    </div>
  );
}

export function Rotors() {
  const { enigma } = useEnigma();

  return (
    <div className="flex gap-2">
      {enigma.rotors.map((rotor, index) => (
        <Rotor key={index} letters={rotor.getLetters()} />
      ))}
    </div>
  );
}
