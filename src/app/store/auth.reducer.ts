//import { User } from '@angular/fire/auth';
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { AuthUserDto } from '../models/user.model';
/* It listens for dispatched actions (like loginSuccess or logout) and updates the global store accordingly. */
export interface AuthState {
  user: AuthUserDto | null;
  isAuthenticated: boolean;
  isAuthResolved: boolean;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAuthResolved: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => {
    const newState = {
      ...state,
      user,
      isAuthenticated: true,
      isAuthResolved: true,
    };
    console.log('Dispatching loginSuccess:', user, ', newState:', newState);
    return newState;
  }),
  on(logout, (state) => {
    const newState = {
      ...state,
      user: null,
      isAuthenticated: false,
      isAuthResolved: true,
    };
    console.log('Dispatching logout: oldState-', state, ', newState:', newState);
    return newState;
  }),
);
