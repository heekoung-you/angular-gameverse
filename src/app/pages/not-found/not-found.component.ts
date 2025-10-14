import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ErrorState } from '../../models/error.model';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  state: ErrorState;

  constructor(private router: Router) {
    this.state = (this.router.currentNavigation()?.extras?.state as ErrorState) ?? {
      errorCode: 0,
      message: 'Unknown error',
      detail: '',
    };
  }
}
