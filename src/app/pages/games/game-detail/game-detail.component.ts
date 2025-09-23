import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GamesApiService } from '../../../core/services/games-api.service';
import { GameSingle } from '../../../api-client';
import { ActivatedRoute } from '@angular/router';
import { RatingsComponent } from '../../../components/ratings/ratings.component';
import { Rating } from '../../../models/ratings.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-game-detail',
  imports: [RatingsComponent, DatePipe],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss',
})
export class GameDetailComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  constructor(private gamesApi: GamesApiService) {}

  game!: GameSingle;
  gameId = signal('');
  gameRatings = computed(() => this.game.ratings as Rating[]) || [];
  ngOnInit(): void {
    const paramSub = this.activatedRoute.params.subscribe((params) => {
      this.gameId.set(params['id']);
    });

    const apiSub = this.gamesApi.getGameDetail(this.gameId()).subscribe({
      next: (gameResult: GameSingle) => (this.game = gameResult),
    });

    this.destroyRef.onDestroy(() => {
      paramSub.unsubscribe();
      apiSub.unsubscribe();
    });
  }
}
