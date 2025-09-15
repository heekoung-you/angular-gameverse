import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-header-text',
  imports: [],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss',
})
export class HeaderTextComponent {
  mainHeaderText = input<string>();
  subHeaderText = input<string | undefined>();
  promoText = input<string | undefined>();

  hidePromo = signal<boolean>(false);

  onHidePromo() {
    console.log('Hiding promo text');
    this.hidePromo.set(true);
  }
}
