import { Component, input, output } from '@angular/core';
import { Item } from '../../../models/inventory/item.model';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  item = input<Item>();
  add = output<Item>();

  addItem(inventoryItem: Item) {
    this.add.emit(inventoryItem);
  }
}
