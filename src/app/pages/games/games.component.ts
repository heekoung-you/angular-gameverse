import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { GamesApiService } from '../../core/services/games-api.service';
import { Game, Genre } from '../../api-client';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { HeaderTextComponent } from '../../components/header-text/header-text.component';
import { catchError, finalize, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UserCollectionService } from '../../core/services/user.collection.service';

type GameListType = 'ALL' | 'SUGGESTED';

@Component({
  selector: 'app-games',
  imports: [GameCardComponent, HeaderTextComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnInit, AfterViewInit {
  private gamesApiService = inject(GamesApiService);
  private destroyRef = inject(DestroyRef);
  private observer!: IntersectionObserver;
  private activatedRoute = inject(ActivatedRoute);
  private userCollectionService = inject(UserCollectionService);

  // page input for normal title/description/promo text
  title = input<string>();
  description = input<string>();
  promoText = input<string>();
  loadType = signal<GameListType>('ALL');

  // signals values for page state management
  currentUid = signal<string | undefined>(undefined);
  pageNumber = signal<number>(1);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);
  games = signal<Game[]>([]);
  genres = signal<Genre[]>([]);
  selectedGenre = signal<string | undefined>(undefined);
  isGenresExpanded = signal<boolean>(false);
  sourceGameId = signal<string | undefined>(undefined);
  sourceGameTitle = signal<string | undefined>(undefined);
  inputHeaderForGameTitle = computed(() => {
    return this.loadType() === 'SUGGESTED' && this.sourceGameTitle()
      ? //? `Games similar to <span class='highlight-title'>"${this.sourceGameTitle()}" </span>`
        `Games like <b>"${this.sourceGameTitle()}"</b>`
      : this.title() || 'All Games';
  });

  // scrolltrigger template reference variable - for infinite scroll load more games
  scrollTrigger = viewChild.required<ElementRef<HTMLDivElement>>('scrollTrigger');

  // genre container to find out if any overflow tags there
  genreContainer = viewChild.required<ElementRef<HTMLDivElement>>('genreContainer');
  hasGenreOverflow = signal(false);
  showGenre = computed(() => {
    return this.loadType() === 'SUGGESTED' ? false : true;
  });

  async ngOnInit() {
    // set current uid
    const uid = await this.userCollectionService.getCurrentUidFromLocalStorage();
    this.currentUid.set(uid);

    // Load games depends on router query params
    this.activatedRoute.queryParams.subscribe((params) => {
      const gameId = params['gameId'];
      const type = params['type']?.toUpperCase();

      this.sourceGameId.set(gameId);
      this.sourceGameTitle.set(params['title']);
      this.loadType.set(type === 'SUGGESTED' && gameId ? 'SUGGESTED' : 'ALL');
      this.loadGames(undefined, true);
    });

    this.loadGenres();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();

    this.setupGenreOverflowCheck();
  }

  loadGames(genre: string | undefined, hardReload = false) {
    if (hardReload) {
      this.pageNumber.set(1);
    }

    this.isLoading.set(true);
    this.hasError.set(false);
    const nextPage = this.pageNumber() + 1;

    // Depends on the type of game list to load from all games or suggested games
    const gameApi$ =
      this.loadType().toUpperCase() === 'SUGGESTED' && this.sourceGameId()
        ? this.gamesApiService.getGamesSuggested({
            gameId: this.sourceGameId()!,
            pageNumber: this.pageNumber(),
            pageSize: 5,
          })
        : this.gamesApiService.getGames({ pageNumber: this.pageNumber(), pageSize: 5, genre });

    gameApi$
      .pipe(
        tap((games) => {
          this.games.update((value) => {
            // Hard reload will replace the games, otherwise append to existing list - example using from selecting new filter like select tag(genre)
            if (hardReload) {
              return [...games];
            } else {
              return [...value, ...games];
            }
          });

          // on success, increase the page number for next load
          this.pageNumber.set(nextPage);
        }),
        catchError((err) => {
          console.error(
            'Error loading games:',
            '\n pageNumber:',
            this.pageNumber(),
            '\n gamesLoaded:',
            this.games().length,
            '\n error:',
            err,
          );

          this.hasError.set(true);
          return [of([])];
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  loadGenres() {
    this.gamesApiService
      .getGenres()
      .pipe(
        tap((genres) => this.genres.set(genres)),
        catchError((err) => {
          console.error('Error loading genres:', err);
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  onGenreSelect(genre: Genre) {
    if (genre.slug === this.selectedGenre()) {
      // Deselect if the same genre is clicked
      this.selectedGenre.set(undefined);
    } else {
      if (genre.slug) {
        this.selectedGenre.set(genre.slug);
      }
    }
    this.loadGames(this.selectedGenre(), true);
  }

  private setupIntersectionObserver() {
    // TODO : need to learn more about this section
    const options = {
      root: null, //document.querySelector('#game-list'),
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;

      if (isVisible && !this.isLoading() && !this.hasError() && this.pageNumber() > 1) {
        //this.pageNumber.set(this.pageNumber() + 1); <- move this logic after successful called from load games - more reliable if error happens.
        console.log('Loading more games, page:', this.pageNumber());

        // Adding delay to simulate loading time and allow isLoading state to be visible
        setTimeout(() => {
          this.loadGames(this.selectedGenre(), false);
        }, 100);
      }
    }, options);

    this.observer.observe(this.scrollTrigger().nativeElement);
  }

  // Check if genre buttons overflow container - will be observed from resize observer
  private setupGenreOverflowCheck() {
    const container = this.genreContainer().nativeElement;
    const checkOverflow = () => {
      const firstButton = container.querySelector('button');
      if (!firstButton) return;
      const oneLineHeight = firstButton.clientHeight;
      const totalHeight = container.scrollHeight;
      this.hasGenreOverflow.set(totalHeight > oneLineHeight * 1.5);
    };

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(container);

    queueMicrotask(checkOverflow);

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
    });
  }

  // toggle genre list expand/collapse
  toggleGenres() {
    this.isGenresExpanded.set(!this.isGenresExpanded());
  }
}
