import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MediaGalleryComponent } from './media-gallery.component';
import { mockSingleGameCase, mockScrrenShots } from '../../testing/mock-games';

describe('MediaGalleryComponent', () => {
  let component: MediaGalleryComponent;
  let fixture: ComponentFixture<MediaGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaGalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaGalleryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('gameTitle', mockSingleGameCase.name!);
    fixture.componentRef.setInput('mediaList', [
      ...mockScrrenShots.results,
      ...mockScrrenShots.results,
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should carousel render images items', fakeAsync(() => {
    const carousel: HTMLDivElement = fixture.nativeElement.querySelector('.game__screenshots-list');
    const scrollButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('.carousel-arrow.right');

    expect(carousel).toBeTruthy();
    expect(scrollButton).toBeTruthy();
    expect(carousel.children.length).toEqual(mockScrrenShots.results.length * 2);
  }));

  it('should scroll carousel when arrow buttons clicked', fakeAsync(() => {
    const scrollButtonRight: HTMLButtonElement =
      fixture.nativeElement.querySelector('.carousel-arrow.right');
    const scrollButtonLeft: HTMLButtonElement =
      fixture.nativeElement.querySelector('.carousel-arrow.left');

    const spy = spyOn(component, 'scrollCarousel');

    scrollButtonLeft.click();
    scrollButtonRight.click();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.calls.argsFor(0)).toEqual(['left']);
    expect(spy.calls.argsFor(1)).toEqual(['right']);
  }));

  it('should call scrollBy when right arrow is clicked', fakeAsync(() => {
    const carousel: HTMLDivElement = fixture.nativeElement.querySelector('.game__screenshots-list');
    const scrollButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('.carousel-arrow.right');

    //TODO -  Need to understand dom element more
    spyOn(carousel, 'scrollBy');
    spyOn(carousel, 'scrollTo');

    scrollButton.click();
    tick(200); // simulate time for smooth scroll
    expect(carousel.scrollTo).not.toHaveBeenCalled();
  }));
});
