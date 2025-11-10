import { TestBed } from '@angular/core/testing';

import { UserCollectionService } from './user.collection.service';
import { FavoriteGame, FirebaseAuthFacade } from '../facades/firebase-auth.facade';
import { Game } from '../../api-client';
import { of } from 'rxjs';

describe('UserCollectionService', () => {
  let service: UserCollectionService;
  let firebaseAuthFacadeSpy: jasmine.SpyObj<FirebaseAuthFacade>;

  beforeEach(() => {
    firebaseAuthFacadeSpy = jasmine.createSpyObj<FirebaseAuthFacade>('FirebaseAuthFacade', [
      'getCurrentUserUId',
      'updateUserFavoriteGame',
      'getFavoriteGames',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseAuthFacade, useValue: firebaseAuthFacadeSpy },
        UserCollectionService,
      ],
    });
    service = TestBed.inject(UserCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current user ID', async () => {
    firebaseAuthFacadeSpy.getCurrentUserUId.and.returnValue(Promise.resolve('user123'));
    const uid = await service.getCurrentUserId();
    expect(uid).toBe('user123');
  });

  it('should toggle favorite game and save to localStorage', async () => {
    const game: Game = { id: 1, slug: 'test-game', name: 'Test Game' } as Game;
    const favorites: FavoriteGame[] = [
      { id: 'test1', gameId: '1', gameSlug: 'test-game', addedDate: new Date() },
    ];

    firebaseAuthFacadeSpy.updateUserFavoriteGame.and.returnValue(Promise.resolve());
    firebaseAuthFacadeSpy.getFavoriteGames.and.returnValue(of(favorites));

    const result = await service.toggleFavoriteGame('user123', game);
    expect(result).toBeTrue();
    expect(localStorage.getItem('favoriteGames')).toContain('test-game');
  });

  it('should check if game is in favorites', () => {
    const favorites: FavoriteGame[] = [
      { id: 'test1', gameId: '1', gameSlug: 'test-game', addedDate: new Date() },
    ];
    localStorage.setItem('favoriteGames', JSON.stringify(favorites));

    const result = service.isUserFavoriteGame('1');
    expect(result).toBeTrue();
  });
});
