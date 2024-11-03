import { Test } from '@nestjs/testing';
import { ExternalService } from '../external/external.service';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('ExternalService', () => {
  let service: ExternalService;
  let mockAxios: MockAdapter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ExternalService,
        {
          provide: HttpService,
          useValue: new HttpService(),
        },
      ],
    }).compile();

    service = moduleRef.get<ExternalService>(ExternalService);
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should get characters from SWAPI and map to Spanish', async () => {
    const swapiResponse = {
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: ['https://swapi.dev/api/films/1/'],
          species: [],
          vehicles: [],
          starships: [],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };
    mockAxios.onGet(`${service['baseUrl']}/people`).reply(200, swapiResponse);

    const result = await service.getCharacters();

    expect(result.results[0].nombre).toBe('Luke Skywalker');
    expect(result.results[0].altura).toBe('172');
  });

  it('should get a single character from SWAPI', async () => {
    const characterId = '1';
    const swapiCharacter = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };
    mockAxios
      .onGet(`${service['baseUrl']}/people/${characterId}`)
      .reply(200, swapiCharacter);

    const result = await service.getCharacter(characterId);

    expect(result.nombre).toBe('Luke Skywalker');
    expect(result.altura).toBe('172');
  });
});
