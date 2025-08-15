import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaulLimit: number;
  //al injectar aqui mi entity(tabla BD) con el decorador nativo de nest para mongoose
  //me permite usar aqui todos lo metodos de mongoose
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaulLimit = configService.get<number>('defaultLimi')!;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toUpperCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaulLimit, offset = 0 } = paginationDto;

    const pokemons = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset) //trae los sigientes # pokemons
      .sort({ no: 1 }) // no de manera asendente
      .select('-__v'); // retiro la version
    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //mongoID
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //name
    if (isNaN(+term) && !isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toUpperCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(`Pokemon not found, with "${term}"`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toUpperCase().trim();

    try {
      await pokemon?.updateOne(updatePokemonDto);
      console.log({ pokemon });
      return { ...pokemon?.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(term);
    // await pokemon.deleteOne();
    // return `pokemon remove: ${pokemon?.name}`;

    // const res = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`pokemon with id: ${id} not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exist in DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create pokemon - check server logs`,
    );
  }

  async removeAll() {
    await this.pokemonModel.deleteMany({});
  }

  async createMany(createPokemonDto: CreatePokemonDto[]) {
    await this.pokemonModel.insertMany(createPokemonDto);
  }
}
