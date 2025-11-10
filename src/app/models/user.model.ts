import { User } from '@angular/fire/auth';
import { Gender } from './user-gender';

export interface registerUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender | null;
}

export interface UserState {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export interface AuthUserDto {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string | null;
}

export interface FirebaseUserWithToken extends User {
  uid: string;
  email: string | null;
  stsTokenManager: {
    accessToken: string;
    refreshToken: string;
    expirationTime: string;
  };
}
