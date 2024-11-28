import { usePlugboard } from "@/context/plugboard.context";
import { Keyboard } from "@/lib/keyboard";
import PlugboardConnectionGraph from "./PlugboardConnectionGraph";

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

export function Plugboard() {
  const { connections, handlePlugboardClick } = usePlugboard();

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
      <PlugboardConnectionGraph />

      <div></div>
    </div>
  );
}
