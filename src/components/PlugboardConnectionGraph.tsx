"use client";
import { useEnigma } from "@/context/enigma.context";
import React from "react";

export const PlugboardConnectionGraph = () => {
  const { plugboardConnections } = useEnigma();
  const displayedConnections = new Set<string>();

  return (
    <div className="grid grid-cols-3 gap-4 min-w-60">
      {Object.entries(plugboardConnections).map(([letter, connection]) => {
        if (!displayedConnections.has(connection)) {
          displayedConnections.add(letter);
          return (
            <div key={letter} className="flex gap-2">
              <div>{letter}</div>
              {"<->"}
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
