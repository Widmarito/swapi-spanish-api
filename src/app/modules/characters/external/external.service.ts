import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  GetPeopleResponse,
  SwapiCharacter,
} from './interfaces/people.interfaces';
import { catchError, lastValueFrom, map } from 'rxjs';
import { SpanishCharacter } from './interfaces';

@Injectable()
export class ExternalService {
  private readonly baseUrl: string = 'https://swapi.dev/api';
  constructor(private readonly httpService: HttpService) {}

  async getCharacters() {
    const data = await lastValueFrom(
      this.httpService.get<GetPeopleResponse>(`${this.baseUrl}/people`).pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new Error(
            `Error while trying get data from swapi API: ${error.message}`,
          );
        }),
      ),
    );
    const spanishCharacters = data.results.map((character) =>
      this.mapSwapiToSpanish(character),
    );
    return { ...data, results: spanishCharacters };
  }

  async getCharacter(id: string) {
    const data = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/people/${id}`).pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new Error(
            `Error while trying get data from swapi API: ${error.message}`,
          );
        }),
      ),
    );
    return this.mapSwapiToSpanish(data);
  }

  mapSwapiToSpanish(swapiCharacter: SwapiCharacter): SpanishCharacter {
    return {
      nombre: swapiCharacter.name,
      altura: swapiCharacter.height,
      masa: swapiCharacter.mass,
      colorPelo: swapiCharacter.hair_color,
      colorPiel: swapiCharacter.skin_color,
      colorOjos: swapiCharacter.eye_color,
      anioNacimiento: swapiCharacter.birth_year,
      genero: swapiCharacter.gender,
      mundoNatal: swapiCharacter.homeworld,
      peliculas: swapiCharacter.films,
      especies: swapiCharacter.species,
      vehiculos: swapiCharacter.vehicles,
      navesEstelares: swapiCharacter.starships,
      creado: swapiCharacter.created,
      editado: swapiCharacter.edited,
      url: swapiCharacter.url,
    };
  }
}
