import { Mat4 } from '../math/mat4';

export interface Camera {
  readonly viewMat: Mat4;
  readonly projMat: Mat4;
  readonly vpMat: Mat4;
}