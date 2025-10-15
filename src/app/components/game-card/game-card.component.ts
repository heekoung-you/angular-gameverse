import { Component, input } from '@angular/core';
import { Game } from '../../api-client';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [RouterLink],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  game = input.required<Game>();
}
