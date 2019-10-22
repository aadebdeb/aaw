import { Vec3 } from './vec3';
import { Vec4 } from './vec4';
import { Mat2 } from './mat2';
import { isNumber } from './utils';

export function vec2(a: number | Vec2, b?: number): Vec2 {
  if (isNumber(a)) {
    if (b === undefined) {
      return new Vec2(a, a);
    }
    return new Vec2(a, b);
  }
  if (a instanceof Vec2 && b === undefined) {
    return new Vec2(a.x, a.y);
  }
  throw new Error('unsupported combination of args.');
}

export class Vec2 {
  constructor(public x: number, public y: number) {}

  static fromArray(array: [number, number]): Vec2 {
    return new Vec2(array[0], array[1]);
  }

  static add(v1: Vec2, v2: number | Vec2): Vec2 {
    if (v2 instanceof Vec2) {
      return new Vec2(
        v1.x + v2.x,
        v1.y + v2.y
      );
    }
    return new Vec2(
      v1.x + v2,
      v1.y + v2
    );
  }

  static sub(v1: Vec2, v2: number | Vec2): Vec2 {
    if (v2 instanceof Vec2) {
      return new Vec2(
        v1.x - v2.x,
        v1.y - v2.y
      )
    }
    return new Vec2(
      v1.x - v2,
      v1.y - v2
    );
  }

  static mul(v1: Vec2, v2: number | Vec2 | Mat2): Vec2 {
    if (v2 instanceof Vec2) {
      return new Vec2(
        v1.x * v2.x,
        v1.y * v2.y
      )
    } else if (v2 instanceof Mat2) {
      return new Vec2(
        v2.elements[0] * v1.x + v2.elements[2] * v1.y,
        v2.elements[1] * v1.x + v2.elements[3] * v1.y
      );
    }
    return new Vec2(
      v1.x * v2,
      v1.y * v2
    );
  }

  static div(v1: Vec2, v2: number | Vec2): Vec2 {
    if (v2 instanceof Vec2) {
      return new Vec2(
        v1.x / v2.x,
        v1.y / v2.y
      );
    }
    return new Vec2(
      v1.x / v2,
      v1.y / v2
    );
  }

  static negative(v: Vec2): Vec2 {
    return new Vec2(-v.x, -v.y);
  }

  static get zero(): Vec2 {
    return this.fill(0);
  }

  static get one(): Vec2 {
    return this.fill(1);
  }

  static fill(v: number): Vec2 {
    return new Vec2(v, v);
  }

  static get left(): Vec2 {
    return new Vec2(-1, 0);
  }

  static get right(): Vec2 {
    return new Vec2(1, 0);
  }

  static get down(): Vec2 {
    return new Vec2(0, -1);
  }

  static get up(): Vec2 {
    return new Vec2(0, 1);
  }

  static dot(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  add(v: number | Vec2): Vec2 {
    if (v instanceof Vec2) {
      this.x += v.x;
      this.y += v.y;
    } else {
      this.x += v;
      this.y += v;
    }
    return this;
  }

  sub(v: number | Vec2): Vec2 {
    if (v instanceof Vec2) {
      this.x -= v.x;
      this.y -= v.y;
    } else {
      this.x -= v;
      this.y -= v;
    }
    return this;
  }

  mul(v: number | Vec2 | Mat2): Vec2 {
    if (v instanceof Vec2) {
      this.x *= v.x;
      this.y *= v.y;
    } else if (v instanceof Mat2) {
      const e = v.elements;
      [this.x, this.y] = [
        e[0] * this.x + e[2] * this.y,
        e[1] * this.x + e[3] * this.y
      ];
    } else {
      this.x *= v;
      this.y *= v;
    }
    return this;
  }

  div(v: number | Vec2): Vec2 {
    if (v instanceof Vec2) {
      this.x /= v.x;
      this.y /= v.y;
      return this;
    } else {
      return this.mul(1 / v);
    }
  }

  negative(): Vec2 {
    return this.mul(-1);
  }

  mag(): number {
    return Math.sqrt(this.sqMag());
  }

  sqMag(): number {
    return Vec2.dot(this, this);
  }

  norm(): Vec2 {
    return this.div(this.mag());
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  toVec3(z: number): Vec3 {
    return new Vec3(this.x, this.y, z);
  }

  toVec4(z: number, w: number): Vec4 {
    return new Vec4(this.x, this.y, z, w);
  }

  toArray(): [number, number] {
    return [this.x, this.y];
  }

}