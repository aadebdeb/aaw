import { Vec3 } from './Vec3';
import { Mat3 } from './Mat3';
import { Mat4 } from './Mat4';

export class Quaternion {
  constructor(public x: number, public y: number, public z: number, public w: number) {}

  static identity(): Quaternion {
    return new Quaternion(0, 0, 0, 1);
  }

  static axisAngle(axis: Vec3, radian: number): Quaternion {
    // axis must be normalized.
    const h = 0.5 * radian;
    const s = Math.sin(h);
    return new Quaternion(
      axis.x * s,
      axis.y * s,
      axis.z * s,
      Math.cos(h)
    );
  }

  static lookTo(forward: Vec3, up: Vec3 = Vec3.up): Quaternion {
    // forward and up must be normalized.
    return Quaternion.fromMat(Mat4.lookTo(forward, up));
  }

  static fromMat(mat: Mat4): Quaternion {
   const e = mat.elements;
    const elems = [
      e[0] - e[5] - e[10] + 1.0,
      -e[0] + e[5] - e[10] + 1.0,
      -e[0] - e[5] + e[10] + 1.0,
      e[0] + e[5] + e[10] + 1.0
    ];

    const index = elems.reduce((selected, v, i) => v > elems[selected] ? i : selected, 0);
    const v = Math.sqrt(elems[index]) * 0.5;
    const coef = 0.25 / v;
    if (index == 0) {
      return new Quaternion(
        v,
        (e[1] + e[4]) * coef,
        (e[8] + e[2]) * coef,
        (e[6] - e[9]) * coef
      );
    } else if (index == 1) {
      return new Quaternion(
        (e[1] + e[4]) * coef,
        v,
        (e[6] + e[9]) * coef,
        (e[8] - e[2]) * coef
      );
    } else if (index == 2) {
      return new Quaternion(
        (e[8] + e[2]) * coef,
        (e[6] + e[9]) * coef,
        v,
        (e[1] - e[4]) * coef
      );
    } else if (index == 3) {
      return new Quaternion(
        (e[6] - e[9]) * coef,
        (e[8] - e[2]) * coef,
        (e[1] - e[4]) * coef,
        v
      );
    }
    throw new Error('will not reach here.');
  }

  static add(q1: Quaternion, q2: Quaternion): Quaternion {
    return new Quaternion(
      q1.x + q2.x,
      q1.y + q2.y,
      q1.z + q2.z,
      q1.w + q2.w
    );
  }

  static sub(q1: Quaternion, q2: Quaternion): Quaternion {
    return new Quaternion(
      q1.x - q2.x,
      q1.y - q2.y,
      q1.z - q2.z,
      q1.w - q2.w
    );
  }

  static mul(q1: Quaternion, q2: number | Quaternion): Quaternion {
    if (q2 instanceof Quaternion) {
      return Quaternion.mulQuat(q1, q2);
    }
    return Quaternion.mulNum(q1, q2);
  }

  private static mulNum(q1: Quaternion, q2: number): Quaternion {
    return new Quaternion(
      q1.x * q2,
      q1.y * q2,
      q1.z * q2,
      q1.w * q2
    );
  }

  private static mulQuat(q1: Quaternion, q2: Quaternion): Quaternion {
    return new Quaternion(
      q2.w * q1.x - q2.z * q1.y + q2.y * q1.z + q2.x * q1.w,
      q2.z * q1.x + q2.w * q1.y - q2.x * q1.z + q2.y * q1.w,
      -q2.y * q1.x + q2.x * q1.y + q2.w * q1.z + q2.z * q1.w,
      -q2.x * q1.x - q2.y * q1.y - q2.z * q1.z + q2.w * q1.w
    );
  }

  static conjugate(q: Quaternion): Quaternion {
    return new Quaternion(-q.x, -q.y, -q.z, q.w);
  }

  static inverse(q: Quaternion): Quaternion {
    return Quaternion.conjugate(q).mul(1.0 / q.sqNorm());
  }

  static dot(q1: Quaternion, q2: Quaternion): number {
    return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
  }

  static lerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
    return Quaternion.add(
      Quaternion.mul(q1, 1.0 - t),
      Quaternion.mul(q2, t)
    );
  }

  static slerp(q1: Quaternion, q2: Quaternion, t: number): Quaternion {
    const r = Math.acos(Quaternion.dot(q1, q2));
    const is = 1.0 / Math.sin(r);
    return Quaternion.add(
      Quaternion.mul(q1, Math.sin((1.0 - t) * r) * is),
      Quaternion.mul(q2, Math.sin(t * r) * is)
    );
  }

  add(q: Quaternion): Quaternion {
    this.x += q.x;
    this.y += q.y;
    this.z += q.z;
    this.w += q.w;
    return this;
  }

  sub(q: Quaternion): Quaternion {
    this.x -= q.x;
    this.y -= q.y;
    this.z -= q.z;
    this.w -= q.w;
    return this;
  }

  mul(q: number | Quaternion): Quaternion {
    if (q instanceof Quaternion) {
      return this.mulQuat(q);
    }
    return this.mulNum(q);
  }

  private mulNum(q: number): Quaternion {
    this.x *= q;
    this.y *= q;
    this.z *= q;
    this.w *= q;
    return this;
  }

  private mulQuat(q: Quaternion): Quaternion {
    [this.x, this.y, this.z, this.w] = [
      q.w * this.x - q.z * this.y + q.y * this.z + q.x * this.w,
      q.z * this.x + q.w * this.y - q.x * this.z + q.y * this.w,
      -q.y * this.x + q.x * this.y + q.w * this.z + q.z * this.w,
      -q.x * this.x - q.y * this.y - q.z * this.z + q.w * this.w
    ];
    return this;
  }

  sqNorm(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  norm(): number {
    return Math.sqrt(this.sqNorm());
  }

  rotate(v: Vec3): Vec3 {
    const q = Quaternion.conjugate(this)
      .mul(new Quaternion(v.x, v.y, v.z, 0))
      .mul(this);
    return new Vec3(q.x, q.y, q.z);
  }

  clone(): Quaternion {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  toArray(): [number, number, number, number] {
    return [this.x, this.y, this.z, this.w];
  }

  toMat3(): Mat3 {
    const xx = this.x * this.x;
    const yy = this.y * this.y;
    const zz = this.z * this.z;
    const xy = this.x * this.y;
    const xz = this.x * this.z;
    const xw = this.x * this.w;
    const yz = this.y * this.z;
    const yw = this.y * this.w;
    const zw = this.z * this.w;
    return Mat3.fromElements(new Float32Array([
      1 - 2 * yy - 2 * zz, 2 * xy + 2 * zw, 2 * xz - 2 * yw,
      2 * xy - 2 * zw, 1 - 2 * xx - 2 * zz, 2 * yz + 2 * xw,
      2 * xz + 2 * yw, 2 * yz - 2 * xw, 1 - 2 * xx - 2 * yy
    ]));
  }

  toMat4(): Mat4 {
    const xx = this.x * this.x;
    const yy = this.y * this.y;
    const zz = this.z * this.z;
    const xy = this.x * this.y;
    const xz = this.x * this.z;
    const xw = this.x * this.w;
    const yz = this.y * this.z;
    const yw = this.y * this.w;
    const zw = this.z * this.w;
    return Mat4.fromElements(new Float32Array([
      1 - 2 * yy - 2 * zz, 2 * xy + 2 * zw, 2 * xz - 2 * yw, 0,
      2 * xy - 2 * zw, 1 - 2 * xx - 2 * zz, 2 * yz + 2 * xw, 0,
      2 * xz + 2 * yw, 2 * yz - 2 * xw, 1 - 2 * xx - 2 * yy, 0,
      0, 0, 0, 1
    ]));
  }
}