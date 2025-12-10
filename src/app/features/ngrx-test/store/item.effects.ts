import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItemActions from './item.actions';
import { NgrxTestService } from '../../../core/services/ngrx-test.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ItemEffects {
  private actions$ = inject(Actions);
  private ngrxService = inject(NgrxTestService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      switchMap(() =>
        this.ngrxService.loadItems().pipe(
          map((items) => ItemActions.loadItemsSuccess({ items })),
          catchError((err) => of(ItemActions.loadItemsFailure({ error: String(err) }))),
        ),
      ),
    ),
  );
}
