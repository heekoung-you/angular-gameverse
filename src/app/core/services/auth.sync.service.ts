import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../../store/auth.actions';
import { Auth, User } from '@angular/fire/auth';
import { AuthUserDto } from '../../models/user.model';

export function mapUserToDto(user: User): AuthUserDto {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    providerId: user.providerData[0]?.providerId ?? 'firebase',
  } as AuthUserDto;
}

@Injectable({ providedIn: 'root' })
export class AuthSyncService {
  private store = inject(Store);
  private auth = inject(Auth);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const dto = mapUserToDto(user);
        //console.log('Auth state changed: User Logged In', user);
        this.store.dispatch(loginSuccess({ user: dto }));
      } else {
        //console.log('Auth state changed: LoggedOut User', user);
        this.store.dispatch(logout());
      }
    });
  }
}
