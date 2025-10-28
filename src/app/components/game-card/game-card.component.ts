import { Component, input } from '@angular/core';
import { Game } from '../../api-client';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-game-card',
  imports: [RouterLink, MatIconModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  game = input.required<Game>();
}
