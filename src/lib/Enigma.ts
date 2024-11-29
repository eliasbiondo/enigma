import { Plugboard } from "./Plugboard";
import { Reflector } from "./Reflector";
import Rotor from "./Rotor";

class Enigma {
  private rotors: Rotor[];
  private plugboard: Plugboard;
  private reflector: Reflector;

  constructor(rotors: Rotor[], reflector: Reflector, plugboard: Plugboard) {
    if (rotors.length !== 3) {
      throw new Error("Enigma requires exactly 3 rotors.");
    }
    this.rotors = rotors;
    this.reflector = reflector;
    this.plugboard = plugboard;
  }

  setRotorPositions(positions: number[]): void {
    if (positions.length !== this.rotors.length) {
      throw new Error("Positions array must match the number of rotors.");
    }
    positions.forEach((pos, index) => {
      this.rotors[index].rotate_to(pos);
    });
  }

  private stepRotors(): void {
    const rotateNext = this.rotors[0].rotate();

    if (rotateNext) {
      const rotateNext2 = this.rotors[1].rotate();

      if (rotateNext2) {
        this.rotors[2].rotate();
      }
    }
  }

  encipherLetter(letter: string): string {
    if (!/[A-Z]/.test(letter)) return letter;

    let signal = this.plugboard.forward(letter);

    for (const rotor of this.rotors) {
      signal = rotor.forward(signal);
    }

    signal = this.reflector.reflect(signal);

    for (const rotor of [...this.rotors].reverse()) {
      signal = rotor.backward(signal);
    }

    signal = this.plugboard.backward(signal);

    return signal;
  }

  processMessage(message: string): string {
    return message
      .toUpperCase()
      .split("")
      .map((char) => {
        this.stepRotors();
        return this.encipherLetter(char);
      })
      .join("");
  }
}

export default Enigma;
