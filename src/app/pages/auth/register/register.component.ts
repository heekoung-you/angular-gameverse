import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderTextComponent } from '../../../components/header-text/header-text.component';
import { of } from 'rxjs';
import { Gender } from '../../../models/user-gender';
import { UserRole } from '../../../models/user-role';
import { AuthService } from '../../../core/services/auth.service';
import { registerUser } from '../../../models/user.model';
import { Router } from '@angular/router';

function equalValues(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // if (password?.touched && password?.dirty && confirmPassword?.touched && confirmPassword?.dirty) {
  //   if (password.value != confirmPassword.value) {
  //     return { passwordNotEqual: true };
  //   }
  // }

  // return null;

  return password?.value === confirmPassword?.value ? null : { passwordNotEqual: true };
}

function emailIsUnique(control: AbstractControl) {
  // TODO : Check Google firebase has api to check those?
  if (control.value !== 'test@abc.de') {
    return of(null);
  }

  return of({ emailNotUnique: true });
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, HeaderTextComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  genderOptions = Object.entries(Gender);
  roleOptions = Object.entries(UserRole);
  serverErrorMsg = signal<string | undefined>(undefined);

  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      },
      {
        validators: equalValues,
      }
    ),
    names: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    }),

    gender: new FormControl(Gender.Other),
  });

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.touched && control?.dirty && control?.invalid);
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const registerUserDto: registerUser = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.passwords?.password!,
      firstName: this.registerForm.value.names?.firstName!,
      lastName: this.registerForm.value.names?.lastName!,
      gender: this.registerForm.value.gender ?? Gender.Other,
    };

    const user = this.authService
      .register(registerUserDto)
      .then((val) => {
        // Success -> Navigate to games page
        this.router.navigate(['/games']);
      })
      .catch((err) => {
        console.log('Registration Error on Firebase: ', err.code, err.message);
        this.serverErrorMsg.set(err.message);
      });
  }

  reset() {
    this.serverErrorMsg.set(undefined);
  }
}
