import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter, Router } from '@angular/router';
import { selectAuthStatus } from '../../store/auth.selector';
import { firstValueFrom, isObservable } from 'rxjs';

describe('authGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAuthStatus,
              value: {
                isAuthenticated: true,
                isAuthResolved: true,
              },
            },
          ],
        }),
        provideRouter([]),
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should redirect to /games if authenticated', async () => {
    const resultOrObservable = await TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    const result = isObservable(resultOrObservable)
      ? await firstValueFrom(resultOrObservable)
      : resultOrObservable;
    console.log(result);
    expect(result).toEqual(router.parseUrl('/games'));
  });
});
