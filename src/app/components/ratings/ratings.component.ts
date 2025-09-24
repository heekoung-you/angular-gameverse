import { Component, computed, input, signal } from '@angular/core';
import { Rating } from '../../models/ratings.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-ratings',
  imports: [TitleCasePipe],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss',
})
export class RatingsComponent {
  ratingImages: { [key: string]: string } = {
    exceptional: 'assets/images/exceptional.png',
    recommended: 'assets/images/recommended.png',
    meh: 'assets/images/meh.png',
  };

  ratings = input<Rating[]>([]);
  hoveredRating = signal<string | null>(null);
  sortedRatings = computed(() => {
    return [...this.ratings().sort((a, b) => b.id - a.id)];
  });
}
