import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateCharacterDto {
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
  @IsNumberString()
  mass: string;
}
