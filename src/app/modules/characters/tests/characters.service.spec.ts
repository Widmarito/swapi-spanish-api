import { Test } from '@nestjs/testing';
import { CharactersService } from '../characters.service';
import { ExternalService } from '../external/external.service';
import { Repository } from 'typeorm';
import { Character } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCharacterDto } from '../dto/in/create-character.dto';
import { vi } from 'vitest';

describe('CharactersService', () => {
  let service: CharactersService;
  let characterRepository: Repository<Character>;
  let externalService: ExternalService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: getRepositoryToken(Character),
          useValue: {
            save: vi.fn(),
            find: vi.fn(),
            findOne: vi.fn(),
          },
        },
        {
          provide: ExternalService,
          useValue: {
            getCharacters: vi.fn(),
            getCharacter: vi.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<CharactersService>(CharactersService);
    characterRepository = moduleRef.get<Repository<Character>>(
      getRepositoryToken(Character),
    );
    externalService = moduleRef.get<ExternalService>(ExternalService);
  });

  const createCharacterDto: CreateCharacterDto = {
    name: 'Luke Skywalker',
    mass: '77',
  };
  const character = {
    ...createCharacterDto,
    id: '123e4567-e89b-12d3-a456-426614174000',
    created: new Date(),
    edited: new Date(),
  };

  const externalMockCharacters = {
    next: '',
    previous: '',
    count: 1,
    results: [
      {
        especies: ['Human'],
        nombre: 'Luke Skywalker',
        altura: '172',
        masa: '77',
        colorPelo: 'blond',
        colorPiel: 'fair',
        colorOjos: 'blue',
        anioNacimiento: '19BBY',
        genero: 'male',
        peliculas: [],
        vehiculos: [],
        navesEstelares: [],
        mundoNatal: '',
        creado: '',
        editado: '',
        url: '',
      },
    ],
  };

  it('should create a character', async () => {
    vi.spyOn(characterRepository, 'save').mockResolvedValue(character);

    const result = await service.create(createCharacterDto);

    expect(result).toEqual(character);
    expect(characterRepository.save).toHaveBeenCalledWith(createCharacterDto);
  });

  it('should get characters from external service', async () => {
    vi.spyOn(externalService, 'getCharacters').mockResolvedValue(
      externalMockCharacters,
    );

    const result = await service.find();

    expect(result).toEqual(externalMockCharacters);
    expect(externalService.getCharacters).toHaveBeenCalled();
  });

  it('should get custom characters from the repository', async () => {
    const mockCharacters: Character[] = [{ ...character }];

    vi.spyOn(characterRepository, 'find').mockResolvedValue(mockCharacters);

    const result = await service.findCustom();

    expect(result).toEqual(mockCharacters);
    expect(characterRepository.find).toHaveBeenCalled();
  });

  it('should get a single character from external service', async () => {
    const id = '1';

    vi.spyOn(externalService, 'getCharacter').mockResolvedValue(
      externalMockCharacters.results[0],
    );

    const result = await service.findOneSwapi(id);

    expect(result).toEqual(externalMockCharacters.results[0]);
    expect(externalService.getCharacter).toHaveBeenCalledWith(id);
  });

  it('should get a single custom character from the repository', async () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';

    vi.spyOn(characterRepository, 'findOne').mockResolvedValue(character);

    const result = await service.findOneCustom(id);

    expect(result).toEqual(character);
    expect(characterRepository.findOne).toHaveBeenCalledWith({ where: { id } });
  });
});
