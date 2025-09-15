import { TestBed } from '@angular/core/testing';

import { GamesApiService } from './games-api.service';
import { BASE_PATH, Game, GamesList200Response, GamesService } from '../../api-client';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('GamesApiService', () => {
  let service: GamesApiService;
  let apiSpy: any;

  beforeEach(() => {
    const mockGames: Game[] = [
      { id: 1, name: 'Zelda', rating: 4.9, background_image: 'zelda.jpg' },
      { id: 2, name: 'Zelda2', rating: 4.5, background_image: 'test.jpg' },
    ];

    const mockResponse: GamesList200Response = {
      count: 1,
      results: mockGames,
    };

    const apiServiceSpy = jasmine.createSpyObj('GamesService', ['gamesList']);
    apiServiceSpy.gamesList.and.returnValue(of(mockResponse));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: GamesService, useValue: apiServiceSpy },
        { provide: BASE_PATH, useValue: 'https://api.rawg.io/api' },
      ],
    });
    service = TestBed.inject(GamesApiService);
    apiSpy = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call gamesList on getGames return games', (done: DoneFn) => {
    service.getGames().subscribe((games) => {
      expect(apiSpy.gamesList).toHaveBeenCalledWith(1, 20);
      console.log(games);
      expect(games.length).toEqual(2);
      done();
    });
  });

  it('should return an observable of Game[] from game service', () => {
    const result = service.getGames();
    expect(result instanceof Observable).toBeTrue();
  });
});
