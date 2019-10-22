import { Vec3 } from './vec3';
import { isNumber } from './utils';

export class Mat4 {

  private constructor(private _mat4: _Mat4) {}

  static identity(): Mat4 {
    return new Mat4(_IdentityMat4.instance);
  }

  static fromElements(elements: Float32Array): Mat4 {
    return new Mat4(new _Mat4(elements));
  }

  static translate(x: number | Vec3, y?: number, z?: number): Mat4 {
    if (x instanceof Vec3 && y === undefined && z === undefined) {
      return new Mat4(new _TranslateMat4(x.x, x.y, x.z));
    } else if (isNumber(x) && y !== undefined && z !== undefined) {
      return new Mat4(new _TranslateMat4(x, y, z));
    }
    throw new Error('unsupported combination of args.');
  }

  static scale(x: number | Vec3, y?: number, z?: number): Mat4 {
    if (x instanceof Vec3 && y === undefined && z === undefined) {
      return new Mat4(new _ScaleMat4(x.x, x.y, x.z));
    } else if (isNumber(x) && y !== undefined && z !== undefined) {
      return new Mat4(new _ScaleMat4(x, y, z));
    }
    throw new Error('unsupported combination of args.');
  }

  static rotateX(radian: number): Mat4 {
    return new Mat4(new _RotateXMat4(radian));
  }

  static rotateY(radian: number): Mat4 {
    return new Mat4(new _RotateYMat4(radian));
  }

  static rotateZ(radian: number): Mat4 {
    return new Mat4(new _RotateZMat4(radian));
  }

  static basis(x: Vec3, y: Vec3, z: Vec3): Mat4 {
    return new Mat4(new _Mat4(new Float32Array([
      x.x, x.y, x.z, 0.0,
      y.x, y.y, y.z, 0.0,
      z.x, z.y, z.z, 0.0,
      0.0, 0.0, 0.0, 1.0
    ])));
  }

  static perspective(aspect: number, vfov: number, near: number, far: number): Mat4 {
    const theta = vfov * Math.PI / 180.0;
    const t = near * Math.tan(theta * 0.5);
    const r = aspect * t;
    const fpn = far + near;
    const fmn = far - near;

    return new Mat4(new _Mat4(new Float32Array([
      near / r, 0.0, 0.0, 0.0,
      0.0, near / t, 0.0, 0.0,
      0.0, 0.0, -fpn / fmn, -1.0,
      0.0, 0.0, -2.0 * far * near / fmn, 0.0
    ])));
  }

  static orthographic(width: number, height: number, near: number, far: number): Mat4 {
    const invFmn = 1.0 / (far - near);
    return new Mat4(new _Mat4(new Float32Array([
      2.0 / width, 0.0, 0.0, 0.0,
      0.0, 2.0 / height, 0.0, 0.0,
      0.0, 0.0, -2.0 * invFmn, 0.0,
      0.0, 0.0, -(far + near) * invFmn, 1.0 
    ])));
  }

  static lookTo(forward: Vec3, up: Vec3 = Vec3.up): Mat4 {
    const z = forward.negative();
    const x =  Vec3.cross(up, z).norm();
    const y = Vec3.cross(z, x);
    return Mat4.basis(x, y, z);
  }

  static mul(m1: Mat4, m2: Mat4, ...ms: Mat4[]): Mat4 {
    return new Mat4(_Mat4.mul(m1._mat4, m2._mat4, ...(ms.map(m => m._mat4))));
  }

  get elements(): Float32Array {
    return this._mat4.elements;
  }

  get determinant(): number {
    return this._mat4.determinant;
  }

  get inversed(): Mat4 {
    return new Mat4(this._mat4.inversed);
  }

  get transposed(): Mat4 {
    return new Mat4(this._mat4.transposed);
  }

  get normal(): Mat4 {
    return new Mat4(this._mat4.normal);
  }
}

type _Mat4ConstructorOptions = {
  determinant?: number | null,
  inversed?: _Mat4 | null,
  transposed?: _Mat4 | null,
  normal?: _Mat4 | null,
}

class _Mat4 {
  protected _determinant: number | null = null;
  protected _inversed: _Mat4 | null = null;
  protected _transposed: _Mat4 | null = null;
  protected _normal: _Mat4 | null = null;
  constructor(readonly elements: Float32Array, options: _Mat4ConstructorOptions = {}) {
    this._determinant = options.determinant !== undefined ? options.determinant : null;
    this._inversed = options.inversed !== undefined ? options.inversed : null;
    this._transposed = options.transposed !== undefined ? options.transposed : null;
    this._normal = options.normal !== undefined ? options.normal : null;
  }

  get determinant(): number {
    if (this._determinant === null) {
      const e = this.elements;
      this._determinant = e[0] * (e[5] * e[10] * e[15] + e[9] * e[14] * e[7] + e[13] * e[6] * e[11] - e[13] * e[10] * e[7] - e[9] * e[6] * e[15] - e[5] * e[14] * e[11])
        - e[4] * (e[1] * e[10] * e[15] + e[9] * e[14] * e[3] + e[13] * e[2] * e[11] - e[13] * e[10] * e[3] - e[9] * e[2] * e[15] - e[1] * e[14] * e[11])
        + e[8] * (e[1] * e[6] * e[15] + e[5] * e[14] * e[3] + e[13] * e[2] * e[7] - e[13] * e[6] * e[3] - e[5] * e[2] * e[15] - e[1] * e[14] * e[7])
        - e[8] * (e[1] * e[6] * e[11] + e[5] * e[10] * e[3] + e[9] * e[2] * e[7] - e[9] * e[6] * e[3] - e[5] * e[2] * e[11] - e[1] * e[10] * e[7]);
    }
    return this._determinant;
  }

  get inversed(): _Mat4 {
    if (this._inversed === null) {
      const d = this.determinant;
      if (Math.abs(d) <= 0.0) {
        throw new Error('not invertiable');
      }
      const invD = 1.0 / d;
      const e = this.elements;
      this._inversed = new _Mat4(new Float32Array([
        (e[5] * e[10] * e[15] + e[9] * e[14] * e[7] + e[13] * e[6] * e[11]
          - e[13] * e[10] * e[7] - e[9] * e[6] * e[15] - e[5] * e[14] * e[11]) * invD,
        -(e[1] * e[10] * e[15] + e[9] * e[14] * e[3] + e[13] * e[2] * e[11]
          - e[13] * e[10] * e[3] - e[9] * e[2] * e[15] - e[1] * e[14] * e[11]) * invD,
        (e[1] * e[6] * e[15] + e[5] * e[14] * e[3] + e[13] * e[2] * e[7]
          - e[13] * e[6] * e[3] - e[5] * e[2] * e[15] - e[1] * e[14] * e[7]) * invD,
        -(e[1] * e[6] * e[11] + e[5] * e[10] * e[3] + e[9] * e[2] * e[7]
          - e[9] * e[6] * e[3] - e[5] * e[2] * e[11] - e[1] * e[10] * e[7]) * invD,
        -(e[4] * e[10] * e[15] + e[8] * e[14] * e[7] + e[12] * e[6] * e[11]
          - e[12] * e[10] * e[7] - e[8] * e[6] * e[15] - e[4] * e[14] * e[11]) * invD,
        (e[0] * e[10] * e[15] + e[8] * e[14] * e[3] + e[12] * e[2] * e[11]
          - e[12] * e[10] * e[3] - e[8] * e[2] * e[15] - e[0] * e[14] * e[11]) * invD,
        -(e[0] * e[6] * e[15] + e[4] * e[14] * e[3] + e[12] * e[2] * e[7]
          - e[12] * e[6] * e[3] - e[4] * e[2] * e[15] - e[0] * e[14] * e[7]) * invD,
        (e[0] * e[6] * e[11] + e[4] * e[10] * e[3] + e[8] * e[2] * e[7]
          - e[8] * e[6] * e[3] - e[4] * e[2] * e[11] - e[0] * e[10] * e[7]) * invD,
        (e[4] * e[9] * e[15] + e[8] * e[13] * e[7] + e[12] * e[5] * e[11]
          - e[12] * e[9] * e[7] - e[8] * e[5] * e[15] - e[4] * e[13] * e[11]) * invD,
        -(e[0] * e[9] * e[15] + e[8] * e[13] * e[3] + e[12] * e[1] * e[11]
          - e[12] * e[9] * e[3] - e[8] * e[1] * e[15] - e[0] * e[13] * e[11]) * invD,
        (e[0] * e[5] * e[15] + e[4] * e[13] * e[3] + e[12] * e[1] * e[7]
          - e[12] * e[5] * e[3] - e[4] * e[1] * e[15] - e[0] * e[13] * e[7]) * invD,
        -(e[0] * e[5] * e[11] + e[4] * e[9] * e[3] + e[8] * e[1] * e[7]
          - e[8] * e[5] * e[3] - e[4] * e[1] * e[11] - e[0] * e[9] * e[7]) * invD,
        -(e[4] * e[9] * e[14] + e[8] * e[13] * e[6] + e[12] * e[5] * e[10]
          - e[12] * e[9] * e[6] - e[8] * e[5] * e[14] - e[4] * e[13] * e[10]) * invD,
        (e[0] * e[9] * e[14] + e[8] * e[13] * e[2] + e[12] * e[1] * e[10]
          - e[12] * e[9] * e[2] - e[8] * e[1] * e[14] - e[0] * e[13] * e[10]) * invD,
        -(e[0] * e[5] * e[14] + e[4] * e[13] * e[2] + e[12] * e[1] * e[6]
          - e[12] * e[5] * e[2] - e[4] * e[1] * e[14] - e[0] * e[13] * e[6]) * invD,
        (e[0] * e[5] * e[10] + e[4] * e[9] * e[2] + e[8] * e[1] * e[6]
          - e[8] * e[5] * e[2] - e[4] * e[1] * e[10] - e[0] * e[9] * e[6]) * invD
      ]), {inversed: this});
    }
    return this._inversed;
  }

  get normal(): _Mat4 {
    if (this._normal === null) {
      this._normal = this.inversed.transposed;
    }
    return this._normal;
  }

  get transposed(): _Mat4 {
    if (this._transposed === null) {
      this._transposed = new _Mat4(new Float32Array([
        this.elements[0], this.elements[4], this.elements[8], this.elements[12],
        this.elements[1], this.elements[5], this.elements[9], this.elements[13],
        this.elements[2], this.elements[6], this.elements[10], this.elements[14],
        this.elements[3], this.elements[7], this.elements[11], this.elements[15]
      ]), {transposed: this});
    }
    return this._transposed;
  }

  static mul(m1: _Mat4, m2: _Mat4, ...ms: _Mat4[]): _Mat4 {
    return ms.reduce((accum, m) => accum._mul(m), m1._mul(m2));
  }

  protected _mul(m: _Mat4): _Mat4 {
    const e1 = this.elements;
    const e2 = m.elements;
    return new _Mat4(new Float32Array([
      e1[0] * e2[0] + e1[1] * e2[4] + e1[2] * e2[8] + e1[3] * e2[12],
      e1[0] * e2[1] + e1[1] * e2[5] + e1[2] * e2[9] + e1[3] * e2[13],
      e1[0] * e2[2] + e1[1] * e2[6] + e1[2] * e2[10] + e1[3] * e2[14],
      e1[0] * e2[3] + e1[1] * e2[7] + e1[2] * e2[11] + e1[3] * e2[15],

      e1[4] * e2[0] + e1[5] * e2[4] + e1[6] * e2[8] + e1[7] * e2[12],
      e1[4] * e2[1] + e1[5] * e2[5] + e1[6] * e2[9] + e1[7] * e2[13],
      e1[4] * e2[2] + e1[5] * e2[6] + e1[6] * e2[10] + e1[7] * e2[14],
      e1[4] * e2[3] + e1[5] * e2[7] + e1[6] * e2[11] + e1[7] * e2[15],

      e1[8] * e2[0] + e1[9] * e2[4] + e1[10] * e2[8] + e1[11] * e2[12],
      e1[8] * e2[1] + e1[9] * e2[5] + e1[10] * e2[9] + e1[11] * e2[13],
      e1[8] * e2[2] + e1[9] * e2[6] + e1[10] * e2[10] + e1[11] * e2[14],
      e1[8] * e2[3] + e1[9] * e2[7] + e1[10] * e2[11] + e1[11] * e2[15],

      e1[12] * e2[0] + e1[13] * e2[4] + e1[14] * e2[8] + e1[15] * e2[12],
      e1[12] * e2[1] + e1[13] * e2[5] + e1[14] * e2[9] + e1[15] * e2[13],
      e1[12] * e2[2] + e1[13] * e2[6] + e1[14] * e2[10] + e1[15] * e2[14],
      e1[12] * e2[3] + e1[13] * e2[7] + e1[14] * e2[11] + e1[15] * e2[15],
    ]));
  }
}

class _IdentityMat4 extends _Mat4 {
  static readonly instance = new _IdentityMat4();

  private constructor() {
    super(new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
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
  get inversed(): _Mat4 {
    return this;
  }

  /**
   * @override
   */
  get transposed(): _Mat4 {
    return this;
  }

  /**
   * @override
   */
  get normal(): _Mat4 {
    return this;
  }

  /**
   * @override
   */
  protected _mul(m: _Mat4): _Mat4 {
    return m;
  }
}

class _TranslateMat4 extends _Mat4 {
  private offset: Vec3;
  constructor(x: number, y: number, z: number) {
    super(new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      x, y, z, 1.0
    ]));
    this.offset = new Vec3(x, y, z);
  }

  get inversed(): _Mat4 {
    if (this._inversed === null) {
      this._inversed = new _Mat4(new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -this.offset.x, -this.offset.y, -this.offset.z, 1.0
      ]), this);
    }
    return this._inversed;
  }
}

class _ScaleMat4 extends _Mat4 {
  private rate: Vec3;
  constructor(x: number, y: number, z: number) {
    super(new Float32Array([
      x, 0.0, 0.0, 0.0,
      0.0, y, 0.0, 0.0,
      0.0, 0.0, z, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]));
    this.rate = new Vec3(x, y, z);
  }

  get inversed(): _Mat4 {
    if (this._inversed === null) {
      this._inversed = new _Mat4(new Float32Array([
        1.0 / this.rate.x, 0.0, 0.0, 0.0,
        0.0, 1.0 / this.rate.y, 0.0, 0.0,
        0.0, 0.0, 1.0 / this.rate.z, 0.0,
        0.0, 0.0, 0.0, 1.0
      ]), {inversed: this});
    }
    return this._inversed;
  }
}

class _RotateXMat4 extends _Mat4 {
  private radian: number;
  constructor(radian: number, inversed?: _Mat4) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1
    ]), {inversed: inversed});
    this.radian = radian;
  }

  get inversed(): _Mat4 {
    if (this._inversed === null) {
      this._inversed = new _RotateXMat4(-this.radian, this);
    }
    return this._inversed;
  }
}

class _RotateYMat4 extends _Mat4 {
  private radian: number;
  constructor(radian: number, inversed?: _Mat4) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1
    ]), {inversed: inversed});
    this.radian = radian;
  }

  get inversed(): _Mat4 {
    if (this._inversed === null) {
      this._inversed = new _RotateYMat4(-this.radian, this);
    }
    return this._inversed;
  }
}

class _RotateZMat4 extends _Mat4 {
  private radian: number;
  constructor(radian: number, inversed?: _Mat4) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      c, s, 0, 0,
      -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]), {inversed: inversed});
    this.radian = radian;
  }

  get inversed(): _Mat4 {
    if (this._inversed === null) {
      this._inversed = new _RotateZMat4(-this.radian, this);
    }
    return this._inversed;
  }
}

