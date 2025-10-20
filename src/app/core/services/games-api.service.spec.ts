import { TestBed } from '@angular/core/testing';

import { GamesApiService } from './games-api.service';
import {
  BASE_PATH,
  Game,
  GameSingle,
  GamesList200Response,
  GamesService,
  Genre,
  GenresList200Response,
  GenresService,
} from '../../api-client';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('GamesApiService', () => {
  let service: GamesApiService;
  let apiSpy: any;
  let genreApi: any;
  const mockGameParams = { pageNumber: 1, pageSize: 20, genre: undefined };

  beforeEach(() => {
    const mockGames: Game[] = [
      { id: 1, name: 'Zelda', rating: 4.9, background_image: 'zelda.jpg' },
      { id: 2, name: 'Zelda2', rating: 4.5, background_image: 'test.jpg' },
    ];
    const mockResponse: GamesList200Response = {
      count: 1,
      results: mockGames,
    };

    const mockGameDetail: GameSingle = {
      id: 1,
      name: 'Zelda',
      rating: 4.9,
      background_image: 'zelda.jpg',
    };

    const genreMockResponse: GenresList200Response = {
      count: 1,
      results: [
        {
          id: 1,
          name: 'Action',
          slug: 'action',
          games_count: 100,
          image_background: 'action.jpg',
        } as Genre,
      ],
    };
    const apiServiceSpy = jasmine.createSpyObj('GamesService', ['gamesList', 'gamesRead']);
    apiServiceSpy.gamesList.and.returnValue(of(mockResponse));
    apiServiceSpy.gamesRead.and.returnValue(of(mockGameDetail));

    const genreApiServiceSpy = jasmine.createSpyObj('GenresService', ['genresList']);
    genreApiServiceSpy.genresList.and.returnValue(of({ count: 1, results: [] }));
    genreApiServiceSpy.genresList.and.returnValue(of(genreMockResponse));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: GamesService, useValue: apiServiceSpy },
        { provide: GenresService, useValue: genreApiServiceSpy },
        { provide: BASE_PATH, useValue: 'https://api.rawg.io/api' },
      ],
    });

    service = TestBed.inject(GamesApiService);
    apiSpy = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    genreApi = TestBed.inject(GenresService) as jasmine.SpyObj<GenresService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call gamesList on getGames return games', (done: DoneFn) => {
    service.getGames(mockGameParams).subscribe((games) => {
      expect(apiSpy.gamesList).toHaveBeenCalled();
      expect(games.length).toEqual(2);
      done();
    });
  });

  it('should return an observable of Game[] from game service', () => {
    const result = service.getGames(mockGameParams);
    expect(result instanceof Observable).toBeTrue();
  });

  it('should called gameDetail on getGameDetail', (done: DoneFn) => {
    service.getGameDetail('1').subscribe((gameSingle) => {
      expect(apiSpy.gamesRead).toHaveBeenCalledWith('1');
      expect(gameSingle.name).toEqual('Zelda');
      done();
    });
  });

  it('getGenres should return an observable of Genre[] from genre service', (done: DoneFn) => {
    service.getGenres().subscribe((genres) => {
      expect(genreApi.genresList).toHaveBeenCalled();
      expect(genres.length).toEqual(1); // Since we didn't mock GenresService, it should return one record
      done();
    });
  });
});
