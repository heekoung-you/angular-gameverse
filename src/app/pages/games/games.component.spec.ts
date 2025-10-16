import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { mockGameList, mockGenreListResponse } from '../../testing/mock-games';
import { GamesApiService } from '../../core/services/games-api.service';
import { provideRouter } from '@angular/router';
describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let apiSpy: any;
  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('GamesApiService', ['getGames', 'getGenres']);
    await TestBed.configureTestingModule({
      imports: [GamesComponent, GameCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: GamesApiService, useValue: apiSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;

    apiSpy.getGames.and.returnValue(of(mockGameList));
    apiSpy.getGenres.and.returnValue(of(mockGenreListResponse));
  });

  it('should create and render mock game cards', fakeAsync(() => {
    fixture.detectChanges();
    flush();
    const cards = fixture.nativeElement.querySelectorAll('app-game-card');
    console.log('mockGameList-cards', cards);
    expect(cards.length).toBe(15);
    expect(component).toBeTruthy();
  }));

  it('should create and render empty text', fakeAsync(() => {
    apiSpy.getGames.and.returnValue(of([]));
    fixture.detectChanges();
    tick();
    const cards = fixture.nativeElement.querySelectorAll('app-game-card');
    console.log(cards);
    expect(cards.length).toBe(0);
    expect(component).toBeTruthy();
  }));

  it('should load genres on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(apiSpy.getGenres).toHaveBeenCalled();
    expect(component.genres()).toBeTruthy();
    expect(component.genres().length).toBe(5);
  }));

  it('should load games on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(apiSpy.getGames).toHaveBeenCalled();
    expect(component.games()).toBeTruthy();
  }));

  it('loadGames set more games on load more', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const initialGames = component.games().length;
    component.pageNumber.set(2);
    component.loadGames(undefined);
    tick();
    expect(apiSpy.getGames).toHaveBeenCalledTimes(2);
    expect(component.games().length).toBeGreaterThan(initialGames);
  }));

  it('select genre should set genre and reload games', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const initialGames = component.games().length;
    component.onGenreSelect(mockGenreListResponse[0]);
    tick();
    expect(apiSpy.getGames).toHaveBeenCalledTimes(2);
    expect(component.selectedGenre()).toBe(mockGenreListResponse[0].slug);
    expect(component.games().length).toBeLessThanOrEqual(initialGames);
  }));

  // TODO : Learn more about UI changes how to test. for example toggle view mode
});
