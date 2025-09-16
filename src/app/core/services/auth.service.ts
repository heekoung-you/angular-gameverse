import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Gender } from '../../models/user-gender';
import { registerUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

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

  async register(userData: registerUser) {
    const userCredentials = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    const user = userCredentials.user;

    await updateProfile(user, { displayName: `${userData.firstName} ${userData.lastName}` });

    await setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date(),
      gender: userData.gender ?? Gender.Other,
    });

    return user;
  }
}
