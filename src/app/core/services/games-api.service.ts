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
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GamesApiService {
  gamesApi = inject(GamesService);
  tagsApi = inject(TagsService);
  genresApi = inject(GenresService);
  httpClient = inject(HttpClient);

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

  /*
  Api Swagger documentation differ with real api endpoint.
  implement this endpoint manually with HttpClient
  Api key is not working from my dev generated key. Copied from real request
  */
  getGamesSuggested({
    gameId,
    pageNumber = 1,
    pageSize = 5,
  }: {
    gameId: string;
    pageNumber?: number;
    pageSize?: number;
  }): Observable<GameSingle[]> {
    const url = `${environment.rawgApiUrl}/games/${gameId}/suggested`;
    const params = {
      //key: environment.rawgApiKey,
      key: 'c542e67aec3a4340908f9de9e86038af',
      page: pageNumber,
      page_size: pageSize,
    };

    return this.httpClient.get<{ results: GameSingle[] }>(url, { params }).pipe(
      map((res) => {
        console.log('getGamesSuggested: ', res);
        return res.results;
      })
    );
  }
}
