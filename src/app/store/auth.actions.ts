import { createAction, props } from '@ngrx/store';
import { AuthUserDto } from '../models/user.model';

/*

Actions – Define what can happen (loginSuccess, logout, etc.)

Reducer – Describe how the state changes in response to those actions

Selectors – Create reusable queries to read from the store

Effects – Listen to actions and trigger side effects (like Firebase calls)

Store Module – Wire everything together in app

*/
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: AuthUserDto }>());

export const logout = createAction('[Auth] Logout');
