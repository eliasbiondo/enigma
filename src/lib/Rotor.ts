export class Rotor {
  ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  left: string[];
  right: string[];
  notch: string;
  position: number;

  constructor(wiring: string, notch: string) {
    this.left = this.ALPHABET.split("");
    this.right = wiring.toUpperCase().split("");
    this.notch = notch.toUpperCase();
    this.position = 0;
  }

  private charToIndex(c: string): number {
    return this.ALPHABET.indexOf(c.toUpperCase());
  }

  private indexToChar(i: number): string {
    return this.ALPHABET.charAt(i % 26);
  }

  forward(input: string | number): string {
    let inputIndex: number;
    if (typeof input === "string") {
      inputIndex = this.charToIndex(input);
    } else {
      inputIndex = input;
    }
    const shiftedIndex = (inputIndex + this.position) % 26;
    const mappedChar = this.right[shiftedIndex];
    let outputIndex = this.charToIndex(mappedChar);
    outputIndex = (outputIndex - this.position + 26) % 26;
    return this.indexToChar(outputIndex);
  }

  backward(input: string | number): string {
    let inputIndex: number;
    if (typeof input === "string") {
      inputIndex = this.charToIndex(input);
    } else {
      inputIndex = input;
    }
    const shiftedIndex = (inputIndex + this.position) % 26;
    const shiftedChar = this.ALPHABET[shiftedIndex];
    const mappedIndex = this.right.findIndex((char) => char === shiftedChar);
    const outputIndex = (mappedIndex - this.position + 26) % 26;
    return this.indexToChar(outputIndex);
  }

  rotate(): boolean {
    this.position = (this.position + 1) % 26;
    const currentLetter = this.indexToChar(this.position);
    return currentLetter === this.notch;
}

  rotate_to(position: number): void {
    this.position = position % 26;
  }

  reached_notch(): boolean {
    const currentLetter = this.indexToChar(this.position);
    return currentLetter === this.notch;
  }
}

export default Rotor;
