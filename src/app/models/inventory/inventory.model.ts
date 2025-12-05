import { Item } from './item.model';

export class Inventory<T extends Item> {
  private items = new Map<string, { item: T; count: number }>();
  constructor(public maxWeight = 50) {}

  totalWeight(): number {
    return Array.from(this.items.values()).reduce((sum, x) => sum + x.item.weight * x.count, 0);
  }

  totalValue(): number {
    return Array.from(this.items.values()).reduce((sum, x) => sum + x.item.value * x.count, 0);
  }

  totalCount(): number {
    return Array.from(this.items.values()).reduce((sum, x) => sum + x.count, 0);
  }

  list(): { item: T; count: number }[] {
    return Array.from(this.items.values());
  }

  add(item: T): boolean {
    const existing = this.items.get(item.id);
    if (existing) {
      existing.count += 1;
      return true;
    } else {
      this.items.set(item.id, { item, count: 1 });
    }

    return true;
  }

  removeById(id: string): void {
    const existing = this.items.get(id);
    if (!existing) return;
    if (existing.count > 1) {
      existing.count--;
    } else {
      this.items.delete(id);
    }
  }
}
