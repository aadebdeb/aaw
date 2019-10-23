import { Vec2 } from '../../src/math/vec2';
import { Mat2 } from '../../src/math/mat2';
import { equalMat2, CLOSE_DIGITS } from './utils';

describe('Mat2.identity', () => {
  it('returns identity matrix', () => {
    const actual = Mat2.identity();
    const expected = Mat2.fromElements(new Float32Array([
      1, 0,
      0, 1
    ]));
    equalMat2(actual, expected);
  });
  it('inversed identity matrix is identity matrix', () => {
    const actual = Mat2.identity().inversed;
    const expected = Mat2.fromElements(new Float32Array([
      1, 0,
      0, 1
    ]));
    equalMat2(actual, expected);
  });
  it('transposed identity matrix is identity matrix', () => {
    const actual = Mat2.identity().transposed;
    const expected = Mat2.fromElements(new Float32Array([
      1, 0,
      0, 1
    ]));
    equalMat2(actual, expected);
  });
  it('determinant of identity matrix is 1', () => {
    const actual = Mat2.identity().determinant;
    expect(actual).toBeCloseTo(1, CLOSE_DIGITS);
  });
});

describe('Mat2.scale2d', () => {
  it('creates 2D scale matrix from Vec2', () => {
    const actual = Mat2.scale2d(new Vec2(2, 3));
    const expected = Mat2.fromElements(new Float32Array([
      2, 0,
      0, 3
    ]));
    equalMat2(actual, expected);
  });
  it('creates 2D scale matrix from numbers', () => {
    const actual = Mat2.scale2d(2, 3);
    const expected = Mat2.fromElements(new Float32Array([
      2, 0,
      0, 3
    ]));
    equalMat2(actual, expected);
  });
});

describe('Mat2.rotate2d', () => {
  it('creates 2D rotate matrix', () => {
    const radian = Math.PI / 3.0;
    const actual = Mat2.rotate2d(radian);
    const c = Math.cos(radian);
    const s = Math.sin(radian);
    const expected = Mat2.fromElements(new Float32Array([
      c, s,
      -s, c
    ]));
    equalMat2(actual, expected);
  });
});

test('Mat2.basis', () => {
  const actual = Mat2.basis(
    new Vec2(0, 1),
    new Vec2(1, 0)
  );
  const expected = Mat2.fromElements(new Float32Array([
    0, 1,
    1, 0
  ]));
  equalMat2(actual, expected);
});

describe('Mat2.mul', () => {
  it('multiplies two Mat2', () => {
    const m1 = Mat2.fromElements(new Float32Array([
      1, 2, 3, 4
    ]));
    const m2 = Mat2.fromElements(new Float32Array([
      5, 6, 7, 8
    ]));
    const actual = Mat2.mul(m1, m2);
    const expected = Mat2.fromElements(new Float32Array([
      19, 22, 43, 50
    ]));
    equalMat2(actual, expected);
  });
  it('multiplies three Mat2', () => {
    const m1 = Mat2.fromElements(new Float32Array([
      1, 2, 3, 4
    ]));
    const m2 = Mat2.fromElements(new Float32Array([
      5, 6, 7, 8
    ]));
    const m3 = Mat2.fromElements(new Float32Array([
      9, 10, 11, 12
    ]));
    const actual = Mat2.mul(m1, m2, m3);
    const expected = Mat2.fromElements(new Float32Array([
      413, 454, 937, 1030
    ]));
    equalMat2(actual, expected);
  });
  it('multiplies four Mat2', () => {
    const m1 = Mat2.fromElements(new Float32Array([
      1, 2, 3, 4
    ]));
    const m2 = Mat2.fromElements(new Float32Array([
      5, 6, 7, 8
    ]));
    const m3 = Mat2.fromElements(new Float32Array([
      9, 10, 11, 12
    ]));
    const m4 = Mat2.fromElements(new Float32Array([
      13, 14, 15, 16
    ]));
    const actual = Mat2.mul(m1, m2, m3, m4);
    const expected = Mat2.fromElements(new Float32Array([
      12179, 13046, 27631, 29598
    ]));
    equalMat2(actual, expected);
  });
});

test('Mat2#elements', () => {
  const actual = Mat2.fromElements(new Float32Array([
    0, 1, 2, 3
  ])).elements;
  const expected = new Float32Array([
    0, 1, 2, 3
  ]);
  expect(actual[0]).toBeCloseTo(expected[0], CLOSE_DIGITS);
  expect(actual[1]).toBeCloseTo(expected[1], CLOSE_DIGITS);
  expect(actual[2]).toBeCloseTo(expected[2], CLOSE_DIGITS);
  expect(actual[3]).toBeCloseTo(expected[3], CLOSE_DIGITS);
});

test('Mat2#determinant', () => {
  const actual = Mat2.fromElements(new Float32Array([
    1, 2, 3, 4
  ])).determinant;
  expect(actual).toBeCloseTo(-2, CLOSE_DIGITS);
});

test('Mat2#inversed', () => {
  const actual = Mat2.fromElements(new Float32Array([
    1, 2, 3, 4
  ])).inversed;
  const expected = Mat2.fromElements(new Float32Array([
    4 / -2, -3 / -2, -2 / -2, 1 / -2
  ]));
  equalMat2(actual, expected);
});

test('Mat2#transposed', () => {
  const actual = Mat2.fromElements(new Float32Array([
    0, 1, 2, 3
  ])).transposed;
  const expected = Mat2.fromElements(new Float32Array([
    0, 2, 1, 3
  ]));
  equalMat2(actual, expected);
});