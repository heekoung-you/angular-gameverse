import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageComponent } from './my-page.component';
import { UserCollectionService } from '../../core/services/user.collection.service';
import { AuthService } from '../../core/services/auth.service';

describe('MyPageComponent', () => {
  let component: MyPageComponent;
  let fixture: ComponentFixture<MyPageComponent>;
  let userCollectionSpy: jasmine.SpyObj<UserCollectionService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUserSig: () => ({ uid: 'mock-uid', displayName: 'test name' }),
    });
    userCollectionSpy = jasmine.createSpyObj('UserCollectionService', ['getUserFavoriteGames']);
    userCollectionSpy.getUserFavoriteGames.and.resolveTo([]);
    await TestBed.configureTestingModule({
      imports: [MyPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserCollectionService, useValue: userCollectionSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have info message about favorite games number', () => {
    const infoTextElement = fixture.nativeElement.querySelector('.info-favorite');
    expect(infoTextElement?.textContent).toContain('current your favorite games are : 0');
  });

  it('should render favorite games when available', async () => {
    const mockFavorites = [
      { id: 'test1', gameId: '1', gameSlug: 'test-game', addedDate: new Date() },
      { id: 'test2', gameId: '2', gameSlug: 'test-game2', addedDate: new Date() },
    ];

    userCollectionSpy.getUserFavoriteGames.and.resolveTo(mockFavorites);

    // Recreate component to trigger effect again with new mock
    fixture = TestBed.createComponent(MyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pending();

    expect(component.favoriteGames()?.length).toBe(2);
  });
});
