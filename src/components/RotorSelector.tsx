"use client";
import React, { useState } from "react";
import { useEnigma } from "@/context/enigma.context";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/Select";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/Drawer";
import { Button } from "@/components/Button";

const rotorOptions = ["I", "II", "III", "IV", "V"];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const RotorSelector: React.FC = () => {
  const { rotorPositions, setPositions, setRotors } = useEnigma();
  const [selectedRotors, setSelectedRotors] = useState<number[]>([0, 1, 2]);

  const handleRotorChange = (index: number, value: string) => {
    const newRotors = [...selectedRotors];
    newRotors[index] = rotorOptions.indexOf(value);
    setSelectedRotors(newRotors);
    setRotors(newRotors);
  };

  const handleInitialPositionChange = (index: number, value: string) => {
    const newPositions = [...rotorPositions];
    newPositions[index] = alphabet.indexOf(value);
    setPositions(newPositions);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Configure Rotors</Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Configure Rotors</DrawerTitle>
          <DrawerDescription className="mt-1 text-sm">
            Select rotors and set initial positions.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          {selectedRotors.map((rotor, index) => (
            <div key={index} className="flex items-center gap-4">
              <Select
                onValueChange={(value) => handleRotorChange(index, value)}
                defaultValue={rotorOptions[rotor]}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rotorOptions.map((option, i) => (
                    <SelectItem
                      key={i}
                      value={option}
                      disabled={selectedRotors.includes(i)}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  handleInitialPositionChange(index, value)
                }
                defaultValue={alphabet[rotorPositions[index]]}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {alphabet.map((letter, i) => (
                    <SelectItem key={i} value={letter}>
                      {letter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <DrawerFooter className="mt-6">
          <DrawerClose asChild>
            <Button className="w-full sm:w-fit" variant="secondary">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RotorSelector;
