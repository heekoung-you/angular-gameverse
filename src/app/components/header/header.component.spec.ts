import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MockState, MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/auth.reducer';
import { Store } from '@ngrx/store';
import { routes } from '../../app.routes';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: any;
  let storeSpy: any;

  const mockAuthState = {
    auth: {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      },
    },
  };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule],
      providers: [
        provideRouter(routes),
        { provide: AuthService, useValue: authServiceSpy },
        provideMockStore({ initialState: mockAuthState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    storeSpy = TestBed.inject(Store) as MockStore;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should render nav links', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.header-nav-link').length).toBe(2);
  });

  it('should call logout and navigate to login', fakeAsync(() => {
    authServiceSpy.logout.and.returnValue(Promise.resolve());
    component.logout();
    fixture.detectChanges();
    tick();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  }));

  it('it should handle logout error', fakeAsync(() => {
    const consoleErrorSpy = spyOn(console, 'error');
    const mockError = new Error('Logout failed');
    authServiceSpy.logout.and.returnValue(Promise.reject(mockError));
    component.logout();
    fixture.detectChanges();
    tick();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'GameVerse signOutError on HeaderComponent:',
      mockError
    );
  }));
});
