import { Component } from '@angular/core';
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

function equalValues(control: AbstractControl) {
  const password = control.get('passwords.password');
  const confirmPassword = control.get('passwords.confirmPassword');
  if (password == confirmPassword) {
    return null;
  }
  return { passwordNotEqual: true };
}

function emailIsUnique(control: AbstractControl) {
  // TODO : Check Google firebase has api to check those?
  if (control.value !== 'test@abc.de') {
    return of(null);
  }
  console.log('emailIsUnique validation has error');
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

  constructor(private authService: AuthService) {}

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
    console.log(controlName, 'isControlInvalid');
    return !!(control?.touched && control?.dirty && control?.invalid);
  }

  isFormValid() {
    return this.registerForm.valid;
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

    this.registerForm.value.email;
    const req = this.authService.register(registerUserDto).then((val) => {
      console.log(val);
    });
    console.log(this.registerForm);
  }
}
