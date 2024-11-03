import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindCustomCharacterDto {
  @ApiProperty({
    description: 'The id (UUID) of a character',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of a character',
    example: 'Luke Skywalker',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The mass of a character',
    example: '87',
  })
  @IsString()
  mass: string;

  @ApiProperty({
    description: 'The created date of a custom character',
    example: '2024-11-03T22:30:48.976Z',
  })
  created: Date;

  @ApiProperty({
    description: 'The edited date of a custom character',
    example: '2024-11-03T22:30:48.976Z',
  })
  edited: Date;
}
