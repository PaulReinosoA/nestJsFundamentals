const MyDecorator = () => {
  return (target: Function) => {
    console.log(target);
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
