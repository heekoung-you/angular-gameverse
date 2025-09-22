import { Injectable } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';
import { registerUser } from '../../models/user.model';
import { FirebaseAuthFacade } from '../facades/firebase-auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authFacade: FirebaseAuthFacade) {}

  login(email: string, password: string): Observable<User> {
    // Wrapped firebase calls into facade. - no idea how to unittest for firebase methods.
    // TODO check later - facade unit test.
    return from(this.authFacade.signIn(email, password)).pipe(
      map((userCredential: UserCredential) => userCredential.user)
    );
  }

  saveUserToken(accessToken: string, refreshToken: string, expirationTime: string) {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    if (expirationTime) localStorage.setItem('expirationTime', expirationTime);
  }

  async register(userData: registerUser) {
    const user = await this.authFacade
      .createUser(userData.email, userData.password)
      .then((userCredentials: UserCredential) => userCredentials.user);

    const {
      stsTokenManager: { accessToken, refreshToken, expirationTime },
    } = user as any;

    this.saveUserToken(accessToken, refreshToken, expirationTime);

    await this.authFacade.updateUserProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
    });

    await this.authFacade.updateUserDoc(user, userData);

    return user;
  }

  logout(): Promise<void> {
    return this.authFacade.signOut();
  }
}
