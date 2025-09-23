import { Injectable } from '@angular/core';
import {
  ConfigurationParameters,
  Game,
  GameSingle,
  GamesList200Response,
  GamesService,
} from '../../api-client';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamesApiService {
  constructor(private api: GamesService) {}
  getGames(): Observable<Game[]> {
    // TODO get from params
    // TODO put behaviorSubject for saving error.
    return this.api
      .gamesList(
        1, // page
        20 // pageSize
      )
      .pipe(
        map((res: GamesList200Response) => res.results),
        catchError(() => of([]))
      );
  }

  getGameDetail(id: string): Observable<GameSingle> {
    return this.api.gamesRead(id);
  }
}
