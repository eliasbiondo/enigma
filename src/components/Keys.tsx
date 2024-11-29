import React, { useState, useEffect } from "react";
import { Keyboard } from "@/lib/Keyboard";
import classNames from "classnames";
import { useEnigma } from "@/context/enigma.context";

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

export function Keys() {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const { enigma } = useEnigma();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (Keyboard.includes(key)) {
        setPressedKey(key);
        enigma.processMessage(key);
      }
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enigma]);

  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="grid grid-cols-8 gap-x-8 gap-y-6">
        {Keyboard.slice(0, 16).map((letter) => (
          <Key
            key={letter}
            letter={letter}
            isPressing={letter === pressedKey}
          />
        ))}
      </div>
      <div className="flex gap-8">
        {Keyboard.slice(16, 27).map((letter) => (
          <Key
            key={letter}
            letter={letter}
            isPressing={letter === pressedKey}
          />
        ))}
      </div>
    </div>
  );
}
