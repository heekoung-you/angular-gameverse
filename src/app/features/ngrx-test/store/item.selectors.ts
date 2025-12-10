import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ItemState } from './item.reducer';

export const selectInventoryFeature = createFeatureSelector<ItemState>('ngrxTestItems');

const { selectAll, selectEntities, selectIds } = adapter.getSelectors(selectInventoryFeature);

export const selectAllItems = selectAll;
export const selectItemEntities = selectEntities;
export const selectItemIds = selectIds;

export const selectLoaded = createSelector(selectInventoryFeature, (s) => s.loaded);
export const selectError = createSelector(selectInventoryFeature, (s) => s.error);
export const selectCounts = createSelector(selectInventoryFeature, (s) => s.counts);

// Items paired with counts
export const selectInventoryList = createSelector(selectAllItems, selectCounts, (items, counts) =>
  items.map((item) => ({ item, count: counts[item.id] ?? 0 })),
);

// Totals
export const selectTotals = createSelector(selectInventoryList, (entries) => {
  let weight = 0,
    value = 0,
    count = 0;
  for (const e of entries) {
    weight += e.item.weight * e.count;
    value += e.item.value * e.count;
    count += e.count;
  }
  return { weight, value, count };
});
