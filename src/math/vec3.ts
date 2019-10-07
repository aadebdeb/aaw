export class Vec3 {

  constructor(public x: number, public y: number, public z: number) {}

  add(a: Vec3, b: Vec3): Vec3 {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }
}