"use client";
import classNames from "classnames";
import { Keyboard } from "@/lib/Keyboard";
import { Plugboard } from "@/components/Plugboard";
import PlugboardConnectionGraph from "@/components/PlugboardConnectionGraph";
import { EnigmaProvider } from "@/context/enigma.context";
import RotorSelector from "@/components/RotorSelector";
import { Rotors } from "@/components/Rotors";
import Lamps from "@/components/Lamps";

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

const Home: React.FC = () => {
  return (
    <EnigmaProvider>
      <div className="w-full min-h-[100svh] bg-grey-900 flex gap-8 justify-start items-center pl-20">
        <div className="p-8 rounded-lg bg-neutral-600 flex flex-col gap-4 items-center">
          <h1>Plugboard</h1>
          <PlugboardConnectionGraph />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center">
          <RotorSelector />
          <Rotors />
          <Lamps />
          <Keys />
          <Plugboard />
        </div>
      </div>
    </EnigmaProvider>
  );
};

export default Home;
