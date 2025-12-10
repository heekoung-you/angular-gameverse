import { createReducer, on } from '@ngrx/store';
import { Item } from '../../../models/inventory/item.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as ItemActions from './item.actions';

export interface ItemState extends EntityState<Item> {
  loaded: boolean;
  counts: Record<string, number>;
  error: string;
}

export const adapter = createEntityAdapter<Item>({
  selectId: (item) => item.id,
});

export const initialState: ItemState = adapter.getInitialState({
  counts: {},
  loaded: false,
  error: '',
});

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItems, (state) => ({ ...state, loaded: false, error: '' })),
  on(ItemActions.loadItemsSuccess, (state, { items }) =>
    adapter.setAll(items, { ...state, loaded: true }),
  ),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, loaded: false, error })),

  on(ItemActions.addItem, (state, { item }) => {
    const withEntity = adapter.upsertOne(item, state);
    const current = withEntity.counts[item.id] ?? 0;
    return { ...withEntity, counts: { ...withEntity.counts, [item.id]: current + 1 } };
  }),
  on(ItemActions.removeItem, (state, { itemId }) => {
    const current = state.counts[itemId] ?? 0;

    if (current <= 1) {
      // Added eslint.config.ts rule to disable @typescript-eslint/no-unused-vars for this ignore pattern variables "_"
      // Added tsconfig.json rule to disable unused-vars -> unused var will be check on lint
      // _ => is a common conventions to indicate that variable is not used but all other will be captured -> restCounts without itemId
      const { [itemId]: _, ...restCounts } = state.counts;
      return { ...state, counts: restCounts };
    }

    return {
      ...state,
      counts: { ...state.counts, [itemId]: current - 1 },
    };
  }),
  on(ItemActions.clearInventory, (state) => ({ ...state, counts: {} })),
);
