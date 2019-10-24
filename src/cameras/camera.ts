import { Mat4 } from '../math/Mat4';

export interface Camera {
  readonly viewMat: Mat4;
  readonly projMat: Mat4;
  readonly vpMat: Mat4;
}