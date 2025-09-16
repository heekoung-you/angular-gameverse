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
