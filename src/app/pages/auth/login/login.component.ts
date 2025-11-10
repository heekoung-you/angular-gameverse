import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderTextComponent } from '../../../components/header-text/header-text.component';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../store/auth.actions';
import { AuthUserDto, FirebaseUserWithToken } from '../../../models/user.model';
import { catchError, from, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserCollectionService } from '../../../core/services/user.collection.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HeaderTextComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  private router = inject(Router);
  private store = inject(Store);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private userCollection = inject(UserCollectionService);

  async login() {
    // Proceed login
    // Create login service and subscribe
    // Redirect user to profile(Later) or games page
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authService
      .login(email!, password!)
      .pipe(
        switchMap((user) => {
          if (!user) return of(null);
          return from(this.handlePostLogin(user));
        }),
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.error(err);
          return of(null);
        }),
      )
      .subscribe();
  }

  get emailInValid() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    );
  }

  get passwordInValid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    );
  }

  /*
   save user token and ngrx actions,
   save user's favorite token into localstorage before navigate other page
  */
  private async handlePostLogin(user: User) {
    const {
      stsTokenManager: { accessToken, refreshToken, expirationTime },
    } = user as FirebaseUserWithToken;

    // Save token info
    this.authService.saveUserToken(accessToken, refreshToken, expirationTime, user.uid);

    // Copy user auth dto from firebase user
    const userDto: AuthUserDto = {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      providerId: user.providerId ?? '',
    };

    // Dispatch login success
    this.store.dispatch(loginSuccess({ user: userDto }));

    await this.userCollection.saveUserFavoriteGamesLocalStorage(user.uid);

    this.router.navigate(['/games']);
  }
}
