import { ComponentFixture, flush, TestBed } from '@angular/core/testing';

import { GameDetailComponent } from './game-detail.component';
import { provideRouter } from '@angular/router';
import { GamesApiService } from '../../../core/services/games-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mockScrrenShots, mockSingleGameCase } from '../../../testing/mock-games';
import { RatingsComponent } from '../../../components/ratings/ratings.component';
import { TagComponent } from '../../../components/tag/tag.component';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let apiSpy: any;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('GamesApiService', ['getGameDetail', 'getScreenshots']);
    await TestBed.configureTestingModule({
      imports: [GameDetailComponent, RatingsComponent, TagComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: GamesApiService, useValue: apiSpy },
      ],
    }).compileComponents();

    apiSpy.getGameDetail.and.returnValue(of(mockSingleGameCase));
    apiSpy.getScreenshots.and.returnValue(of(mockScrrenShots));
    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct game name in the banner', () => {
    const titleEl = fixture.nativeElement.querySelector('.game-title');
    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toBe(mockSingleGameCase.name);
  });

  it('should render ratings bar and labels', () => {
    const ratingBarEl = fixture.nativeElement.querySelectorAll('.rating-bars');

    const ratingLabelEl = fixture.nativeElement.querySelectorAll('.rating-distribution__labels');
    expect(ratingBarEl.length).toEqual(1);
    expect(ratingBarEl[0].children.length).toEqual(4);

    expect(ratingLabelEl.length).toEqual(1);
    expect(ratingLabelEl[0].children.length).toEqual(4);
  });
});
