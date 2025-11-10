import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserCredential, User, Auth } from '@angular/fire/auth';
import { FirebaseAuthFacade } from '../facades/firebase-auth.facade';
import { FirebaseUserWithToken, registerUser } from '../../models/user.model';
import { Gender } from '../../models/user-gender';

describe('AuthService', () => {
  let service: AuthService;
  let mockFacade: jasmine.SpyObj<FirebaseAuthFacade>;

  beforeEach(() => {
    const mockAuth = {} as Auth; // or a more complete mock if needed

    mockFacade = jasmine.createSpyObj('FirebaseAuthFacade', [
      'signIn',
      'createUser',
      'updateUserProfile',
      'updateUserDoc',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: FirebaseAuthFacade, useValue: mockFacade },
        { provide: Auth, useValue: mockAuth },
      ],
    });

    TestBed.runInInjectionContext(() => {
      service = TestBed.inject(AuthService);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and return user', (done) => {
    const mockUser: User = { uid: 'test-uid', email: 'test@example.com' } as User;
    const mockUserCredential: UserCredential = { user: mockUser } as UserCredential;

    mockFacade.signIn.and.returnValue(Promise.resolve(mockUserCredential));

    service.login('test@example.com', 'password123').subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user.email).toBe('test@example.com');
      expect(user.uid).toBe('test-uid');
      done();
    });
  });

  it('should register a user and save to Firestore', async () => {
    const mockUser: User = {
      uid: 'abc123',
      email: 'new@example.com',
      stsTokenManager: {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        expirationTime: '9999999999999',
      },
    } as FirebaseUserWithToken;

    const mockUserCredential: UserCredential = { user: mockUser } as UserCredential;

    mockFacade.createUser.and.returnValue(Promise.resolve(mockUserCredential));
    mockFacade.updateUserProfile.and.returnValue(Promise.resolve());
    mockFacade.updateUserDoc.and.returnValue(Promise.resolve());
    const userData = {
      email: 'new@example.com',
      password: 'securePass',
      firstName: 'Heeky',
      lastName: 'Dev',
      gender: Gender.Female,
    } as registerUser;

    await service.register(userData);
    expect(mockFacade.createUser).toHaveBeenCalledWith(userData.email, userData.password);
    expect(mockFacade.updateUserProfile).toHaveBeenCalledTimes(1);
    expect(mockFacade.updateUserDoc).toHaveBeenCalledTimes(1);
  });
});
