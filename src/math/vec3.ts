import { Vec2 } from './vec2';
import { Vec4 } from './vec4';
import { Mat3 } from './mat3';
import { isNumber } from './utils';

export function vec3(a: number | Vec2 | Vec3, b?: number, c?: number): Vec3 {
  if (isNumber(a)) {
    if (b === undefined && c === undefined) {
      return new Vec3(a, a, a);
    }
    if (isNumber(b) && isNumber(c)) {
      return new Vec3(a, b, c);
    }
  }
  if (a instanceof Vec2 && isNumber(b) && c === undefined) {
    return new Vec3(a.x, a.y, b);
  }
  if (a instanceof Vec3) {
    return new Vec3(a.x, a.y, a.z);
  }

  throw new Error('unsupported combination of args.');
}

export class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}

  static fromArray(array: [number, number, number]): Vec3 {
    return new Vec3(array[0], array[1], array[2]);
  }

  static add(v1: Vec3, v2: number | Vec3): Vec3 {
    if (v2 instanceof Vec3) {
      return new Vec3(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z
      );
    }
    return new Vec3(
      v1.x + v2,
      v1.y + v2,
      v1.z + v2
    );
  }

  static sub(v1: Vec3, v2: number | Vec3): Vec3 {
    if (v2 instanceof Vec3) {
      return new Vec3(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z
      );
    }
    return new Vec3(
      v1.x - v2,
      v1.y - v2,
      v1.z - v2
    );
  }

  static mul(v1: Vec3, v2: number | Vec3 | Mat3): Vec3 {
    if (v2 instanceof Vec3) {
      return new Vec3(
        v1.x * v2.x,
        v1.y * v2.y,
        v1.z * v2.z
      );
    } else if (v2 instanceof Mat3) {
      return new Vec3(
        v2.elements[0] * v1.x + v2.elements[3] * v1.y + v2.elements[6] * v1.z,
        v2.elements[1] * v1.x + v2.elements[4] * v1.y + v2.elements[7] * v1.z,
        v2.elements[2] * v1.x + v2.elements[5] * v1.y + v2.elements[8] * v1.z
      );
    }
    return new Vec3(
      v1.x * v2,
      v1.y * v2,
      v1.z * v2
    );
  }

  static div(v1: Vec3, v2: number | Vec3): Vec3 {
    if (v2 instanceof Vec3) {
      return new Vec3(
        v1.x / v2.x,
        v1.y / v2.y,
        v1.z / v2.z
      );
    }
    return new Vec3(
      v1.x / v2,
      v1.y / v2,
      v1.z / v2
    );
  }

  static negative(v: Vec3): Vec3 {
    return new Vec3(-v.x, -v.y, -v.z);
  }

  static get zero(): Vec3 {
    return this.fill(0);
  }

  static get one(): Vec3 {
    return this.fill(1);
  }

  static fill(v: number): Vec3 {
    return new Vec3(v, v, v);
  }

  static get left(): Vec3 {
    return new Vec3(-1, 0, 0);
  }

  static get right(): Vec3 {
    return new Vec3(1, 0, 0);
  }

  static get down(): Vec3 {
    return new Vec3(0, -1, 0);
  }

  static get up(): Vec3 {
    return new Vec3(0, 1, 0);
  }

  static get forward(): Vec3 {
    return new Vec3(0, 0, -1);
  }

  static get backward(): Vec3 {
    return new Vec3(0, 0, 1);
  }

  static dot(v1: Vec3, v2: Vec3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  static cross(v1: Vec3, v2: Vec3): Vec3 {
    return new Vec3(
      v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x
    );
  }

  add(v: number | Vec3): Vec3 {
    if (v instanceof Vec3) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    } else {
      this.x += v;
      this.y += v;
      this.z += v;
    }
    return this;
  }

  sub(v: number | Vec3): Vec3 {
    if (v instanceof Vec3) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
    } else {
      this.x -= v;
      this.y -= v;
      this.z -= v;
    }
    return this;
  }

  mul(v: number | Vec3 | Mat3): Vec3 {
    if (v instanceof Vec3) {
      return this.mulVec3(v);
    } else if (v instanceof Mat3) {
      return this.mulMat3(v);
    }
    return this.mulNum(v);
  }

  private mulNum(v: number): Vec3 {
    this.x *= v;
    this.y *= v;
    this.z *= v;
    return this;
  }

  private mulVec3(v: Vec3): Vec3 {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }

  private mulMat3(v: Mat3): Vec3 {
    const e = v.elements;
    [this.x, this.y, this.z] = [
      e[0] * this.x + e[3] * this.y + e[6] * this.z,
      e[1] * this.x + e[4] * this.y + e[7] * this.z,
      e[2] * this.x + e[5] * this.y + e[8] * this.z
    ];
    return this;
  }

  div(v: number | Vec3): Vec3 {
    if (v instanceof Vec3) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    } else {
      return this.mul(1 / v);
    }
  }

  negative(): Vec3 {
    return this.mul(-1);
  }

  mag(): number {
    return Math.sqrt(this.sqMag());
  }

  sqMag(): number {
    return Vec3.dot(this, this);
  }

  norm(): Vec3 {
    return this.div(this.mag());
  }

  clone(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  toVec2(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  toVec4(w: number): Vec4 {
    return new Vec4(this.x, this.y, this.z, w);
  }

  toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }
}