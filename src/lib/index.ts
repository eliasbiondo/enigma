import Enigma from "./Enigma";
import Rotor from "./Rotor";
import { Reflector } from "./Reflector";
import { Plugboard } from "./Plugboard";

// Define the rotors with their wirings and notch positions
var I = new Rotor("EKMFLGDQVZNTOWYHXUSPAIBRCJ", "Q");
var II = new Rotor("AJDKSIRUXBLHWTMCQGZNPYFVOE", "E");
var III = new Rotor("BDFHJLCPRTXVZNYEIWGAKMUSQO", "V");
var IV = new Rotor("ESOVPZJAYQUIRHXLNFTGKDCMWB", "J");
var V = new Rotor("VZBRGITYUPSDNHLXAWMJQOFECK", "Z");

// Define the reflector
const reflectorB = new Reflector("YRUHQSLDPXNGOKMIEBFZCWVJAT"); // Reflector B

// Set up the plugboard with desired connections
const plugboard = new Plugboard(["AR', 'GK', 'OX"]);

// Create the Enigma machine with the rotors, reflector, and plugboard
const enigma = new Enigma([I, II, III], reflectorB, plugboard);

// Set the initial rotor positions (e.g., positions corresponding to 'A', 'A', 'A')
enigma.setRotorPositions([0, 1, 2]);

// The message to encrypt
//const plaintext = "hello world";
const plaintext = "t";

// Initialize the ciphertext
let ciphertext = "";

// Process each character in the plaintext
for (const char of plaintext) {
  if (/[A-Za-z]/.test(char)) {
    // Encrypt the letter and append to ciphertext
    const encryptedChar = enigma.processLetter(char.toUpperCase());
    ciphertext += encryptedChar;
  } else {
    // Non-letter characters are added directly
    ciphertext += char;
  }
}

// Output the results
console.log(`Plaintext:  ${plaintext}`);
console.log(`Ciphertext: ${ciphertext}`);
