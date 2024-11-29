"use client";
import React, { useState } from "react";
import { EnigmaProvider } from "@/context/enigma.context";
import RotorSelector from "@/components/RotorSelector";
import { Rotors } from "@/components/Rotors";
import Lamps from "@/components/Lamps";
import PlugboardConnectionGraph from "@/components/PlugboardConnectionGraph";
import TextDisplay from "@/components/TextDisplay";
import { Keys } from "@/components/Keys";
import { Plugboard } from "@/components/Plugboard";

const Home: React.FC = () => {
  const [activeLamp, setActiveLamp] = useState<string | null>(null);

  const handleLampChange = (lamp: string | null) => {
    setActiveLamp(lamp);
  };

  return (
    <EnigmaProvider>
      <div className="w-full min-h-[100vh] bg-grey-900 flex flex-col gap-8 justify-center items-center pl-20">
        <div className="p-8 rounded-lg bg-neutral-600 flex flex-col gap-4 items-center">
          <h1>Plugboard</h1>
          <PlugboardConnectionGraph />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center">
          <RotorSelector />
          <Rotors />
          <Lamps activeLamp={activeLamp} />
          <Keys />
          <Plugboard />
          <TextDisplay onLampChange={handleLampChange} />
        </div>
      </div>
    </EnigmaProvider>
  );
};

export default Home;
