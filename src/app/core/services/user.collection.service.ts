import { inject, Injectable } from '@angular/core';
import { FavoriteGame, FirebaseAuthFacade } from '../facades/firebase-auth.facade';
import { Game } from '../../api-client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCollectionService {
  firebaseFacade = inject(FirebaseAuthFacade);

  async getCurrentUserId(): Promise<string | undefined> {
    return this.firebaseFacade.getCurrentUserUId();
  }

  async toggleFavoriteGame(uid: string | undefined, game: Game): Promise<boolean> {
    if (game.id == null || game.slug == null) {
      return false;
    }
    try {
      console.log(`Toggling favorite for game ID: ${game.id}`);
      await this.firebaseFacade.updateUserFavoriteGame(game.id?.toString(), game.slug!, null);

      await this.saveUserFavoriteGamesLocalStorage(uid);

      return true;
    } catch {
      return false;
    }
  }

  async getUserFavoriteGames(uid: string | undefined) {
    const favoriteCollections = await firstValueFrom(this.firebaseFacade.getFavoriteGames(uid));
    console.log(
      'UserCollectionService.getUserFavoriteGames: favorite games collection in local storage:',
      favoriteCollections.length,
      favoriteCollections.map((g) => g.gameSlug),
    );
    return favoriteCollections ?? [];
  }

  async saveUserFavoriteGamesLocalStorage(uid: string | undefined): Promise<void> {
    const favoriteCollections = await this.getUserFavoriteGames(uid);
    window.localStorage.setItem('favoriteGames', JSON.stringify(favoriteCollections));
    return;
  }

  isUserFavoriteGame(gameId: string): boolean {
    try {
      const favorites: FavoriteGame[] = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
      return favorites.some((g) => g.gameId === gameId);
    } catch {
      return false;
    }
  }

  getCurrentUidFromLocalStorage(): string | undefined {
    return window.localStorage.getItem('uid') ?? undefined;
  }
}
