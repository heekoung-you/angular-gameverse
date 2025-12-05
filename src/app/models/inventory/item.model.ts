export abstract class Item {
  constructor(
    public id: string,
    public name: string,
    public weight: number,
    public value: number,
  ) {}

  abstract type: 'weapon' | 'potion' | 'armor';
}

export class Weapon extends Item {
  type = 'weapon' as const;
  constructor(
    id: string,
    name: string,
    weight: number,
    value: number,
    public damage: number,
    public range: number,
  ) {
    super(id, name, weight, value);
  }
}

export class Potion extends Item {
  type = 'potion' as const;

  constructor(
    id: string,
    name: string,
    weight: number,
    value: number,
    public heal: number,
    public durationSeconds: number,
  ) {
    super(id, name, weight, value);
  }
}

export class Armor extends Item {
  type = 'armor' as const;

  constructor(
    id: string,
    name: string,
    weight: number,
    value: number,
    public defense: number,
    public material: string,
  ) {
    super(id, name, weight, value);
  }
}
