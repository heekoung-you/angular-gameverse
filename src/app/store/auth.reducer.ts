//import { User } from '@angular/fire/auth';
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { User } from '@angular/fire/auth';
import { AuthUserDto } from '../models/user.model';
/* It listens for dispatched actions (like loginSuccess or logout) and updates the global store accordingly. */
export interface AuthState {
  user: AuthUserDto | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }))
);
