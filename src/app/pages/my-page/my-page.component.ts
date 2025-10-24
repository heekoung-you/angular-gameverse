import { Component, inject, OnInit } from '@angular/core';
import { UserCollectionService } from '../../core/services/user.collection.service';

@Component({
  selector: 'app-my-page',
  imports: [],
  templateUrl: './my-page.component.html',
  styleUrl: './my-page.component.scss',
})
export class MyPageComponent implements OnInit {
  userCollectionService = inject(UserCollectionService);

  ngOnInit(): void {
    this.userCollectionService.getCurrentUidFromLocalStorage;
  }
}
