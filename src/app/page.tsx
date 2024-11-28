"use client";
import { useState } from "react";
import classNames from "classnames";

const Keyboard = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Z",
  "U",
  "I",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "P",
  "Y",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "L",
];

function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor(
    Math.abs(Math.sin(hash) * 16777215) % 16777215
  ).toString(16);
  return `#${"000000".substring(0, 6 - color.length) + color}`;
}

interface RotorLetterProps {
  letter: string;
}

function RotorLetter({ letter }: RotorLetterProps) {
  return (
    <div className="px-2 py-3 bg-neutral-300 text-neutral-600">{letter}</div>
  );
}

function Rotor() {
  return (
    <div className="flex flex-col border-4 border-neutral-900 relative">
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-neutral-900 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neutral-900 to-transparent" />
      {["K", "A", "M"].map((letter) => (
        <RotorLetter key={letter} letter={letter} />
      ))}
    </div>
  );
}

function Rotors() {
  return (
    <div className="flex gap-2">
      <Rotor />
      <Rotor />
      <Rotor />
    </div>
  );
}

interface LampProps {
  letter: string;
  on: boolean;
}

function Lamp({ letter, on }: LampProps) {
  return (
    <div
      className={classNames(
        "size-12 rounded-full flex justify-center items-center",
        {
          "bg-yellow-500/10": !on,
          "bg-yellow-500/80": on,
        }
      )}
    >
      {letter}
    </div>
  );
}

function Lamps() {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="grid grid-cols-8 gap-x-8 gap-y-6">
        {Keyboard.slice(0, 16).map((letter) => (
          <Lamp key={letter} letter={letter} on={letter === "C"} />
        ))}
      </div>
      <div className="flex gap-8">
        {Keyboard.slice(16, 27).map((letter) => (
          <Lamp key={letter} letter={letter} on={letter === "C"} />
        ))}
      </div>
    </div>
  );
}

interface KeyProps {
  letter: string;
  isPressing: boolean;
}

function Key({ letter, isPressing }: KeyProps) {
  return (
    <div
      className={classNames(
        "size-12 rounded-lg flex justify-center items-center bg-neutral-900",
        {
          "scale-100": !isPressing,
          "scale-90": isPressing,
        }
      )}
    >
      {letter}
    </div>
  );
}

function Keys() {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="grid grid-cols-8 gap-x-8 gap-y-6">
        {Keyboard.slice(0, 16).map((letter) => (
          <Key key={letter} letter={letter} isPressing={letter === "C"} />
        ))}
      </div>
      <div className="flex gap-8">
        {Keyboard.slice(16, 27).map((letter) => (
          <Key key={letter} letter={letter} isPressing={letter === "C"} />
        ))}
      </div>
    </div>
  );
}

interface PlugboardKeyProps {
  letter: string;
  color: string | null;
  onClick: (letter: string) => void;
}

function PlugboardKey({ letter, color, onClick }: PlugboardKeyProps) {
  return (
    <div
      onClick={() => onClick(letter)}
      className="size-12 rounded-full flex justify-center items-center border-2 border-neutral-900 cursor-pointer"
      style={{ backgroundColor: color || "transparent" }}
    >
      {letter}
    </div>
  );
}

function Plugboard() {
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
    <div className="flex flex-col gap-y-6 items-center">
      <div className="grid grid-cols-8 gap-x-8 gap-y-6">
        {Keyboard.slice(0, 16).map((letter) => (
          <PlugboardKey
            key={letter}
            letter={letter}
            color={connections[letter]}
            onClick={handlePlugboardClick}
          />
        ))}
      </div>
      <div className="flex gap-8">
        {Keyboard.slice(16, 27).map((letter) => (
          <PlugboardKey
            key={letter}
            letter={letter}
            color={connections[letter]}
            onClick={handlePlugboardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-[100svh] bg-neutral-800 flex flex-col gap-8 justify-center items-center">
      <Rotors />
      <Lamps />
      <Keys />
      <Plugboard />
    </div>
  );
}
