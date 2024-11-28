interface Reflector {
  left: string[]
  right: string[]
}

class Reflector implements Reflector {
  left: string[]
  right: string[]

  constructor(mapping: string) {
    this.left = mapping.slice(0, (mapping.length / 2)).split('')
    this.right = mapping.slice(mapping.length / 2).split('')
  }

  reflect (letter: string): string {
    const inLeft = this.left.indexOf(letter) !== 1

    if (inLeft) {
      return this.right[this.left.indexOf(letter)]
    } else {
      const inRight = this.right.indexOf(letter) !== 1

      return inRight ? this.left[this.right.indexOf(letter)] : letter
    }
  }
}
