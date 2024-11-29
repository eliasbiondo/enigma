import Rotor from "./Rotor";
import { Reflector } from "./Reflector";
import { Plugboard } from "./Plugboard";

class Enigma {
  rotors: Rotor[];
  reflector: Reflector;
  plugboard: Plugboard;

  constructor(rotors: Rotor[], reflector: Reflector, plugboard: Plugboard) {
    this.rotors = rotors;
    this.reflector = reflector;
    this.plugboard = plugboard;
  }

  processLetter(letter: string): string {
    // Rotate the rotors appropriately
    this.rotateRotors();

    // Pass through the plugboard
    let signal = this.plugboard.forward(letter.toUpperCase());

    // Pass through the rotors forward (right to left)
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      signal = this.rotors[i].forward(signal);
    }

    // Reflect
    signal = this.reflector.reflect(signal);

    // Pass back through the rotors backward (left to right)
    for (let i = 0; i < this.rotors.length; i++) {
      signal = this.rotors[i].backward(signal);
    }

    // Pass back through the plugboard
    signal = this.plugboard.backward(signal);

    return signal;
  }

  rotateRotors(): void {
    const numRotors = this.rotors.length;

    // Right rotor always rotates
    const rightRotor = this.rotors[numRotors - 1];
    const middleRotor = this.rotors[numRotors - 2];
    const leftRotor = this.rotors[numRotors - 3];

    const rightRotorAtNotchBefore = rightRotor.reached_notch();
    rightRotor.rotate();
    
    if (numRotors >= 2) {
      const middleRotorAtNotchBefore = middleRotor.reached_notch();
      
      if (rightRotorAtNotchBefore || middleRotorAtNotchBefore) {
        middleRotor.rotate();
      }
      
      if (numRotors >= 3 && middleRotorAtNotchBefore) {
        this.rotors[numRotors - 3].rotate();
      }
    }
    
    console.log("rotor da direita:" + rightRotor.position)
    console.log("rotor do meio:" + middleRotor.position);
    console.log("rotor da esquerda:" + leftRotor.position);

  }

  setRotorPositions(positions: number[]): void {
    for (let i = 0; i < positions.length; i++) {
      this.rotors[i].rotate_to(positions[i]);
    }
  }
}

export default Enigma;
