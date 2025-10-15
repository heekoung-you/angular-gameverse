import { Injectable } from '@angular/core';
import {
  ConfigurationParameters,
  Game,
  GameSingle,
  GamesList200Response,
  GamesScreenshotsList200Response,
  GamesService,
} from '../../api-client';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamesApiService {
  constructor(private api: GamesService) {}
  getGames({
    pageNumber = 1,
    pageSize = 5,
    tag,
  }: {
    pageNumber?: number;
    pageSize?: number;
    tag?: string | undefined;
  }): Observable<Game[]> {
    // Simulate 30% chance of error
    const shouldFail = Math.random() < 0.3;
    if (shouldFail) {
      return throwError(() => new Error('Simulated random error'));
    }

    // TODO put behaviorSubject for saving error.
    return this.api
      .gamesList(
        pageNumber, // page
        pageSize // pageSize
      )
      .pipe(
        map((res: GamesList200Response) => res.results),
        catchError(() => of([]))
      );
  }

  getGameDetail(id: string): Observable<GameSingle> {
    return this.api.gamesRead(id);
  }

  getScreenshots(id: string): Observable<GamesScreenshotsList200Response> {
    return this.api.gamesScreenshotsList(id);
  }
}
