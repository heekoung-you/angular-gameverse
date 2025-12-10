import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { GameDetailComponent } from './pages/games/game-detail/game-detail.component';
import { MyPageComponent } from './pages/my-page/my-page.component';

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
    path: 'games/:gameId',
    component: GameDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-page',
    component: MyPageComponent,
  },
  {
    path: 'color-picker',
    loadComponent() {
      return import('./pages/color-picker/color-picker.component').then(
        (m) => m.ColorPickerComponent,
      );
    },
  },
  {
    path: 'images',
    loadComponent() {
      return import('./pages/image-playground/image-playground.component').then(
        (m) => m.ImagePlaygroundComponent,
      );
    },
  },
  {
    path: 'inventory',
    loadComponent() {
      return import('./pages/inventory-items/inventory-items.component').then(
        (m) => m.InventoryItemsComponent,
      );
    },
  },
  {
    path: 'ngrx',
    loadComponent() {
      return import('./pages/ngrx-test-items/ngrx-test-items.component').then(
        (m) => m.NgrxTestItemsComponent,
      );
    },
  },
  { path: '**', component: NotFoundComponent },
];
