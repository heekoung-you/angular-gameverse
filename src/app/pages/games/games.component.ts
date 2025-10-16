import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
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

  // page input for normal title/description/promo text
  title = input<string>();
  description = input<string>();
  promoText = input<string>();

  // signals values for page state management
  pageNumber = signal<number>(1);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);
  games = signal<Game[]>([]);
  genres = signal<Genre[]>([]);
  selectedGenre = signal<string | undefined>(undefined);
  isGenresExpanded = signal<boolean>(false);

  // scrolltrigger template reference variable - for infinite scroll load more games
  scrollTrigger = viewChild.required<ElementRef<HTMLDivElement>>('scrollTrigger');

  // genre container to find out if any overflow tags there
  genreContainer = viewChild.required<ElementRef<HTMLDivElement>>('genreContainer');
  hasGenreOverflow = signal(false);

  ngOnInit(): void {
    this.loadGames(undefined, true);
    this.loadGenres();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();

    this.setupGenreOverflowCheck();
  }

  loadGames(genre: string | undefined, hardReload: boolean = false) {
    if (hardReload) {
      this.pageNumber.set(1);
      //this.games.set([]);
    }

    const games$ = this.gamesApiService.getGames({
      pageNumber: this.pageNumber(),
      pageSize: 5,
      genre,
    });

    this.isLoading.set(true);
    this.hasError.set(false);
    const nextPage = this.pageNumber() + 1;

    const sub = games$.subscribe({
      next: (games) => {
        this.games.update((value) => {
          if (hardReload) {
            return [...games];
          } else {
            return [...value, ...games];
          }
        });
        this.pageNumber.set(nextPage);
        this.isLoading.set(false);
        console.log(
          'loadGames called, genre:',
          genre,
          ', hardReload:',
          hardReload,
          ', pageNumber:',
          this.pageNumber(),
          ', games loaded:',
          games.length,
          'Game names',
          games.map((g) => g.name).join(', ')
        );
      },
      error: (error) => {
        //console.error('Error loading games:', error);
        //this.games.set([]);
        console.log(
          'Error loading games: pageNumber:',
          this.pageNumber(),
          ',games:',
          this.games().length
        );
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  loadGenres() {
    const genres$ = this.gamesApiService.getGenres();
    const sub = genres$.subscribe({
      next: (genres) => {
        console.log('Loaded genres:', genres);
        this.genres.set(genres);
      },
      error: (error) => {
        console.error('Error loading genres:', error);
      },
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
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
      rootMargin: '0px',
      scrollMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !this.isLoading() &&
        !this.hasError() &&
        this.pageNumber() > 1
      ) {
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

  toggleGenres() {
    this.isGenresExpanded.set(!this.isGenresExpanded());
  }
}
