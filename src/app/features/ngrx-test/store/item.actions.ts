import { createAction, props } from '@ngrx/store';
import { Item } from '../../../models/inventory/item.model';

export const loadItems = createAction('[NgrxTest] Load Items');

export const loadItemsSuccess = createAction(
  '[NgrxTest] Load Items Success',
  props<{ items: Item[] }>(),
);

export const loadItemsFailure = createAction(
  '[NgrxTest] Load Items Failure',
  props<{ error: string }>(),
);

export const addItem = createAction('[NgrxTest] Add Item', props<{ item: Item }>());

export const removeItem = createAction('[NgrxTest] Remove Item', props<{ itemId: string }>());

export const clearInventory = createAction('[Inventory] Clear');
