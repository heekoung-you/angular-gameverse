import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { mockGameList, mockSingleGameCase } from '../../testing/mock-games';
import { provideRouter } from '@angular/router';
import { UserCollectionService } from '../../core/services/user.collection.service';
import { AuthService } from '../../core/services/auth.service';
import { GamesApiService } from '../../core/services/games-api.service';
import { of } from 'rxjs';
import { Game } from '../../api-client/model/game';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let gamesApiSpy: jasmine.SpyObj<GamesApiService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userCollectionSpy: jasmine.SpyObj<UserCollectionService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  const mockGamelists = mockGameList;

  beforeEach(async () => {
    gamesApiSpy = jasmine.createSpyObj('GamesApiService', ['getGameDetail']);
    gamesApiSpy.getGameDetail.and.returnValue(of(mockSingleGameCase));

    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUserSig: () => ({ uid: 'mock-uid' }), // signal-style mock
    });
    userCollectionSpy = jasmine.createSpyObj('UserCollectionService', [
      'toggleFavoriteGame',
      'isUserFavoriteGame',
    ]);
    userCollectionSpy.toggleFavoriteGame.and.resolveTo(true);
    userCollectionSpy.isUserFavoriteGame.and.returnValue(false);

    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
      providers: [
        { provide: GamesApiService, useValue: gamesApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserCollectionService, useValue: userCollectionSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
  });

  it('should create by input game', fakeAsync(() => {
    fixture.componentRef.setInput('game', mockGamelists[0]);
    fixture.detectChanges();

    tick(); // allow signals and initial change detection
    fixture.detectChanges(); // re-render after signal updates

    const title = fixture.nativeElement.querySelector('.game-card h3');
    expect(title?.textContent).toContain('God of War');
  }));

  it('should fetch game detail if only gameId is provided', () => {
    fixture.componentRef.setInput('gameId', '123');
    fixture.detectChanges();
    expect(gamesApiSpy.getGameDetail).toHaveBeenCalledWith('123');
  });

  it('should fetch game detail and set fetchedGame signal', fakeAsync(() => {
    // Provide only gameId, no game input
    fixture.componentRef.setInput('gameId', '123');
    fixture.detectChanges();

    tick(700); // simulate delay(700)
    fixture.detectChanges();

    // Assert that fetchedGame signal is set
    const fetched = component['fetchedGame']();
    expect(fetched).toBeTruthy();
    expect(fetched?.id).toBe(mockSingleGameCase.id);
  }));

  it('should return false from isInFavorites()', () => {
    const result = component.isInFavorites('123');
    expect(result).toBeFalse();
  });

  it('should toggle favorite and show success message when game is not in favorites', async () => {
    const mockGame = { id: 1, name: 'God of War' } as Game;
    await component.ngOnInit();
    await component.toggleFavorite(mockGame);

    expect(userCollectionSpy.isUserFavoriteGame).toHaveBeenCalledWith('1');
    expect(userCollectionSpy.toggleFavoriteGame).toHaveBeenCalledWith('mock-uid', mockGame);
    expect(snackBarSpy.open).toHaveBeenCalled();
  });
});
