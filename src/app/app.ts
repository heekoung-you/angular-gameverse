import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthSyncService } from './core/services/auth.sync.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  authSync = inject(AuthSyncService);
  authService = inject(AuthService);

  readonly syncUserEffect = effect(() => {
    const user = this.authService.user();
    console.log('App effect - user auth state changed:', user);
    console.log('App signalEffect component - user auth state changed:', user);
    this.authService.currentUserSig.set(
      user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerData[0]?.providerId ?? null,
          }
        : null,
    );
  });
}
