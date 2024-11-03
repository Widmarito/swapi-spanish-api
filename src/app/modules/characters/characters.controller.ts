import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/in/create-character.dto';
import { UuidValidationPipe } from '../../shared/pipes/uuid-vaildation.pipe';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindCustomCharacterDto,
  FindSwapiCharactersDto,
  SpanishCharacterDto,
} from './dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiTags('Custom English Characters')
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all custom characters',
    type: [FindCustomCharacterDto],
  })
  @ApiTags('Custom English Characters')
  @Get('custom')
  findCustom() {
    return this.charactersService.findCustom();
  }

  @ApiResponse({
    status: 200,
    description: 'Get a custom character by id',
    type: CreateCharacterDto,
  })
  @ApiTags('Custom English Characters')
  @Get('custom/:characterId')
  findOneCustom(@Param('characterId', UuidValidationPipe) characterId: string) {
    return this.charactersService.findOneCustom(characterId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all swapi characters',
    type: [FindSwapiCharactersDto],
  })
  @ApiTags('Swapi Spanish Characters')
  @Get('swapi')
  find() {
    return this.charactersService.find();
  }

  @ApiResponse({
    status: 200,
    description: 'Get a swapi character by id',
    type: SpanishCharacterDto,
  })
  @ApiTags('Swapi Spanish Characters')
  @Get('swapi/:characterId')
  findOneSwapi(@Param('characterId') characterId: string) {
    return this.charactersService.findOneSwapi(characterId);
  }
}
