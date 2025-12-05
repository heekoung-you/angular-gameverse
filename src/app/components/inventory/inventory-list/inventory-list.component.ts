import { Component, inject } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory.service';
import { Observable } from 'rxjs';
import { Item } from '../../../models/inventory/item.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  imports: [AsyncPipe],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
})
export class InventoryListComponent {
  private InventoryService = inject(InventoryService);
  items$: Observable<readonly { item: Item; count: number }[]> = this.InventoryService.getItems$();
  totals$ = this.InventoryService.getTotals$();

  remove(id: string) {
    this.InventoryService.remove(id);
  }
}
