import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-finance-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './finance-layout.component.html',
  styleUrl: './finance-layout.component.scss',
})
export class FinanceLayoutComponent {}
