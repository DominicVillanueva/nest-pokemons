import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse, Result } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,
    private readonly _http: AxiosAdapter,
  ) { }

  async executeSeed(): Promise<string> {
    // Clear data to DB
    await this._pokemonModel.deleteMany({});

    const { results } = await this._http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // With promises
    // const insertPromisesArray = [];

    // With Insert
    const pokemonToInsert: CreatePokemonDto[] = [];
    results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length - 2];
      // insertPromisesArray.push(this._pokemonModel.create({ name, nro }));
      // await this._pokemonModel.create({ name, nro })
      pokemonToInsert.push({ name, nro });
    });
    // await Promise.all(insertPromisesArray);
    await this._pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Execute';
  }
}
