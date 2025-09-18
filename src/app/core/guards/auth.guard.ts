import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthStatus } from '../../store/auth.selector';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthStatus).pipe(
    filter((state) => state.isAuthResolved),
    map((state) => {
      return state.isAuthenticated ? router.createUrlTree(['/games']) : true;
    }),
    take(1)
  );
};
