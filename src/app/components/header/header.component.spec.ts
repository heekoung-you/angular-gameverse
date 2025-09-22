import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MockState, MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/auth.reducer';
import { Store } from '@ngrx/store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: any;
  let storeSpy: any;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        provideMockStore({ initialState }),
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
});
