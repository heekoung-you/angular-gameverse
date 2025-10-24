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
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { registerUser } from '../../models/user.model';
import { Gender } from '../../models/user-gender';
import { firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';

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

  async getCurrentUserUId(): Promise<string | undefined> {
    console.log('getCurrentUserUId:', this.auth.currentUser);
    return this.auth.currentUser?.uid ?? undefined;
  }

  async updateUserFavoriteGame(
    gameId: string,
    gameSlug: string,
    uid?: string | null,
  ): Promise<void> {
    // 1. Resolve UID
    if (!uid) {
      uid = await this.getCurrentUserUId();
      if (!uid) throw new Error('User ID is required');
    }

    // 2. Get current favorites
    const favRef = collection(this.fireStore, `users/${uid}/favoriteGames`);

    // 3. Check if game already exists
    const q = query(favRef, where('gameId', '==', gameId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // 4. Add new favorite
      const documentId = `${gameId}_${gameSlug}_${crypto.randomUUID()}`;
      console.log(`Writing to users/${uid}/favoriteGames`);
      await setDoc(doc(this.fireStore, `users/${uid}/favoriteGames/${documentId}`), {
        gameId,
        gameSlug,
        addedDate: new Date(),
      } as FavoriteGame);
    } else {
      // 4. Remove existing favorite
      console.log(`Removing from users/${uid}/favoriteGames`);
      const deleteDocRef = doc(this.fireStore, `users/${uid}/favoriteGames`, snapshot.docs[0].id);
      await deleteDoc(deleteDocRef);
    }

    // 5. Log remaining favorites
    const updatedUserFavorites = await firstValueFrom(collectionData(favRef, { idField: 'id' }));
    console.log('Remaining favorites after toggle:', updatedUserFavorites);
  }

  getFavoriteGames(uid: string | undefined): Observable<FavoriteGame[]> {
    if (uid === undefined) {
      uid = this.auth.currentUser?.uid;
    }

    if (!uid) {
      throw new Error('User ID is required');
    }

    const path = `users/${uid}/favoriteGames`;
    const favRef = collection(this.fireStore, path);

    return collectionData(favRef, { idField: 'id' }).pipe(
      tap((docs) => console.log('Raw Firestore docs:', docs)),
      map((rawDocs) => {
        return rawDocs.map(
          (doc) =>
            ({
              id: doc['id'],
              gameId: doc['gameId'],
              gameSlug: doc['gameSlug'],
              addedDate: new Date(doc['addedDate']),
            }) as FavoriteGame,
        );
      }),
    );
  }

  getFavoriteGames1(): Observable<FavoriteGame[]> {
    return of(this.auth.currentUser?.uid).pipe(
      switchMap((uid) => {
        if (!uid) throw new Error('User ID is required');
        const favRef = collection(this.fireStore, `users/${uid}/favoriteGames`);
        return collectionData(favRef, { idField: 'id' }).pipe(
          map((docs) =>
            docs.map((doc) => ({
              id: doc['id'],
              gameId: doc['gameId'],
              gameSlug: doc['gameSlug'],
              addedDate: new Date(doc['addedDate']),
            })),
          ),
        );
      }),
    );
  }
}

export interface FavoriteGame {
  id: string; // Firestore document ID
  gameId: string; // or number, depending on your schema
  gameSlug: string;
  addedDate: Date; // Firestore stores this as Timestamp, but you can convert
}
