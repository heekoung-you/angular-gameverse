import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../store/auth.selector';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$ = this.store.select(selectUser);

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']); // or redirect to home/games
      })
      .catch((error) => {
        console.error('GameVerse signOutError on HeaderComponent:', error);
      });
  }
}
