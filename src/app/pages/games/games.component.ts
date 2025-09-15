import { Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { GamesApiService } from '../../core/services/games-api.service';
import { Game } from '../../api-client';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { HeaderTextComponent } from '../../components/header-text/header-text.component';

@Component({
  selector: 'app-games',
  imports: [GameCardComponent, HeaderTextComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnInit {
  title = input<string>();
  description = input<string>();
  promoText = input<string>();

  constructor(private gamesApiService: GamesApiService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.loadGames();
  }

  games = signal<Game[]>([]);

  loadGames() {
    const games$ = this.gamesApiService.getGames();
    const sub = games$.subscribe((games) => {
      this.games.set(games);
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
