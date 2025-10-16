import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { ErrorState } from '../../models/error.model';
import { routes } from '../../app.routes';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let routerSpy: any;
  let router: Router;
  const mockErrorState: ErrorState = {
    errorCode: 404,
    message: 'Test error message',
    detail: 'error on api',
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree'], {
      currentNavigation: () => ({
        extras: mockErrorState,
      }),
    });
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      //providers: [provideRouter(routes)],
      providers: [provideRouter(routes, withComponentInputBinding())],
      // providers: [
      //   { provide: Router, useValue: routerSpy },
      //   { provide: ActivatedRoute, useValue: mockActivatedRoute },
      // ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default state if no navigation state', () => {
    const nav = router.currentNavigation();
    console.log(nav?.extras?.state);
    // default state
    expect(component.state.errorCode).toEqual(0);
    expect(component.state.message).toEqual('Unknown error');
  });

  xit('should create and receive state if navigate has state params', fakeAsync(() => {
    router.navigate(['/not-found']);
    fixture.detectChanges();
    tick(); // flush navigation

    // DO NOT CLEAR IF I CAN TEST with navigate error or just set state for this?
    const nav = router.currentNavigation();
    console.log(nav?.extras?.state);
    expect(nav?.extras?.state).toEqual(mockErrorState);
  }));
});
