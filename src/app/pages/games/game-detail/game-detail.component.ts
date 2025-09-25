import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GamesApiService } from '../../../core/services/games-api.service';
import { GamePlatformsInner, GameSingle, ScreenShot } from '../../../api-client';
import { ActivatedRoute } from '@angular/router';
import { RatingsComponent } from '../../../components/ratings/ratings.component';
import { Rating } from '../../../models/ratings.model';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { MediaGalleryComponent } from '../../../components/media-gallery/media-gallery.component';
import { TagComponent } from '../../../components/tag/tag.component';
@Component({
  selector: 'app-game-detail',
  imports: [RatingsComponent, DatePipe, MediaGalleryComponent, TagComponent, CommonModule],
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
  platformTags: string[] = [];

  screenshots = signal<ScreenShot[]>([]);
  ngOnInit(): void {
    const paramSub = this.activatedRoute.params.subscribe((params) => {
      this.gameId.set(params['id']);
    });

    const apiSub = this.gamesApi.getGameDetail(this.gameId()).subscribe({
      next: (gameResult: GameSingle) => {
        this.game = gameResult;
        const platformArray = (this.game.platforms ?? []) as GamePlatformsInner[];
        const platformNames =
          platformArray.map((x) => x.platform?.name).filter((x) => x != undefined) ?? [];
        this.platformTags = [...platformNames];
      },
    });

    const images = this.gamesApi.getScreenshots(this.gameId()).subscribe({
      next: (imageResult) => {
        this.screenshots.set(imageResult.results);
      },
      error: (err) => console.log('error-getScreenshots:', err),
    });

    console.log('platforms:', this.platformTags);

    this.destroyRef.onDestroy(() => {
      paramSub.unsubscribe();
      apiSub.unsubscribe();
      images.unsubscribe();
    });
  }
}
