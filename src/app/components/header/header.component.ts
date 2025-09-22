import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../store/auth.selector';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
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
    console.log('logout triggered');
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']); // or redirect to home/games
      })
      .catch((error) => {
        console.log('signOutError:', error);
      });
  }
}
