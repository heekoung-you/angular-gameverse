import { Injectable } from '@angular/core';
import { Item } from '../../models/inventory/item.model';
import { Inventory } from '../../models/inventory/inventory.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private inventory = new Inventory<Item>(50);
  private items$ = new BehaviorSubject<readonly { item: Item; count: number }[]>([]);
  private totals$ = new BehaviorSubject<{ weight: number; value: number; count: number }>({
    weight: 0,
    value: 0,
    count: 0,
  });
  getItems$() {
    return this.items$.asObservable();
  }

  getTotals$() {
    return this.totals$.asObservable();
  }

  add(item: Item) {
    this.inventory.add(item);
    this.refresh();
  }

  remove(id: string) {
    this.inventory.removeById(id);
    this.refresh();
  }

  private refresh() {
    this.items$.next(this.inventory.list());
    this.totals$.next({
      weight: this.inventory.totalWeight(),
      value: this.inventory.totalValue(),
      count: this.inventory.totalCount(),
    });
  }
}
