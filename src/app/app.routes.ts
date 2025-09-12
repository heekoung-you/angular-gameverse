import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  {
    path: 'games',
    component: GamesComponent,
    data: {
      title: 'Game List',
      description: 'A list of awesome games',
      promoText: 'Discover your next favorite game!',
    },
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
