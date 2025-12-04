import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderTextComponent } from '../../../components/header-text/header-text.component';
import { AuthService } from '../../../core/services/auth.service';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../store/auth.reducer';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, HeaderTextComponent],
      providers: [
        { provide: AuthService, useValue: { authServiceSpy } },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with expected controls', () => {
    expect(component).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTrue();
    expect(component.registerForm.contains('passwords')).toBeTrue();
    expect(component.registerForm.contains('names')).toBeTrue();
    expect(component.registerForm.contains('gender')).toBeTrue();
  });

  it('should mark passwords group as invalid if passwords do not match', () => {
    const passwordsGroup = component.registerForm.get('passwords')!;
    passwordsGroup.get('password')!.setValue('abc123');
    passwordsGroup.get('confirmPassword')!.setValue('xyz789');
    passwordsGroup.markAsDirty();
    passwordsGroup.markAsTouched();
    passwordsGroup.updateValueAndValidity();

    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('.control-error');

    expect(passwordsGroup.invalid).toBeTrue();

    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('please enter a valid password');
  });

  it('should reset form when reset button is clicked', () => {
    component.registerForm.controls.email.setValue('test@test.com');

    fixture.detectChanges();
    const resetButton = fixture.nativeElement.querySelector('button.reset');
    resetButton.click();

    fixture.detectChanges();
    expect(component.registerForm.get('email')!.value).toBeNull();
  });

  it('should disable submit button when form is invalid', () => {
    component.registerForm.get('email')!.setValue('invalid email');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });
});
