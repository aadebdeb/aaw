export class Vec2 {
  constructor(public x: number, public y: number) {}

  add(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x + b.x, a.y + b.y);
  }
}