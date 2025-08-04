class NewPokemon {
  constructor(public readonly id: number, public name: string) {}
  screan() {
    console.log(`NO QUIERO`);
  }
  speak() {
    console.log(`NO QUIERO HABLAR`);
  }
}

//* un decorador es una funcion que tiene acceso A LA definicion de la clase
//* pero tambien nos permite expandir funcionalidad no es herencia ni implementacion
//* defino en nestJS para ver si es controlador modulo etc.

const MyDecorator = () => {
  return (target: Function) => {
    // console.log(target);
    return NewPokemon; //esto sobre escribe la clase
  };
};

@MyDecorator()
export class Pokemon {
  constructor(public readonly id: number, public name: string) {}
  screan() {
    console.log(`${this.name.toUpperCase()}!!`);
  }
  speak() {
    console.log(`${this.name} , ${this.id}!`);
  }
}

export const charmander = new Pokemon(4, 'charmander05');

charmander.screan();
charmander.speak();
