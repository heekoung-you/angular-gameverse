import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthSyncService } from './core/services/auth.sync.service';
import { AuthService } from './core/services/auth.service';
import { AuthUserDto } from './models/user.model';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from './store/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  authSync = inject(AuthSyncService);
  authService = inject(AuthService);
  store = inject(Store);

  readonly syncUserEffect = effect(() => {
    const user = this.authService.user();
    console.log('App effect - user auth state changed:', user);
    console.log('App signalEffect component - user auth state changed:', user);

    const userDto: AuthUserDto | null = user
      ? {
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
          providerId: user.providerData[0]?.providerId ?? null,
        }
      : null;

    this.authService.currentUserSig.set(userDto);

    if (userDto) {
      this.store.dispatch(loginSuccess({ user: userDto }));
    } else {
      this.store.dispatch(logout());
    }
  });
}
