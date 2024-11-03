import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SpanishCharacterDto {
  @ApiProperty({
    description: 'The name of a character',
    example: 'Luke Skywalker',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'The tall of a character',
    example: '177',
  })
  @IsString()
  alura: string;

  @ApiProperty({
    description: 'The mass of a character',
    example: '77',
  })
  masa: string;

  @ApiProperty({
    description: 'The hair color of a character',
    example: 'blond',
  })
  colorPelo: string;

  @ApiProperty({
    description: 'The skin color of a character',
    example: 'fair',
  })
  colorPiel: string;

  @ApiProperty({
    description: 'The eye color of a character',
    example: 'blue',
  })
  colorOjos: string;

  @ApiProperty({
    description: 'The birth year of a character',
    example: '19BBY',
  })
  anioNacimiento: string;

  @ApiProperty({
    description: 'The gender of a character',
    example: 'Male',
  })
  genero: string;

  @ApiProperty({
    description: 'The homeworld of a character',
    example: 'https://swapi.dev/api/planets/1/',
  })
  mundoNatal: string;

  @ApiProperty({
    description: 'The films of a character',
    example: ['https://swapi.dev/api/films/1/'],
  })
  peliculas: string[];

  @ApiProperty({
    description: 'The species of a character',
    example: ['https://swapi.dev/api/species/1/'],
  })
  especies: string[];

  @ApiProperty({
    description: 'The vehicles of a character',
    example: ['https://swapi.dev/api/vehicles/14/'],
  })
  vehiculos: string[];

  @ApiProperty({
    description: 'The starships of a character',
    example: ['https://swapi.dev/api/starships/12/'],
  })
  navesEstelares: string[];

  @ApiProperty({
    description: 'The URL of a character',
    example: '2014-12-09T13:50:51.644000Z',
  })
  creado: string;

  @ApiProperty({
    description: 'The URL of a character',
    example: '2014-12-20T21:17:56.891000Z',
  })
  editado: string;

  @ApiProperty({
    description: 'The URL of a character',
    example: 'https://swapi.dev/api/people/1/',
  })
  url: string;
}
