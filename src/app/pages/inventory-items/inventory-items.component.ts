import { Component, inject, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory.service';
import { MOCK_ITEMS } from '../../data/mock-inventory-items';
import { Item } from '../../models/inventory/item.model';
import { ItemCardComponent } from '../../components/inventory/item-card/item-card.component';
import { InventoryListComponent } from '../../components/inventory/inventory-list/inventory-list.component';

@Component({
  selector: 'app-inventory-items',
  imports: [ItemCardComponent, InventoryListComponent],
  templateUrl: './inventory-items.component.html',
  styleUrl: './inventory-items.component.scss',
})
export class InventoryItemsComponent implements OnInit {
  availableItems: Item[] = MOCK_ITEMS;
  private inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.inventoryService.getItems$().subscribe((items) => {
      console.log('Inventory Items:', items);
      console.log('availableItems:', this.availableItems);
    });
  }

  addToInventory(item: Item) {
    this.inventoryService.add(item);
  }
}
