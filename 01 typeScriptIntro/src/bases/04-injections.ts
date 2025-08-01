import axios from 'axios';
import {
  Move,
  PokeapiResponse,
} from '../interfaces/pokeApi-response.interfaces';
import { HttpAdapter, PokeApiAdapter, PokerApiFetchAdapeter } from '../api/pokeApi.adapter';

export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    // Todo: inyectar dependencias
    private readonly http: HttpAdapter
  ) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    // const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
    const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
    console.log(data.moves);

    return data.moves;
  }
}

const pokeApiAdapter = new PokeApiAdapter();
const pokerApiFetchAdapeter = new PokerApiFetchAdapeter();
export const charmanderAxios = new Pokemon(4, 'CharmanderAx', pokeApiAdapter);
export const charmanderFetch = new Pokemon(4, 'CharmanderFe', pokerApiFetchAdapeter);

charmanderAxios.getMoves();
charmanderFetch.getMoves();
