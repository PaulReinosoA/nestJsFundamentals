import { Injectable, NotFoundException } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/Poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async excecuteSeed() {
    await this.pokemonService.removeAll();

    // const { data } = await this.axios.get<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=10',
    // );
    //* aqui opcupo mi custom adapter
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    // const insertPromiseArray = [];
    const pokemonToInsert: { name: string; no: number }[] = [];

    try {
      data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];

        // this.pokemonService.create({ no, name });
        // insertPromiseArray.push(this.pokemonService.create({ name, no }));
        pokemonToInsert.push({ no, name });
      });
      await this.pokemonService.createMany(pokemonToInsert);
      return 'Seed Executed successful';
    } catch (error) {
      throw new NotFoundException(`can't insert for lote: ${error}`);
    }
  }
}
