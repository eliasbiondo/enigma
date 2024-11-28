class Plugboard {
    left: string[];
    right: string[];
  
    constructor(pares: string[]) {
      this.left = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      this.right = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
      for (const par of pares) {
        const letraA = par[0];
        const letraB = par[1];
        const posicaoA = letraA.charCodeAt(0) - 65;
        const posicaoB = letraB.charCodeAt(0) - 65;
  
        [this.left[posicaoA], this.left[posicaoB]] = [letraB, letraA];
      }
    }
  
    forward(sinal: string): string {
      const posicaoParaPegar = this.left.indexOf(sinal);
      return this.right[posicaoParaPegar];
    }
  
    backward(sinal: string): string {
      const posicaoParaPegar = this.right.indexOf(sinal);
      return this.left[posicaoParaPegar];
    }
  }
  
  //const plug = new Plugboard(["AC", "BZ"]);
  