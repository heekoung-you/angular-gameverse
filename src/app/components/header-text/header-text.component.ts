import { Component, inject, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-text',
  imports: [MatIcon],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss',
})
export class HeaderTextComponent {
  mainHeaderText = input<string>();
  subHeaderText = input<string | undefined>();
  promoText = input<string | undefined>();
  iconName = input<string | undefined>();
  redirectLink = input<string | undefined>();

  router = inject(Router);

  hidePromo = signal<boolean>(false);

  constructor() {}
  onHidePromo() {
    console.log('HeaderComponent-', this.mainHeaderText());
    console.log('Hiding promo text');
    this.hidePromo.set(true);
  }

  redirectPage() {
    console.log('HeaderComponent-', this.mainHeaderText());
    if (this.redirectLink()) {
      this.router.navigateByUrl(this.redirectLink()!);
    }
    console.log('Redirecting to promo page');
  }
}
