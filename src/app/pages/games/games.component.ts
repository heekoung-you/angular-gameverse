import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
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
export class GamesComponent implements OnInit, AfterViewInit {
  title = input<string>();
  description = input<string>();
  promoText = input<string>();

  pageNumber = signal<number>(1);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);
  games = signal<Game[]>([]);

  // TODO : Check move constructor to inject
  // Check if base component to adding - DestroyRef and inherits for this? or just inject (Maybe later create LoggerService to log errors/info)
  constructor(private gamesApiService: GamesApiService, private destroyRef: DestroyRef) {}

  // scrolltrigger template reference variable
  scrollTrigger = viewChild.required<ElementRef<HTMLDivElement>>('scrollTrigger');

  private observer!: IntersectionObserver;
  ngOnInit(): void {
    this.loadGames();
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  loadGames(hardReload: boolean = false) {
    if (hardReload) {
      this.pageNumber.set(1);
      this.games.set([]);
    }

    const games$ = this.gamesApiService.getGames({ pageNumber: this.pageNumber() });
    this.isLoading.set(true);
    this.hasError.set(false);
    const nextPage = this.pageNumber() + 1;

    const sub = games$.subscribe({
      next: (games) => {
        this.games.update((value) => [...value, ...games]);
        this.pageNumber.set(nextPage);
        this.isLoading.set(false);
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

  private setupIntersectionObserver() {
    const options = {
      root: null, //document.querySelector('#game-list'),
      rootMargin: '0px',
      scrollMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading() && !this.hasError()) {
        //this.pageNumber.set(this.pageNumber() + 1);
        console.log('Loading more games, page:', this.pageNumber());

        // Adding delay to simulate loading time and allow isLoading state to be visible
        setTimeout(() => {
          this.loadGames(false);
        }, 500);
      }
    }, options);

    this.observer.observe(this.scrollTrigger().nativeElement);
  }
}
