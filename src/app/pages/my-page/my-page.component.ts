import { Component, computed, effect, inject, signal } from '@angular/core';
import { UserCollectionService } from '../../core/services/user.collection.service';
import { AuthService } from '../../core/services/auth.service';
import { FavoriteGame } from '../../core/facades/firebase-auth.facade';
import { HeaderTextComponent } from '../../components/header-text/header-text.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-my-page',
  imports: [HeaderTextComponent, GameCardComponent],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.scss',
})
export class MyPageComponent {
  userCollectionService = inject(UserCollectionService);
  authService = inject(AuthService);
  currentUser = this.authService.currentUserSig;
  displayName = computed(() => {
    return this.currentUser()?.displayName;
  });
  uid = computed(() => {
    return this.authService.currentUserSig()?.uid;
  });

  favoriteGames = signal<FavoriteGame[]>([]);

  readonly syncFavoritesEffect = effect(() => {
    const uid = this.uid();
    if (!uid) return;

    this.userCollectionService.getUserFavoriteGames(uid).then((favorites) => {
      this.favoriteGames.set(favorites);
      console.log('Favorite games on MyPageComponent:', favorites);
    });
  });

  removeFavorite(gameId: string) {
    this.favoriteGames.update((games) => games.filter((g) => g.gameId !== gameId));
  }
}
