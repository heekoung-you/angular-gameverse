// firebase-auth.facade.ts
import { inject, Injectable } from '@angular/core';
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
  /*
firebase-auth.facade.ts:20 Calling Firebase APIs outside of an Injection context may destabilize your application leading to subtle change-detection and hydration bugs. Find more at
 */
  private auth = inject(Auth); // zone-aware - TODO : Ask when to use constructor injector
  private fireStore = inject(Firestore); // zone-aware

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

  signOut(): Promise<void> {
    console.log('signout:authFacade');
    return this.auth.signOut();
  }
}
