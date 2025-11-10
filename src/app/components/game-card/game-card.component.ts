import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Game, GameSingle } from '../../api-client';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserCollectionService } from '../../core/services/user.collection.service';
import { NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { GamesApiService } from '../../core/services/games-api.service';
import { catchError, delay, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-game-card',
  imports: [RouterLink, MatIconModule, NgClass],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private userCollectionService = inject(UserCollectionService);
  private authService = inject(AuthService);
  private gamesApiService = inject(GamesApiService);
  private destroyRef = inject(DestroyRef);

  game = input<Game | null | undefined>(undefined);
  gameId = input<string | undefined>(undefined);
  remove = output<string>();
  readonly uid = signal<string | undefined | null>(null);
  readonly readyToRender = computed(() => this.resolvedGame() != null);
  private fetchedGame = signal<Game | null>(null);
  readonly resolvedGame = computed(() => {
    return this.game() ?? this.fetchedGame();
  });

  async ngOnInit() {
    const user = this.authService.currentUserSig();
    this.uid.set(user?.uid ?? null);

    if ((this.game() == null || this.game() == undefined) && this.gameId()) {
      this.gamesApiService
        .getGameDetail(this.gameId()!)
        .pipe(
          delay(700),
          tap((game: GameSingle) => {
            this.fetchedGame.set(game as Game);
          }),
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    }
  }

  async toggleFavorite(selectedGame: Game) {
    if (this.uid()) {
      if (selectedGame.id) {
        if (this.isInFavorites(selectedGame.id.toString())) {
          this.remove.emit(selectedGame.id.toString());
        }
        const success = await this.userCollectionService.toggleFavoriteGame(
          this.uid()!,
          selectedGame,
        );
        const message = success
          ? selectedGame.name + ' - status updated.'
          : 'Failed to update favorite status.';
        this._snackBar.open(message, 'Close', { duration: 2000 });
      }
    }
  }

  isInFavorites(gameId: string) {
    return this.userCollectionService.isUserFavoriteGame(gameId);
  }
}
