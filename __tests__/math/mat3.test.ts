import { Vec2 } from '../../src/math/vec2';
import { Mat3 } from '../../src/math/mat3';
import { equalMat3, CLOSE_DIGITS } from './utils';

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
  // TODO: needs tests.
});

describe('Mat3.rotateX', () => {
  // TODO: needs tests.
});

describe('Mat3.rotateY', () => {
  // TODO: needs tests.
})

describe('Mat3.rotateZ', () => {
  // TODO: needs tests.
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

