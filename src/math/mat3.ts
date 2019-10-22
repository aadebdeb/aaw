import { Vec2 } from './vec2';
import { Vec3 } from './vec3';
import { isNumber } from './utils';

export class Mat3 {
  private constructor(private _mat3: _Mat3) {}

  static identity(): Mat3 {
    return new Mat3(_IdentityMat3.instance);
  }

  static fromElements(elements: Float32Array): Mat3 {
    return new Mat3(new _Mat3(elements));
  }

  static translate2d(x: number | Vec2, y?: number): Mat3 {
    if (x instanceof Vec2 && y === undefined) {
      return new Mat3(new _Translate2dMat3(x.x, x.y));
    } else if (isNumber(x) && y !== undefined) {
      return new Mat3(new _Translate2dMat3(x, y));
    }
    throw new Error('unsupported combination of args.');
  }

  static scale2d(x: number | Vec2, y?: number): Mat3 {
    if (x instanceof Vec2 && y === undefined) {
      return new Mat3(new _Scale2dMat3(x.x, x.y));
    } else if (isNumber(x) && y !== undefined) {
      return new Mat3(new _Scale2dMat3(x, y));
    }
    throw new Error('unsupported combination of args.');
  };

  static rotate2d(radian: number): Mat3 {
    return new Mat3(new _Rotate2dMat3(radian));
  }

  static scale(x: number | Vec3, y: number, z: number): Mat3 {
    if (x instanceof Vec3 && y === undefined && z === undefined) {
      return new Mat3(new _ScaleMat3(x.x, x.y, x.z));
    } else if (isNumber(x) && y !== undefined && z !== undefined) {
      return new Mat3(new _ScaleMat3(x, y, z));
    }
    throw new Error('unsupported combination of args.');
  }

  static rotateX(radian: number): Mat3 {
    return new Mat3(new _RotateXMat3(radian));
  }

  static rotateY(radian: number): Mat3 {
    return new Mat3(new _RotateYMat3(radian));
  }

  static rotateZ(radian: number): Mat3 {
    return new Mat3(new _RotateZMat3(radian));
  }

  static basis(x: Vec3, y: Vec3, z: Vec3): Mat3 {
    return new Mat3(new _Mat3(new Float32Array([
      x.x, x.y, x.z,
      y.x, y.y, y.z,
      z.x, z.y, z.z
    ])));
  }

  static lookTo(forward: Vec3, up: Vec3 = Vec3.up): Mat3 {
    const z = forward.negative();
    const x =  Vec3.cross(up, z).norm();
    const y = Vec3.cross(z, x);
    return Mat3.basis(x, y, z);
  }

  static mul(m1: Mat3, m2: Mat3, ...ms: Mat3[]): Mat3 {
    return new Mat3(_Mat3.mul(m1._mat3, m2._mat3, ...(ms.map(m => m._mat3))));
  }

  get elements(): Float32Array {
    return this._mat3.elements;
  }

  get determinant(): number {
    return this._mat3.determinant;
  }

  get inversed(): Mat3 {
    return new Mat3(this._mat3.inversed);
  }

  get transposed(): Mat3 {
    return new Mat3(this._mat3.transposed);
  }
}

type _Mat3ConstructorOptions = {
  determinant?: number | null,
  inversed?: _Mat3 | null,
  transposed?: _Mat3 | null,
  normal?: _Mat3 | null,
}

class _Mat3 {
  protected _determinant: number | null = null;
  protected _inversed: _Mat3 | null = null;
  protected _transposed: _Mat3 | null = null;
  constructor(readonly elements: Float32Array, {
    determinant = null,
    inversed = null,
    transposed = null,
  }: _Mat3ConstructorOptions = {}) {
    this._determinant = determinant;
    this._inversed = inversed;
    this._transposed = transposed;
  }

  get determinant(): number {
    if (this._determinant === null) {
      const e = this.elements;
      this._determinant = e[0] * e[4] * e[8] + e[3] * e[7] * e[2] + e[6] * e[1] * e[5]
        - e[6] * e[4] * e[2] - e[3] * e[1] * e[8] - e[0] * e[7] * e[5];
    }
    return this._determinant;
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      const d = this.determinant;
      if (Math.abs(d) < 0.0) {
        throw new Error('not invertiable');
      }
      const invD = 1.0 / d;
      const e = this.elements;
      this._inversed = new _Mat3(new Float32Array([
        (e[4] * e[8] - e[7] * e[5]) * invD,
        -(e[1] * e[8] - e[7] * e[2]) * invD,
        (e[1] * e[5] - e[4] * e[2]) * invD,
        -(e[3] * e[8] - e[6] * e[4]) * invD,
        (e[0] * e[8] - e[6] * e[2]) * invD,
        -(e[0] * e[5] - e[3] * e[2]) * invD,
        (e[3] * e[7] - e[6] * e[4]) * invD,
        -(e[0] * e[7] - e[6] * e[1]) * invD,
        (e[0] * e[4] - e[3] * e[1]) * invD
      ]), {inversed: this});
    }
    return this._inversed;
  }

  get transposed(): _Mat3 {
    const e = this.elements;
    return new _Mat3(new Float32Array([
      e[0], e[3], e[6],
      e[1], e[4], e[7],
      e[2], e[5], e[8]
    ]), {transposed: this});
  }

  static mul(m1: _Mat3, m2: _Mat3, ...ms: _Mat3[]): _Mat3 {
    return ms.reduce((accum, m) => accum._mul(m), m1._mul(m2));
  }

  protected _mul(m: _Mat3): _Mat3 {
    const e1 = this.elements;
    const e2 = m.elements;
    return new _Mat3(new Float32Array([
      e1[0] * e2[0] + e1[1] * e2[3] + e1[2] * e2[6],
      e1[0] * e2[1] + e1[1] * e2[4] + e1[2] * e2[7],
      e1[0] * e2[2] + e1[1] * e2[5] + e1[2] * e2[8],

      e1[3] * e2[0] + e1[4] * e2[3] + e1[5] * e2[6],
      e1[3] * e2[1] + e1[4] * e2[4] + e1[5] * e2[7],
      e1[3] * e2[2] + e1[4] * e2[5] + e1[5] * e2[8],

      e1[6] * e2[0] + e1[7] * e2[3] + e1[8] * e2[6],
      e1[6] * e2[1] + e1[7] * e2[4] + e1[8] * e2[7],
      e1[6] * e2[2] + e1[7] * e2[5] + e1[8] * e2[8]
    ]));
  }
}

class _IdentityMat3 extends _Mat3 {
  static readonly instance = new _IdentityMat3();

  private constructor() {
    super(new Float32Array([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]));
  }

  /**
   * @override
   */
  get determinant(): number {
    return 1;
  }

  /**
   * @override
   */
  get inversed(): _Mat3 {
    return this;
  }

  /**
   * @override
   */
  get transposed(): _Mat3 {
    return this;
  }

  /**
   * @override
   */
  protected _mul(m: _Mat3): _Mat3 {
    return m;
  }
}

class _Translate2dMat3 extends _Mat3 {
  private offset: Vec2;
  constructor(x: number, y: number, options: _Mat3ConstructorOptions = {}) {
    super(new Float32Array([
      1, 0, 0,
      0, 1, 0,
      x, y, 1 
    ]), options);
    this.offset = new Vec2(x, y);
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _Mat3(new Float32Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        -this.offset.x, -this.offset.y, 1
      ]), {inversed: this});
    }
    return this._inversed;
  }
}

class _Scale2dMat3 extends _Mat3 {
  private rate: Vec2;
  constructor(x: number, y: number, options: _Mat3ConstructorOptions = {}) {
    super(new Float32Array([
      x, 0, 0,
      0, y, 0,
      0, 0, 1
    ]), options);
    this.rate = new Vec2(x, y);
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _Mat3(new Float32Array([
        1 / this.rate.x, 0, 0,
        0, 1 / this.rate.y, 0,
        0, 0,1
      ]), {inversed: this});
    }
    return this._inversed;
  }
}

class _Rotate2dMat3 extends _Mat3 {
  private radian: number;
  constructor(radian: number, options: _Mat3ConstructorOptions = {})  {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      c, s, 0,
      -s, c, 0,
      0, 0, 1
    ]), options);
    this.radian = radian;
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _Rotate2dMat3(-this.radian, {inversed: this});
    }
    return this._inversed;
  }
}

class _ScaleMat3 extends _Mat3 {
  private rate: Vec3;
  constructor(x: number, y: number, z: number, options: _Mat3ConstructorOptions = {}) {
    super(new Float32Array([
      x, 0, 0,
      0, y, 0,
      0, 0, z 
    ]), options);
    this.rate = new Vec3(x, y, z);
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _ScaleMat3(1 / this.rate.x, 1 / this.rate.y, 1 / this.rate.z, {inversed: this});
    }
    return this._inversed;
  }
}

class _RotateXMat3 extends _Mat3 {
  private radian: number;
  constructor(radian: number, options: _Mat3ConstructorOptions = {}) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      1, 0, 0,
      0, c, s,
      0, -s, c
    ]), options);
    this.radian = radian;
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _RotateXMat3(-this.radian, {inversed: this});
    }
    return this._inversed;
  }
}

class _RotateYMat3 extends _Mat3 {
  private radian: number;
  constructor(radian: number, options: _Mat3ConstructorOptions = {}) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      c, 0, -s,
      0, 1, 0,
      s, 0, c
    ]), options);
    this.radian = radian;
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _RotateYMat3(-this.radian, {inversed: this});
    }
    return this._inversed;
  }
}

class _RotateZMat3 extends _Mat3 {
  private radian: number;
  constructor(radian: number, options: _Mat3ConstructorOptions = {}) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      c, s, 0,
      -s, c, 0,
      0, 0, 1
    ]), options);
    this.radian = radian;
  }

  get inversed(): _Mat3 {
    if (this._inversed === null) {
      this._inversed = new _RotateZMat3(-this.radian, {inversed: this});
    }
    return this._inversed;
  }
}

