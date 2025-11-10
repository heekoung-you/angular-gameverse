import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectIsAuthResolved = createSelector(
  selectAuthState,
  (state) => state.isAuthResolved,
);

export const selectAuthStatus = createSelector(selectAuthState, (state) => ({
  isAuthenticated: state.isAuthenticated,
  isAuthResolved: state.isAuthResolved,
}));

export const selectUser = createSelector(selectAuthState, (state) => state.user);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated,
);
