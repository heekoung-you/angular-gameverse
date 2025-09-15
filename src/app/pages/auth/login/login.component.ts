import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderTextComponent } from '../../../components/header-text/header-text.component';
import { AuthService } from '../../../core/services/auth.service';

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
  constructor(private authService: AuthService) {}

  login() {
    // Proceed login
    // Create login service and subscribe
    // Redirect user to profile(Later) or games page
    console.log(this.loginForm);
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authService.login(email!, password!).subscribe({
      next: (user) => {
        console.log('response:', user);

        // save user token information
        // TODO - Create next TODO for ngRX save user information in shared state.
        // TODO - create next TODO for router guards.
        const {
          email,
          stsTokenManager: { accessToken, refreshToken, expirationTime },
        } = user as any;

        console.log(email, accessToken, refreshToken, expirationTime);

        // Save token information in local storage
        this.authService.saveUserToken(accessToken, refreshToken, expirationTime);

        // Redirect to game page
        this.router.navigate(['/games']);
      },
    });
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

  formInvalid() {
    return false;
  }
}
