// firebase-auth.facade.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
  User,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { registerUser } from '../../models/user.model';
import { Gender } from '../../models/user-gender';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthFacade {
  constructor(private auth: Auth, private fireStore: Firestore) {}

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  createUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  updateUserProfile(user: User, data: { displayName: string }): Promise<void> {
    return updateProfile(user, data);
  }

  async updateUserDoc(user: User, registerData: registerUser) {
    return await setDoc(doc(this.fireStore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      createdAt: new Date(),
      gender: registerData.gender ?? Gender.Other,
    });
  }
}
