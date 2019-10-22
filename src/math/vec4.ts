import { Vec2 } from './vec2';
import { Vec3 } from './vec3';
import { Mat4 } from './mat4';
import { isNumber } from './utils';

export function vec4(a: number | Vec2 | Vec3 | Vec4, b?: number, c?: number, d?: number): Vec4 {
  if (isNumber(a)) {
    if (b === undefined && c === undefined && d === undefined) {
      return new Vec4(a, a, a, a);
    }
    if (isNumber(b) && isNumber(c) && isNumber(d)) {
      return new Vec4(a, b, c, d);
    }
  }
  if (a instanceof Vec2 && isNumber(b) && isNumber(c)) {
    return new Vec4(a.x, a.y, b, c);
  }
  if (a instanceof Vec3 && isNumber(b)) {
    return new Vec4(a.x, a.y, a.z, b);
  }
  if (a instanceof Vec4) {
    return new Vec4(a.x, a.y, a.z, a.w);
  }
  throw new Error('unsupported combination of args.');
}

export class Vec4 {
  constructor(public x: number, public y: number, public z: number, public w: number) {}

  static fromElements(array: [number, number, number, number]): Vec4 {
    return new Vec4(array[0], array[1], array[2], array[3]);
  }

  static add(v1: Vec4, v2: number | Vec4): Vec4 {
    if (v2 instanceof Vec4) {
      return new Vec4(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z,
        v1.w + v2.w
      );
    }
    return new Vec4(
      v1.x + v2,
      v1.y + v2,
      v1.z + v2,
      v1.w + v2
    );
  }

  static sub(v1: Vec4, v2: number | Vec4): Vec4 {
    if (v2 instanceof Vec4) {
      return new Vec4(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z,
        v1.w - v2.w
      );
    }
    return new Vec4(
      v1.x - v2,
      v1.y - v2,
      v1.z - v2,
      v1.w - v2
    );
  }

  static mul(v1: Vec4, v2: number | Vec4 | Mat4): Vec4 {
    if (v2 instanceof Vec4) {
      return new Vec4(
        v1.x * v2.x,
        v1.y * v2.y,
        v1.z * v2.z,
        v1.w * v2.w
      );
    } else if (v2 instanceof Mat4) {
      return new Vec4(
        v2.elements[0] * v1.x + v2.elements[4] * v1.y + v2.elements[8] * v1.z + v2.elements[12] * v1.w,
        v2.elements[1] * v1.x + v2.elements[5] * v1.y + v2.elements[9] * v1.z + v2.elements[13] * v1.w,
        v2.elements[2] * v1.x + v2.elements[6] * v1.y + v2.elements[10] * v1.z + v2.elements[14] * v1.w,
        v2.elements[3] * v1.x + v2.elements[7] * v1.y + v2.elements[11] * v1.z + v2.elements[15] * v1.w
      );
    }
    return new Vec4(
      v1.x * v2,
      v1.y * v2,
      v1.z * v2,
      v1.w * v2
    );
  }

  static div(v1: Vec4, v2: number | Vec4): Vec4 {
    if (v2 instanceof Vec4) {
      return new Vec4(
        v1.x / v2.x,
        v1.y / v2.y,
        v1.z / v2.z,
        v1.w / v2.w
      );
    }
    return new Vec4(
      v1.x / v2,
      v1.y / v2,
      v1.z / v2,
      v1.w / v2
    );
  }

  static negative(v: Vec4) {
    return new Vec4(-v.x, -v.y, -v.z, -v.w);
  }

  static get zero(): Vec4 {
    return this.fill(0);
  }

  static get one(): Vec4 {
    return this.fill(1);
  }

  static fill(v: number): Vec4 {
    return new Vec4(v, v, v, v);
  }

  static get left(): Vec4 {
    return new Vec4(-1, 0, 0, 0);
  }

  static get right(): Vec4 {
    return new Vec4(1, 0, 0, 0);
  }

  static get down(): Vec4 {
    return new Vec4(0, -1, 0, 0);
  }

  static get up(): Vec4 {
    return new Vec4(0, 1, 0, 0);
  }

  static get forward(): Vec4 {
    return new Vec4(0, 0, -1, 0);
  }

  static get backward(): Vec4 {
    return new Vec4(0, 0, 1, 0);
  }

  static dot(v1: Vec4, v2: Vec4): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
  }

  add(v: number | Vec4): Vec4 {
    if (v instanceof Vec4) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      this.w += v.w;
    } else {
      this.x += v;
      this.y += v;
      this.z += v;
      this.w += v;
    }
    return this;
  }

  sub(v: number | Vec4): Vec4 {
    if (v instanceof Vec4) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      this.w -= v.w;
    } else {
      this.x -= v;
      this.y -= v;
      this.z -= v;
      this.w -= v;
    }
    return this;
  }

  mul(v: number | Vec4 | Mat4): Vec4 {
    if (v instanceof Vec4) {
      return this.mulVec4(v);
    } else if (v instanceof Mat4) {
      return this.mulMat4(v);
    }
    return this.mulNum(v);
  }

  
  private mulNum(v: number): Vec4 {
    this.x *= v;
    this.y *= v;
    this.z *= v;
    this.w *= v;
    return this;
  }

  private mulVec4(v: Vec4): Vec4 {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }

  private mulMat4(v: Mat4): Vec4 {
    const e = v.elements;
    [this.x, this.y, this.z, this.w] = [
      e[0] * this.x + e[4] * this.y + e[8] * this.z + e[12] * this.w,
      e[1] * this.x + e[5] * this.y + e[9] * this.z + e[13] * this.w,
      e[2] * this.x + e[6] * this.y + e[10] * this.z + e[14] * this.w,
      e[3] * this.x + e[7] * this.y + e[11] * this.z + e[15] * this.w
    ];
    return this;
  }

  div(v: number | Vec4): Vec4 {
    if (v instanceof Vec4) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      this.w /= v.w;
      return this;
    } else {
      return this.mul(1 / v);
    }
  }

  negative(): Vec4 {
    return this.mul(-1);
  }

  mag(): number {
    return Math.sqrt(this.sqMag());
  }

  sqMag(): number {
    return Vec4.dot(this, this);
  }

  norm(): Vec4 {
    return this.div(this.mag());
  }

  clone(): Vec4 {
    return new Vec4(this.x, this.y, this.z, this.w);
  }

  toVec2(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  toVec3(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  toArray(): [number, number, number, number] {
    return [this.x, this.y, this.z, this.w];
  }
}