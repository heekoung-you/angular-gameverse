import { Injectable } from '@angular/core';
import { Item } from '../../models/inventory/item.model';
import { MOCK_ITEMS } from '../../data/mock-inventory-items';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgrxTestService {
  loadItems() {
    return of<Item[]>(MOCK_ITEMS).pipe(delay(800));
  }
}
