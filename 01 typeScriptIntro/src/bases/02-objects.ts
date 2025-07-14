interface Pokemon {
  id: number;
  name: string;
  age?: number;
}

export const bulbasaur: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  age: 5,
};

export const chramander: Pokemon = {
  id: 2,
  name: 'chramander',
  age: 9,
};

console.log(bulbasaur);

export const pokemons: Pokemon[] = [];
pokemons.push(bulbasaur);
pokemons.push(chramander);
