import { Plugboard } from "./Plugboard";
import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

class Enigma {
  private reflector: Reflector;
  public rotors: Rotor[];
  public plugboard: Plugboard;

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
    const rotateFirst = this.rotors[0].rotate();
    const rotateSecond = this.rotors[1].reached_notch() || rotateFirst;

    if (rotateSecond) {
      this.rotors[1].rotate();
      if (this.rotors[1].reached_notch()) {
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

// const I   = new Rotor('EKMFLGDQVZNTOWYHXUSPAIBRCJ','Q')
// const II  = new Rotor('AJDKSIRUXBLHWTMCQGZNPYFVOE', 'E')
// const III = new Rotor('BDFHJLCPRTXVZNYEIWGAKMUSQO', 'V')
// const IV  = new Rotor('ESOVPZJAYQUIRHXLNFTGKDCMWB', 'J')
// const V  = new Rotor('VZBRGITYUPSDNHLXAWMJQOFECK', 'Z')

// const B = new Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT')
// const C = new Reflector('FVPJIAOYEDRZXWGCTKUQSBNMHL')
// const pb = new Plugboard(['AR', 'GK', 'OX'])
// const enigma = new Enigma(B, I, II, III, pb)
// enigma.setRotors([1, 2, 3])
// const original = 'TESTANDO'
// let criptografado = ''

// for (let c of original){
//    criptografado += enigma.encipher(c)
// }
