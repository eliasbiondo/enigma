"use client";
import { usePlugboard } from "@/context/plugboard.context";

export const PlugboardConnectionGraph = () => {
  const { connections } = usePlugboard();
  const displayedConnections = new Set();

  return (
    <div>
      {Object.entries(connections).map(([letter, connection]) => {
        const pair = Object.entries(connections).find(
          ([key, value]) => value === connection && key !== letter
        );

        if (pair) {
          displayedConnections.add(connection);
          return (
            <div key={letter} className="flex gap-2">
              <div>{letter}</div>
              <div>{pair[0]}</div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default PlugboardConnectionGraph;
