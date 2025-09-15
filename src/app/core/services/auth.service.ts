import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { catchError, defer, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<any> {
    const req = signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      return user;
    });
    console.log('authService-login function called');
    return from(req);
  }

  saveUserToken(accessToken: string, refreshToken: string, expirationTime: string) {
    accessToken ?? localStorage.setItem('accessToken', accessToken); // This is not secure
    refreshToken ?? localStorage.setItem('refreshToken', refreshToken); // This is not secure
    expirationTime ?? localStorage.setItem('expirationTime', expirationTime); // This is not secure
  }
}
