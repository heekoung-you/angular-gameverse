import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';

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
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  { path: '**', component: NotFoundComponent },
];
