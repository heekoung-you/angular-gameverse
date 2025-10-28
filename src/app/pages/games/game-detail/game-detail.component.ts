import { Component, computed, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { GamesApiService } from '../../../core/services/games-api.service';
import { GamePlatformsInner, GameSingle, ScreenShot } from '../../../api-client';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingsComponent } from '../../../components/ratings/ratings.component';
import { Rating } from '../../../models/ratings.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MediaGalleryComponent } from '../../../components/media-gallery/media-gallery.component';
import { TagComponent } from '../../../components/tag/tag.component';
import { ErrorState } from '../../../models/error.model';

@Component({
  selector: 'app-game-detail',
  imports: [RatingsComponent, DatePipe, MediaGalleryComponent, TagComponent, CommonModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss',
})
export class GameDetailComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  gamesApi = inject(GamesApiService);
  test = 'some test value';
  game!: GameSingle;
  //gameId = signal('');
  @Input({ required: true }) gameId!: string;
  gameRatings = computed(() => (this.game?.ratings ?? []) as Rating[]);

  platformTags: string[] = [];

  screenshots = signal<ScreenShot[]>([]);
  ngOnInit(): void {
    if (!this.gameId) {
      console.log('ERROR : Missing game ID');
    }

    const apiSub = this.gamesApi.getGameDetail(this.gameId).subscribe({
      next: (gameResult: GameSingle) => {
        this.game = gameResult;

        const platformArray = (this.game.platforms ?? []) as GamePlatformsInner[];
        const platformNames =
          platformArray.map((x) => x.platform?.name).filter((x) => x != undefined) ?? [];
        this.platformTags = [...platformNames];
      },
      error: (err) => {
        console.error('Error loading game detail:', err);

        // If game not found, navigate to not-found page
        if (err.status === 404) {
          this.router.navigate(['/not-found'], {
            state: {
              errorCode: 404,
              detail: err.message,
              message: 'No Game found with the specified ID :' + this.gameId,
            } as ErrorState,
          });
        }
      },
    });

    const images = this.gamesApi.getScreenshots(this.gameId).subscribe({
      next: (imageResult) => {
        this.screenshots.set(imageResult.results);
      },
      error: (err) => {
        console.error('Error loading screenshots:', err);
      },
    });

    this.destroyRef.onDestroy(() => {
      //paramSub.unsubscribe();
      apiSub.unsubscribe();
      images.unsubscribe();
    });
  }
}
