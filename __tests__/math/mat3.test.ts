import { Vec2 } from '../../src/math/vec2';
import { Vec3 } from '../../src/math/Vec3';
import { Mat3 } from '../../src/math/mat3';
import { equalVec3, equalMat3, CLOSE_DIGITS } from './utils';

test('Mat3.identity', () => {
  const actual = Mat3.identity();
  const expected = Mat3.fromElements(new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]));
  equalMat3(actual, expected);
});

describe('Mat3.translate2d', () => {
  it('creates transform in 2D mat3 from Vec2.', () => {
    const actual = Mat3.translate2d(new Vec2(1, 2));
    const expected = Mat3.fromElements(new Float32Array([
      1, 0, 0,
      0, 1, 0,
      1, 2, 1
    ]));
    equalMat3(actual, expected);
  });
  it('creates transform in 2D mat3 from numbers.', () => {
    const actual = Mat3.translate2d(1, 2);
    const expected = Mat3.fromElements(new Float32Array([
      1, 0, 0,
      0, 1, 0,
      1, 2, 1
    ]));
    equalMat3(actual, expected);
  });
});

describe('Mat3.scale2d', () => {
  it('creates scale in 2D mat3 from Vec2.', () => {
    const actual = Mat3.scale2d(new Vec2(2, 3));
    const expected = Mat3.fromElements(new Float32Array([
      2, 0, 0,
      0, 3, 0,
      0, 0, 1
    ]));
    equalMat3(actual, expected);
  });
  it('creates scale in 2D mat3 from numbers.', () => {
    const actual = Mat3.scale2d(2, 3);
    const expected = Mat3.fromElements(new Float32Array([
      2, 0, 0,
      0, 3, 0,
      0, 0, 1
    ]));
    equalMat3(actual, expected);
  });
});

describe('Mat3.rotate2d', () => {
  it('creates rotation in 2D matrix', () => {
    const radian = Math.PI / 3.0;
    const actual = Mat3.rotate2d(radian);
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const expected = Mat3.fromElements(new Float32Array([
      c, s, 0,
      -s, c, 0,
      0, 0, 1
    ]));
    equalMat3(actual, expected);
  });
  it('creates a matrix which rotates Vec3 in 2D', () => {
    const radian = Math.PI  / 3.0;
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const m = Mat3.rotate2d(radian);
    equalVec3(Vec3.mul(new Vec3(1, 0, 1), m), new Vec3(c, s, 1));
    equalVec3(Vec3.mul(new Vec3(0, 1, 1), m), new Vec3(-s, c, 1));
  });
});

describe('Mat3.rotateX', () => {
  it('creates a matrix which rotates Vec3 around X axis in 3D', () => {
    const radian = Math.PI  / 3.0;
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const m = Mat3.rotateX(radian);
    equalVec3(Vec3.mul(new Vec3(1, 0, 0), m), new Vec3(1, 0, 0));
    equalVec3(Vec3.mul(new Vec3(0, 1, 0), m), new Vec3(0, c, s));
    equalVec3(Vec3.mul(new Vec3(0, 0, 1), m), new Vec3(0, -s, c));
  });
});

describe('Mat3.rotateY', () => {
  it('creates a matrix which rotates Vec3 around Y axis in 3D', () => {
    const radian = Math.PI  / 3.0;
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const m = Mat3.rotateY(radian);
    equalVec3(Vec3.mul(new Vec3(1, 0, 0), m), new Vec3(c, 0, -s));
    equalVec3(Vec3.mul(new Vec3(0, 1, 0), m), new Vec3(0, 1, 0));
    equalVec3(Vec3.mul(new Vec3(0, 0, 1), m), new Vec3(s, 0, c));
  });
});

describe('Mat3.rotateZ', () => {
  it('creates a matrix which rotates Vec3 around Z axis in 3D', () => {
    const radian = Math.PI  / 3.0;
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const m = Mat3.rotateZ(radian);
    equalVec3(Vec3.mul(new Vec3(1, 0, 0), m), new Vec3(c, s, 0));
    equalVec3(Vec3.mul(new Vec3(0, 1, 0), m), new Vec3(-s, c, 0));
    equalVec3(Vec3.mul(new Vec3(0, 0, 1), m), new Vec3(0, 0, 1));
  });
});

describe('Mat3.basis', () => {
  // TODO: needs tests.
});

describe('Mat3.lookTo', () => {
  // TODO: needs tests.
});

describe('Mat3.mul', () => {
  // TODO: needs tests.
});

describe('Mat3#elements', () => {
  // TODO: needs tests.
});

describe('Mat3#determinant', () => {
  // TODO: needs tests.
});

describe('Mat3#inversed', () => {
  // TODO: needs tests.
});

describe('Mat3#transposed', () => {
  // TODO: needs tests.
});

