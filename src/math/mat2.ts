import { Vec2 } from './vec2';

export class Mat2 {
  private constructor(private _mat2: _Mat2) {}

  static identity(): Mat2 {
    return new Mat2(_IdentityMat2.instance);
  }

  static fromElements(elements: Float32Array): Mat2 {
    return new Mat2(new _Mat2(elements));
  }

  static scale2d(x: number | Vec2, y?: number): Mat2 {
    if (x instanceof Vec2) {
      return new Mat2(new _Scale2dMat2(x.x, x.y));
    } else if (y !== undefined) {
      return new Mat2(new _Scale2dMat2(x, y));
    }
    throw new Error('unsupported combination of args.');
  }

  static rotate2d(radian: number): Mat2 {
    return new Mat2(new _Rotate2dMat2(radian));
  }

  static basis(x: Vec2, y: Vec2): Mat2 {
    return new Mat2(new _Mat2(new Float32Array([
      x.x, x.y,
      y.x, y.y
    ])));
  }

  static mul(m1: Mat2, m2: Mat2, ...ms: Mat2[]): Mat2 {
    return new Mat2(_Mat2.mul(m1._mat2, m2._mat2, ...(ms.map(m => m._mat2))));
  }

  get elements(): Float32Array {
    return this._mat2.elements;
  }

  get determinant(): number {
    return this._mat2.determinant;
  }

  get inversed(): Mat2 {
    return new Mat2(this._mat2.inversed);
  }

  get transposed(): Mat2 {
    return new Mat2(this._mat2.transposed);
  }
}

type _Mat2ConstructorOptions = {
  determinant?: number | null,
  inversed?: _Mat2 | null,
  transposed?: _Mat2 | null,
}

class _Mat2 {
  protected _determinant: number | null = null;
  protected _inversed: _Mat2 | null = null;
  protected _transposed: _Mat2 | null = null;

  constructor(readonly elements: Float32Array, options: _Mat2ConstructorOptions = {}) {
    this._determinant = options.determinant !== undefined ? options.determinant : null;
    this._inversed = options.inversed !== undefined ? options.inversed : null;
    this._transposed = options.transposed !== undefined ? options.transposed : null;
  }

  static mul(m1: _Mat2, m2: _Mat2, ...ms: _Mat2[]): _Mat2 {
    return ms.reduce((accum, m) => accum.mul(m), m1.mul(m2));
  }

  get determinant(): number {
    if (this._determinant === null) {
      this._determinant = this.elements[0] * this.elements[3] - this.elements[2] * this.elements[1];
    }
    return this._determinant;
  }

  get inversed(): _Mat2 {
    if (this._inversed === null) {
      const invD = 1 / this.determinant;
      this._inversed = new _Mat2(new Float32Array([
        this.elements[3] * invD, -this.elements[2] * invD,
        -this.elements[1] * invD, this.elements[0] * invD
      ]), {inversed: this});
    }
    return this._inversed;
  }

  get transposed(): _Mat2 {
    if (this._transposed === null) {
      this._transposed = new _Mat2(new Float32Array([
        this.elements[0], this.elements[2],
        this.elements[1], this.elements[3]
      ]), {transposed: this});
    }
    return this._transposed;
  }

  protected mul(m: _Mat2): _Mat2 {
    const e1 = this.elements;
    const e2 = m.elements;
    return new _Mat2(new Float32Array([
      e1[0] * e2[0] + e1[1] * e2[2],
      e1[0] * e2[1] + e1[1] * e2[3],
      e1[2] * e2[0] + e1[3] * e2[2],
      e1[2] * e2[1] + e1[3] * e2[3]
    ]));
  }
}

class _IdentityMat2 extends _Mat2 {
  static readonly instance = new _IdentityMat2();

  private constructor() {
    super(new Float32Array([
      1, 0,
      0, 1
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
  get invresed(): _Mat2 {
    return this;
  }

  /**
   * @override
   */
  get transposed(): _Mat2 {
    return this;
  }

  /**
   * @override
   */
  protected mul(m: _Mat2): _Mat2 {
    return m;
  }
}

class _Scale2dMat2 extends _Mat2 {
  private rate: Vec2;
  constructor(x: number, y: number, options: _Mat2ConstructorOptions = {}) {
    super(new Float32Array([
      x, 0,
      0, y
    ]), options);
    this.rate = new Vec2(x, y);
  }

  get inversed(): _Mat2 {
    if (this._inversed === null) {
      this._inversed = new _Scale2dMat2(1 / this.rate.x, 1 / this.rate.y, {inversed: this});
    }
    return this._inversed;
  }

  get transposed(): _Mat2 {
    return this;
  }
}

class _Rotate2dMat2 extends _Mat2 {
  private radian: number;
  constructor(radian: number, options: _Mat2ConstructorOptions = {}) {
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    super(new Float32Array([
      c, s,
      -s, c
    ]), options);
    this.radian = radian;
  }

  get inversed(): _Mat2 {
    if (this._inversed === null) {
      this._inversed = new _Rotate2dMat2(-this.radian, {inversed: this});
    }
    return this._inversed;
  }
}