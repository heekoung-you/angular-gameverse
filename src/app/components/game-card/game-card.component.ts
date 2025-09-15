import { Component, input } from '@angular/core';
import { Game } from '../../api-client';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  game = input.required<Game>();
}
