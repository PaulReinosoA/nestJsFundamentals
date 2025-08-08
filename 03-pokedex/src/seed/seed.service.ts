import { Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/Poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async excecuteSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    try {
      data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];

        this.pokemonService.create({ no, name });
      });
      return data.results;
    } catch (error) {
      throw new NotFoundException(`can't insert for lote: ${error}`);
    }
  }
}
