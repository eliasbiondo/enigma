"use client";
import { usePlugboard } from "@/context/plugboard.context";

export const PlugboardConnectionGraph = () => {
  const { plugboard } = usePlugboard();
  const displayedConnections = new Set();

  return (
    <div>
      {Object.entries(plugboard.connections).map(([letter, connection]) => {
        if (!displayedConnections.has(connection)) {
          displayedConnections.add(letter);
          return (
            <div key={letter} className="flex gap-2">
              <div>{letter}</div>
              <div>{connection}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PlugboardConnectionGraph;
