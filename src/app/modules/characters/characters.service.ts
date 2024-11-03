import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/in/create-character.dto';
import { ExternalService } from './external/external.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly externalService: ExternalService,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    return this.characterRepository.save(createCharacterDto);
  }

  findCustom() {
    return this.characterRepository.find();
  }

  findOneCustom(id: string) {
    return this.characterRepository.findOne({
      where: { id },
    });
  }

  find() {
    return this.externalService.getCharacters();
  }

  findOneSwapi(id: string) {
    return this.externalService.getCharacter(id);
  }
}
