import { Mat4 } from '../math/mat4';
import { Transform } from '../math/transform';
import { Camera } from './camera';

type ConstructorOptions = {
  aspect?: number,
  vfov?: number,
  near?: number,
  far?: number
}

export class PerspectiveCamera extends Transform implements Camera {
  _aspect: number;
  _vfov: number;
  _near: number;
  _far: number;
  _viewMat: Mat4 | null = null;
  _projMat: Mat4 | null = null;
  _vpMat: Mat4 | null = null;
  constructor({
    aspect = 1.77777,
    vfov = 60,
    near = 0.1,
    far = 1000,
  }: ConstructorOptions = {}) {
    super();
    this._aspect = aspect;
    this._vfov = vfov;
    this._near = near;
    this._far = far;
  }

  get aspect(): number {
    return this._aspect;
  }

  get vfov(): number {
    return this._vfov;
  }

  get near(): number {
    return this._near;
  }

  get far(): number {
    return this._far;
  }

  set aspect(aspect: number) {
    this._aspect = aspect;
    this._projMat = null;
  }

  set vfov(vfov: number) {
    this._vfov = vfov;
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
      this._projMat = Mat4.perspective(this._aspect, this._vfov, this._near, this._far);
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