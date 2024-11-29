"use client";
import classNames from "classnames";
import { Keyboard } from "@/lib/Keyboard";
import { Plugboard } from "@/components/Plugboard";
import PlugboardConnectionGraph from "@/components/PlugboardConnectionGraph";
import { EnigmaProvider } from "@/context/enigma.context";

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

export default function Home() {
  return (
    <EnigmaProvider>
      <div className="w-full min-h-[100svh] bg-neutral-800 flex gap-8 justify-start items-center pl-20">
        <div className="p-8 rounded-lg bg-neutral-600 flex flex-col gap-4 items-center">
          <h1>Plugboard</h1>
          <PlugboardConnectionGraph />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center">
          <Rotors />
          <Lamps />
          <Keys />
          <Plugboard />
        </div>
      </div>
    </EnigmaProvider>
  );
}
