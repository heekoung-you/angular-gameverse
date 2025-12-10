import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllItems,
  selectInventoryList,
  selectLoaded,
  selectTotals,
} from '../../features/ngrx-test/store/item.selectors';
import { addItem, loadItems, removeItem } from '../../features/ngrx-test/store/item.actions';
import { Item } from '../../models/inventory/item.model';
import { AsyncPipe } from '@angular/common';
import { ItemCardComponent } from '../../components/inventory/item-card/item-card.component';

@Component({
  selector: 'app-ngrx-test-items',
  imports: [AsyncPipe, ItemCardComponent],
  templateUrl: './ngrx-test-items.component.html',
  styleUrl: './ngrx-test-items.component.scss',
})
export class NgrxTestItemsComponent {
  private store = inject(Store);

  items$ = this.store.select(selectAllItems);
  loaded$ = this.store.select(selectLoaded);
  inventory$ = this.store.select(selectInventoryList);
  totals$ = this.store.select(selectTotals);

  reload() {
    this.store.dispatch(loadItems());
  }

  removeFromInventory(id: string) {
    this.store.dispatch(removeItem({ itemId: id }));
  }

  addToInventory(addedItem: Item) {
    // const newItem: Item = {
    //   id: (Math.random() * 1000).toFixed(0),
    //   name: 'New Item' + Math.floor(Math.random() * 100),
    //   weight: Math.floor(Math.random() * 1000),
    //   value: Math.floor(Math.random() * 5000),
    //   type: 'armor',
    // };

    this.store.dispatch(
      addItem({
        item: addedItem,
      }),
    );
  }
}
