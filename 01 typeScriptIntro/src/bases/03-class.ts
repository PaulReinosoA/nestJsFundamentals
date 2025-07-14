import axios from 'axios';

export class Pokemon {
  // public readonly name: string;
  // public id: number;
  // public age?: number;
  // //public imageUrl?: string;

  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly name: string,
    public id: number,
    public age?: number
  ) {
    // this.name = name;
    // this.id = id;
    // this.age = age;
  }

  //* metodos publicos por defecto
  sceen() {
    console.log(`${this.name.toUpperCase()} !!!`);
    charmander.speak();
  }
  //* solo lo uso dentro de la instacia de la clase
  private speak() {
    console.log(`Hola, soy ${this.name}, tengo ${this.age} años.`);
  }

  async getmoves() {
    const moves = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}/`);
    console.log(moves.data.moves);
    return moves;
  }
}

export const charmander = new Pokemon('Charmander', 4, 10);
export const pikachu = new Pokemon('Pikachu', 25, 5);
export const squirtle = new Pokemon('Squirtle', 7, 8);
console.log(pikachu.imageUrl);
pikachu.sceen();

console.log(charmander.getmoves());
