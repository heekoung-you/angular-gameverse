import { Component, ElementRef, input, OnInit, signal, ViewChild } from '@angular/core';
import { ScreenShot } from '../../api-client';

@Component({
  selector: 'app-media-gallery',
  imports: [],
  templateUrl: './media-gallery.component.html',
  styleUrl: './media-gallery.component.scss',
})
export class MediaGalleryComponent implements OnInit {
  gameId = input<string>();
  mediaList = input<ScreenShot[]>([]);
  gameTitle = input<string>('');

  images = signal<ScreenShot[]>([]);

  ngOnInit(): void {
    this.images.set(this.mediaList().filter((x) => x.image && x.image?.length > 0));
  }

  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;

  scrollCarousel(direction: 'left' | 'right') {
    const container = this.carousel.nativeElement;
    const itemWidth = container.querySelector('.game__screenshots-item')?.clientWidth ?? 200;
    /*
      clientWidth = that’s the visible width of .carousel
      scrollWidth = 5 × 250 = 1250 → total width of all .items if there are many items it will get bigger
    */
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === 'left') {
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' }); // loop to end
      } else {
        container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: 'smooth' }); // loop to start
      } else {
        container.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }
  }

  scrollLeft() {
    const container = this.carousel.nativeElement;
    const itemWidth = container.querySelector('.game__screenshots-item')?.clientWidth ?? 200;

    if (container.scrollLeft <= 0) {
      // Loop to end
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const itemWidth =
      this.carousel.nativeElement.querySelector('.game__screenshots-item')?.clientWidth ?? 200;
    this.carousel.nativeElement.scrollBy({ left: itemWidth, behavior: 'smooth' });
  }
}
