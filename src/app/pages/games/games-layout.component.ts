import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-games-layout',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './games-layout.component.html',
  styleUrl: './games-layout.component.scss',
})
export class GamesLayoutComponent {}
