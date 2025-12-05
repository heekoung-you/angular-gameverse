// src/app/data/mock-items.ts
import { Weapon, Potion, Armor } from '../models/inventory/item.model';

export const MOCK_WEAPONS: Weapon[] = [
  new Weapon('w1', 'Iron Sword', 5, 120, 15, 1),
  new Weapon('w2', 'Long Bow', 3, 180, 12, 10),
  new Weapon('w3', 'Dagger', 1, 60, 8, 0.5),
];

export const MOCK_POTIONS: Potion[] = [
  new Potion('p1', 'Health Potion', 1, 50, 50, 0),
  new Potion('p2', 'Stamina Potion', 1, 45, 40, 0),
  new Potion('p3', 'Antidote', 1, 35, 0, 0),
];

export const MOCK_ARMOR: Armor[] = [
  new Armor('a1', 'Leather Helm', 2, 90, 5, 'head'),
  new Armor('a2', 'Chainmail', 10, 300, 15, 'chest'),
  new Armor('a3', 'Greaves', 6, 150, 10, 'legs'),
];

// Combined list if needed
export const MOCK_ITEMS = [...MOCK_WEAPONS, ...MOCK_POTIONS, ...MOCK_ARMOR];
