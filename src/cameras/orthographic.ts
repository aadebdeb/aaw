import { Mat4 } from '../math/mat4';
import { Transform } from '../math/transform';
import { Camera } from './camera';

type ConstructorOptions = {
  width?: number,
  height?: number,
  near?: number,
  far?: number,
}

export class OrthographicCamera extends Transform implements Camera {
  _width: number;
  _height: number;
  _near: number;
  _far: number;
  _viewMat: Mat4 | null = null;
  _projMat: Mat4 | null = null;
  _vpMat: Mat4 | null = null;
  constructor({
    width = 100,
    height = 100,
    near = 0.1,
    far = 1000
  }: ConstructorOptions = {}) {
    super();
    this._width = width;
    this._height = height;
    this._near = near;
    this._far = far;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get near(): number {
    return this._near;
  }

  get far(): number {
    return this._far;
  }

  set width(width: number) {
    this._width = width;
    this._projMat = null;
  }

  set height(height: number) {
    this._height = height;
    this._projMat = null;
  }

  set near(near: number) {
    this._near = near;
    this._projMat = null; 
  }

  set far(far: number) {
    this._far = far;
    this._projMat = null;
  }

  get viewMat(): Mat4 {
    if (this._viewMat === null || this._viewMat !== this.mat.inversed) {
      this._viewMat = this.mat.inversed;
      this._vpMat = null;
    }
    return this._viewMat;
  }

  get projMat(): Mat4 {
    if (this._projMat === null) {
      this._projMat = Mat4.orthographic(this._width, this._height, this._near, this._far);
    }
    return this._projMat;
  }

  get vpMat(): Mat4 {
    if (this._vpMat === null) {
      this._vpMat = Mat4.mul(this.viewMat, this.projMat);
    }
    return this._vpMat;
  }
}