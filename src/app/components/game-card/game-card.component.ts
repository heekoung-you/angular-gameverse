import { Component, inject, input, OnInit } from '@angular/core';
import { Game } from '../../api-client';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserCollectionService } from '../../core/services/user.collection.service';
import { NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-game-card',
  imports: [RouterLink, MatIconModule, NgClass],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private userCollectionService = inject(UserCollectionService);

  game = input.required<Game>();
  uid = input<string | undefined>(undefined);

  async ngOnInit() {
    const test = await this.userCollectionService.getCurrentUserId();
    console.log('User ID in GameCardComponent:', test);
  }

  async toggleFavorite(selectedGame: Game) {
    if (selectedGame.id) {
      const success = await this.userCollectionService.toggleFavoriteGame(this.uid(), selectedGame);
      const message = success
        ? selectedGame.name + ' - status updated.'
        : 'Failed to update favorite status.';
      this._snackBar.open(message, 'Close', { duration: 2000 });
    }
  }

  isInFavorites(game: Game) {
    return this.userCollectionService.isUserFavoriteGame(game.id!.toString());
  }
}
