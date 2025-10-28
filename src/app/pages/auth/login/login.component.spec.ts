import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../store/auth.reducer';
import { UserCollectionService } from '../../../core/services/user.collection.service';
import { User } from '@angular/fire/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userCollectionSpy: jasmine.SpyObj<UserCollectionService>;
  let location: Location;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveUserToken']);
    userCollectionSpy = jasmine.createSpyObj('UserCollectionService', [
      'saveUserFavoriteGamesLocalStorage',
    ]);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserCollectionService, useValue: userCollectionSpy },
        provideRouter(routes),
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    userCollectionSpy.saveUserFavoriteGamesLocalStorage.and.returnValue(Promise.resolve());

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    //storeSpy = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with email and password controls ', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should mark as invalid if format not correct', () => {
    const emailControl = component.loginForm.controls.email;
    emailControl.setValue('invalid email address');
    emailControl.markAsTouched();
    emailControl.markAsDirty();
    fixture.detectChanges();

    expect(component.emailInValid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('.email .error-field p');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('Invalid email address');
  });

  it('should call login and navigate to games', async () => {
    const mockUser = {
      uid: 'serserser1',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      providerId: 'firebase',
      stsTokenManager: {
        accessToken: 'access123',
        refreshToken: 'refresh456',
        expirationTime: '999999',
      },
    } as unknown as User;

    authServiceSpy.login.and.returnValue(of(mockUser));
    component.loginForm.setValue({ email: mockUser.email, password: 'test@123' });
    component.login();
    await fixture.whenStable();
    expect(authServiceSpy.login).toHaveBeenCalledWith(mockUser.email!, 'test@123');
    expect(location.path()).toBe('/games');
  });
});
