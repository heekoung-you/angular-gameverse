import { inject, Inject, Injectable } from '@angular/core';
import {
  ConfigurationParameters,
  Game,
  GameSingle,
  GamesList200Response,
  GamesScreenshotsList200Response,
  GamesService,
  Genre,
  GenresService,
  Tag,
  TagsService,
} from '../../api-client';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamesApiService {
  gamesApi = inject(GamesService);
  tagsApi = inject(TagsService);
  genresApi = inject(GenresService);

  //constructor(private api: GamesService) {}
  getGames({
    pageNumber = 1,
    pageSize = 5,
    genre,
  }: {
    pageNumber?: number;
    pageSize?: number;
    genre?: string | undefined;
  }): Observable<Game[]> {
    // Simulate 30% chance of error
    // const shouldFail = Math.random() < 0.3;
    // if (shouldFail) {
    //   return throwError(() => new Error('Simulated random error'));
    // }

    // TODO put behaviorSubject for saving error.
    return this.gamesApi
      .gamesList(
        pageNumber, // page
        pageSize, // pageSize
        undefined, // search
        undefined, // searchPrecise
        undefined, // searchExact
        undefined, // parentPlatforms
        undefined, // platforms
        undefined, // stores
        undefined, // developers
        undefined, // publishers
        genre // genres
      )
      .pipe(
        map((res: GamesList200Response) => res.results),
        catchError(() => of([]))
      );
  }

  getGameDetail(id: string): Observable<GameSingle> {
    return this.gamesApi.gamesRead(id);
  }

  getScreenshots(id: string): Observable<GamesScreenshotsList200Response> {
    return this.gamesApi.gamesScreenshotsList(id);
  }

  getGenres(): Observable<Genre[]> {
    return this.genresApi.genresList(undefined, 1, 20).pipe(
      map((res) => res.results?.map((genre) => genre) ?? []),
      catchError(() => of([]))
    );
  }
}
