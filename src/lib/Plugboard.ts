export class Plugboard {
  public connections: Record<string, string>;
  public colors: Record<string, string>;

  constructor(pairs: string[]) {
    this.connections = {};
    this.colors = {};

    for (const pair of pairs) {
      const [a, b] = pair;
      this.addConnection(a, b);
    }
  }

  public hashColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = Math.floor(
      Math.abs(Math.sin(hash) * 16777215) % 16777215
    ).toString(16);

    const hexColor = `#${"000000".substring(0, 6 - color.length) + color}`;

    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (luminance > 0.5) {
      const darkenFactor = 0.7;
      const newR = Math.floor(r * darkenFactor);
      const newG = Math.floor(g * darkenFactor);
      const newB = Math.floor(b * darkenFactor);
      return `#${newR.toString(16).padStart(2, "0")}${newG
        .toString(16)
        .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    }

    return hexColor;
  }

  forward(signal: string): string {
    console.log("o que entrou na plugboard: " + signal);
    var retorno = this.connections[signal] || signal;
    console.log("o que saiu da plugboard: " + retorno);
    return retorno;
  }

  backward(signal: string): string {
    return this.forward(signal);
  }

  getColor(letter: string): string | null {
    return this.colors[letter] || null;
  }

  addConnection(a: string, b: string): void {
    if (this.connections[a] || this.connections[b]) return; // Avoid overwriting existing connections

    this.connections[a] = b;
    this.connections[b] = a;
    const color = this.hashColor(a + b);
    this.colors[a] = color;
    this.colors[b] = color;
  }
}
