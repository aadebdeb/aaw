import { Vec3 } from '../../src/math/vec3';
import { Vec4 } from '../../src/math/vec4';
import { Mat4 } from '../../src/math/mat4';
import { equalVec3, equalMat4, CLOSE_DIGITS } from './utils';

test('Mat4.identity', () => {
  const actual = Mat4.identity();
  const expected = Mat4.fromElements(new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]));
  equalMat4(actual, expected);
});

describe('Mat4.translate', () => {
  it ('creates transform mat4 from Vec3.', () => {
    const actual = Mat4.translate(new Vec3(1, 2, 3));
    const expected = Mat4.fromElements(new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 2, 3, 1
    ]));
    equalMat4(actual, expected);
  });
  it('creates transform mat4 from numbers.', () => {
    const actual = Mat4.translate(1, 2, 3);
    const expected = Mat4.fromElements(new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 2, 3, 1
    ]));
    equalMat4(actual, expected);
  });
});

describe('Mat4.scale', () => {
  it('creates scale mat4 from Vec3.', () => {
    const actual = Mat4.scale(new Vec3(2, 3, 4));
    const expected = Mat4.fromElements(new Float32Array([
      2, 0, 0, 0,
      0, 3, 0, 0,
      0, 0, 4, 0,
      0, 0, 0, 1
    ]));
    equalMat4(actual, expected);
  });
  it ('creates scale mat4 from numbers', () => {
    const actual = Mat4.scale(2, 3, 4);
    const expected = Mat4.fromElements(new Float32Array([
      2, 0, 0, 0,
      0, 3, 0, 0,
      0, 0, 4, 0,
      0, 0, 0, 1
    ]));
    equalMat4(actual, expected);
  });
});

test('Mat4.rotateX', () => {
  const radian = Math.PI / 3.0;
  const actual = Mat4.rotateX(radian);
  const c = Math.cos(radian);
  const s = Math.sin(radian);
  const expected = Mat4.fromElements(new Float32Array([
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ]));
  equalMat4(actual, expected);
});

test('Mat4.rotateY', () => {
  const radian = Math.PI / 3.0;
  const actual = Mat4.rotateY(radian);
  const c = Math.cos(radian);
  const s = Math.sin(radian);
  const expected = Mat4.fromElements(new Float32Array([
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ]));
  equalMat4(actual, expected);
});

test('Mat4.rotateZ', () => {
  const radian = Math.PI / 3.0;
  const actual = Mat4.rotateZ(radian);
  const c = Math.cos(radian);
  const s = Math.sin(radian);
  const expected = Mat4.fromElements(new Float32Array([
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]));
  equalMat4(actual, expected);
});

test('Mat4.basis', () => {
  const actual = Mat4.basis(
    new Vec3(0, 1, 0),
    new Vec3(0, 0, 1),
    new Vec3(1, 0, 0)
  );
  const expected = Mat4.fromElements(new Float32Array([
    0, 1, 0, 0,
    0, 0, 1, 0,
    1, 0, 0, 0,
    0, 0, 0, 1
  ]));
  equalMat4(actual, expected);
});

describe('Mat4.perspective', () => {
  it('transforms left/down/near to (-1, -1, -1)', () => {
    const aspect = 1.5;
    const vfov = 60.0;
    const near = 0.1;
    const far = 100.0;
    const m = Mat4.perspective(aspect, vfov, near, far);
    const vsize = Math.tan(0.5 * vfov * Math.PI / 180.0);
    const viewPos = new Vec4(-aspect * vsize * near, -vsize * near, -near, 1);
    const clipPos = Vec4.mul(viewPos, m);
    const normDevicePos = clipPos.toVec3().div(clipPos.w);
    equalVec3(normDevicePos, new Vec3(-1, -1, -1));
  });
  it('transforms right/up/far to (1, 1, 1)', () => {
    const aspect = 1.5;
    const vfov = 60.0;
    const near = 0.1;
    const far = 100.0;
    const m = Mat4.perspective(aspect, vfov, near, far);
    const vsize = Math.tan(0.5 * vfov * Math.PI / 180.0);
    const viewPos = new Vec4(aspect * vsize * far, vsize * far, -far, 1);
    const clipPos = Vec4.mul(viewPos, m);
    const normDevicePos = clipPos.toVec3().div(clipPos.w);
    equalVec3(normDevicePos, new Vec3(1, 1, 1));
  });
});

describe('Mat4.orthographic', () => {
  it('transforms left/down/near to (-1, -1, 1)', () => {
    const width = 150;
    const height = 100;
    const near = 0.1;
    const far = 100.0;
    const m = Mat4.orthographic(width, height, near, far);
    const viewPos = new Vec4(-0.5 * width, -0.5 * height, -near, 1);
    const clipPos = Vec4.mul(viewPos, m);
    const normDevicePos = clipPos.toVec3().div(clipPos.w);
    equalVec3(normDevicePos, new Vec3(-1, -1, -1));
  });
  it('transforms right/up/far to (1, 1, 1)', () => {
    const width = 150;
    const height = 100;
    const near = 0.1;
    const far = 100.0;
    const m = Mat4.orthographic(width, height, near, far);
    const viewPos = new Vec4(0.5 * width, 0.5 * height, -far, 1);
    const clipPos = Vec4.mul(viewPos, m);
    const normDevicePos = clipPos.toVec3().div(clipPos.w);
    equalVec3(normDevicePos, new Vec3(1, 1, 1));
  });
});

test('Mat4.lookTo', () => {
  const m = Mat4.lookTo(new Vec3(0.0, 0.0, -1.0));
  const v = new Vec4(0, 0, -1, 1);
  const rv = Vec4.mul(v, m).toVec3();
  equalVec3(rv, new Vec3(0, 0, -1));
});

test('Mat4.mul', () => {
  // TODO: needs tests.
});

test('Mat4#elements', () => {
  const actual = Mat4.fromElements(new Float32Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ])).elements;
  const expected = new Float32Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ]);
  expect(actual[0]).toBeCloseTo(expected[0], CLOSE_DIGITS);
  expect(actual[1]).toBeCloseTo(expected[1], CLOSE_DIGITS);
  expect(actual[2]).toBeCloseTo(expected[2], CLOSE_DIGITS);
  expect(actual[3]).toBeCloseTo(expected[3], CLOSE_DIGITS);
  expect(actual[4]).toBeCloseTo(expected[4], CLOSE_DIGITS);
  expect(actual[5]).toBeCloseTo(expected[5], CLOSE_DIGITS);
  expect(actual[6]).toBeCloseTo(expected[6], CLOSE_DIGITS);
  expect(actual[7]).toBeCloseTo(expected[7], CLOSE_DIGITS);
  expect(actual[8]).toBeCloseTo(expected[8], CLOSE_DIGITS);
  expect(actual[9]).toBeCloseTo(expected[9], CLOSE_DIGITS);
  expect(actual[10]).toBeCloseTo(expected[10], CLOSE_DIGITS);
  expect(actual[11]).toBeCloseTo(expected[11], CLOSE_DIGITS);
  expect(actual[12]).toBeCloseTo(expected[12], CLOSE_DIGITS);
  expect(actual[13]).toBeCloseTo(expected[13], CLOSE_DIGITS);
  expect(actual[14]).toBeCloseTo(expected[14], CLOSE_DIGITS);
  expect(actual[15]).toBeCloseTo(expected[15], CLOSE_DIGITS);
});

// TODO: needs more tests.
test('Mat4#determinant', () => {
  const d = Mat4.identity().determinant;
  expect(d).toBeCloseTo(1, CLOSE_DIGITS);
});

test('Mat4#inversed', () => {
  // TODO: needs tests.
});

test('Mat4#transposed', () => {
  const m = Mat4.fromElements(new Float32Array([
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
  ]));
  const actual = m.transposed;
  const expected = Mat4.fromElements(new Float32Array([
    0, 4, 8, 12,
    1, 5, 9, 13,
    2, 6, 10, 14,
    3, 7, 11, 15
  ]));
  equalMat4(actual, expected);
});

test('Mat4#normal', () => {
  // TODO: needs tests.
});

