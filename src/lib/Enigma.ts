import { Plugboard } from "./plugboard";
import { Reflector } from "./Reflector";
import Rotor from "./Rotor";

class Enigma {
    private reflector: Reflector;
    private rotors: Rotor[];
    private plugboard: Plugboard;

    constructor(reflector: Reflector, rotor1: Rotor, rotor2: Rotor, rotor3: Rotor, plugboard: Plugboard) {
        this.reflector = reflector;
        this.rotors = [rotor1, rotor2, rotor3];
        this.plugboard = plugboard;
    }

    setRotors(positions: number[]): void {
        this.rotors.forEach((rotor, i) => {
            rotor.position = positions[i];
        });
    }

    encipher(char: string): string {
        if (!/[A-Z]/.test(char)) return char;

        // Passa pelo plugboard
        char = this.plugboard.forward(char);

        // Passa pelos rotores (ida)
        this.rotors.forEach(rotor => {
            char = rotor.forward(char);
        });

        // Passa pelo refletor
        char = this.reflector.reflect(char);

        // Passa pelos rotores (volta)
        this.rotors.slice().reverse().forEach(rotor => {
            char = rotor.backward(char);
        });

        // Passa novamente pelo plugboard
        char = this.plugboard.backward(char);

        // Roda o primeiro rotor
        if (this.rotors[0].rotate()) {
            if (this.rotors[1].rotate()) {
                this.rotors[2].rotate();
            }
        }

        return char;
    }

    processMessage(message: string): string {
        return message.split('').map(char => this.encipher(char)).join('');
    }
}

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