import { Component, computed, input } from '@angular/core';
import { Rating } from '../../models/ratings.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-ratings',
  imports: [TitleCasePipe],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss',
})
export class RatingsComponent {
  ratings = input<Rating[]>([]);
  sortedRatings = computed(() => {
    return [...this.ratings().sort((a, b) => b.id - a.id)];
  });
}
