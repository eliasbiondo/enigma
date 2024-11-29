import React from "react";
import { Keyboard } from "@/lib/Keyboard";
import classNames from "classnames";

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

interface LampsProps {
  activeLamp: string | null;
}

function Lamps({ activeLamp }: LampsProps) {
  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="grid grid-cols-8 gap-x-8 gap-y-6">
        {Keyboard.slice(0, 16).map((letter) => (
          <Lamp key={letter} letter={letter} on={letter === activeLamp} />
        ))}
      </div>
      <div className="flex gap-8">
        {Keyboard.slice(16, 27).map((letter) => (
          <Lamp key={letter} letter={letter} on={letter === activeLamp} />
        ))}
      </div>
    </div>
  );
}

export default Lamps;
