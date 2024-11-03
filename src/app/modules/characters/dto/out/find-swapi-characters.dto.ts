import { ApiProperty } from '@nestjs/swagger';
import { SpanishCharacterDto } from './spanish-characters.dto';

export class FindSwapiCharactersDto {
  @ApiProperty({
    description: 'The total number of characters',
    example: 87,
  })
  count: number;

  @ApiProperty({
    description: 'The URL to the next page of characters',
    example: 'https://swapi.dev/api/people/?page=2',
  })
  next: string;

  @ApiProperty({
    description: 'The URL to the previous page of characters',
    example: null,
  })
  previous: string;

  @ApiProperty({
    description: 'The results of the characters',
    type: [SpanishCharacterDto],
  })
  results: SpanishCharacterDto[];
}
