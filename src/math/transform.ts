import { Vec3 } from './vec3';
import { Mat4 } from './mat4';
import { Quaternion } from './quaternion';

type ConstructorOptions = {
  translation?: Vec3;
  rotation?: Quaternion;
  scaling?: Vec3;
};

export class Transform {
  private _mat4: Mat4 | null = null;
  private _translation: Vec3;
  private _rotation: Quaternion;
  private _scaling: Vec3;
  constructor({
    translation = Vec3.zero,
    rotation = Quaternion.identity(),
    scaling = Vec3.one,
  }: ConstructorOptions = {}) {
    this._translation = translation.clone();
    this._rotation = rotation.clone();
    this._scaling = scaling.clone();
  }

  get translation(): Vec3 {
    return this._translation.clone();
  }

  get rotation(): Quaternion {
    return this._rotation.clone();
  }

  get scaling(): Vec3 {
    return this._scaling.clone();
  }

  set translation(translation: Vec3) {
    this._translation = translation.clone();
    this._mat4 = null;
  }

  set rotation(rotation: Quaternion) {
    this._rotation = rotation.clone();
    this._mat4 = null;
  }

  set scaling(scaling: Vec3) {
    this._scaling = scaling.clone();
    this._mat4 = null;
  }

  static identity(): Transform {
    const transform =  new Transform();
    transform._mat4 = Mat4.identity();
    return transform;
  }

  static translate(x: number | Vec3, y?: number, z?: number): Transform {
    let t;
    if (x instanceof Vec3) {
      t = x.clone();
    } else if (y !== undefined && z !== undefined) {
      t = new Vec3(x, y, z);
    } else {
      throw new Error('unsupported combination of args.');
    }
    const transform = new Transform({translation: t});
    transform._mat4 = Mat4.translate(x, y, z);
    return transform;
  }

  static scale(x: number | Vec3, y?: number, z?: number): Transform {
    let r;
    if (x instanceof Vec3) {
      r = x.clone();
    } else if (y !== undefined && z !== undefined) {
      r = new Vec3(x, y, z);
    }
    const transform = new Transform({scaling: r});
    transform._mat4 = Mat4.scale(x, y, z);
    return transform;
  }

  static rotate(q: Quaternion): Transform {
    return new Transform({rotation: q});
  }
 
  static lookAt(origin: Vec3, target: Vec3, up: Vec3 = Vec3.up): Transform {
    const forward = Vec3.sub(target, origin).norm();
    return new Transform({
      translation: origin.clone(),
      rotation: Quaternion.lookTo(forward, up)
    });
  }

  translate(x: number, y: number, z: number): Transform {
    this.translation.add(new Vec3(x, y, z));
    this._mat4 = null;
    return this;
  }

  scale(x: number, y: number, z: number): Transform {
    this.scaling.mul(new Vec3(x, y, z));
    this._mat4 = null;
    return this;
  }

  rotate(q: Quaternion): Transform {
    this.rotation.mul(q);
    this._mat4 = null;
    return this;
  }

  lookAt(origin: Vec3, target: Vec3, up: Vec3 = Vec3.up): Transform {
    const forward = Vec3.sub(target, origin).norm();
    this._translation = origin.clone();
    this._rotation = Quaternion.lookTo(forward, up);
    this._mat4 = null;
    return this;
  }

  get mat4(): Mat4 {
    if (this._mat4 === null) {
      this._mat4 = Mat4.mul(Mat4.translate(this.translation.x, this.translation.y, this.translation.z), Mat4.scale(this.scaling.x, this.scaling.y, this.scaling.z));
    }
    return this._mat4;
  }
}