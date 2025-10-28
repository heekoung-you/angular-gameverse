import { inject, Injectable, Injector, runInInjectionContext, Signal, signal } from '@angular/core';
import { Auth, user, User, UserCredential } from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';
import { AuthUserDto, FirebaseUserWithToken, registerUser } from '../../models/user.model';
import { FirebaseAuthFacade } from '../facades/firebase-auth.facade';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authFacade = inject(FirebaseAuthFacade);
  auth = inject(Auth); // zone-aware
  // Declare the signal property first
  user!: Signal<User | null>;

  // Set current user dto, to find out user data always and also for user's uid as well.
  currentUserSig = signal<AuthUserDto | null | undefined>(undefined);
  constructor() {
    // TODO: Need to check this. angular zone does not notice changes for firebase auth objects
    const injector = inject(Injector);
    runInInjectionContext(injector, () => {
      this.user = toSignal(user(this.auth), { initialValue: null });
    });
  }

  login(email: string, password: string): Observable<User> {
    // Wrapped firebase calls into facade. - no idea how to unittest for firebase methods.
    // TODO check later - facade unit test.
    return from(this.authFacade.signIn(email, password)).pipe(
      map((userCredential: UserCredential) => userCredential.user),
    );
  }

  saveUserToken(
    accessToken: string,
    refreshToken: string,
    expirationTime: string,
    uid: string,
  ): void {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (accessToken) localStorage.setItem('refreshToken', refreshToken);
    if (accessToken) localStorage.setItem('expirationTime', expirationTime);
    if (accessToken) localStorage.setItem('uid', uid);
  }

  async register(userData: registerUser) {
    const user = await this.authFacade
      .createUser(userData.email, userData.password)
      .then((userCredentials: UserCredential) => userCredentials.user);

    const {
      stsTokenManager: { accessToken, refreshToken, expirationTime },
    } = user as FirebaseUserWithToken;

    this.saveUserToken(accessToken, refreshToken, expirationTime, user.uid);

    await this.authFacade.updateUserProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
    });
    localStorage.setItem('uid', user.uid);
    await this.authFacade.updateUserDoc(user, userData);

    return user;
  }

  getCurrentUserUId(): Promise<string | undefined> {
    return this.authFacade.getCurrentUserUId() ?? undefined;
  }

  logout(): Promise<void> {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('favoriteGames');
    return this.authFacade.signOut();
  }
}
