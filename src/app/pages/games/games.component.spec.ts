import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { mockGameList } from '../../testing/mock-games';
import { GamesApiService } from '../../core/services/games-api.service';
import { provideRouter } from '@angular/router';
describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let apiSpy: any;
  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('GamesApiService', ['getGames']);
    await TestBed.configureTestingModule({
      imports: [GamesComponent, GameCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: GamesApiService, useValue: apiSpy },
      ],
    }).compileComponents();
    // .then(() => {
    //   co
    // });

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
  });

  it('should create and render mock game cards', fakeAsync(() => {
    apiSpy.getGames.and.returnValue(of(mockGameList));
    console.log('mockGameList', mockGameList);
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
});
