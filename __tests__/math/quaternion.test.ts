import { Vec3, vec3 } from '../../src/math/vec3';
import { Mat4 } from '../../src/math/mat4';
import { Quaternion } from '../../src/math/quaternion';
import { equalVec3, equalQuaternion, CLOSE_DIGITS } from './utils';

test('new Quaternion', () => {
  const q = new Quaternion(1, 2, 3, 4);
  expect(q.x).toBeCloseTo(1, CLOSE_DIGITS);
  expect(q.y).toBeCloseTo(2, CLOSE_DIGITS);
  expect(q.z).toBeCloseTo(3, CLOSE_DIGITS);
  expect(q.w).toBeCloseTo(4, CLOSE_DIGITS);
});

test('Quaternion.identity', () => {
  const actual = Quaternion.identity();
  const expected = new Quaternion(0, 0, 0, 1);
  equalQuaternion(actual, expected);
});

test('Quaternion.axisAngle', () => {
  const actual = Quaternion.axisAngle(new Vec3(0, 1, 0), Math.PI / 2);
  const expected = new Quaternion(0, 0.5 * Math.sqrt(2), 0, 0.5 * Math.sqrt(2));
  equalQuaternion(actual, expected);
});

describe('Quaternion.lookTo', () => {
  it('rotates forward to forward', () => {
    const q = Quaternion.lookTo(Vec3.forward);
    const v = q.rotate(Vec3.forward);
    equalVec3(v, Vec3.forward);
  });
  it('rotates forward to backward', () => {
    const q = Quaternion.lookTo(Vec3.backward);
    const v = q.rotate(Vec3.forward);
    equalVec3(v, Vec3.backward);
  });
  it('rotates forward to right', () => {
    const q = Quaternion.lookTo(Vec3.right);
    const v = q.rotate(Vec3.forward);
    equalVec3(v, Vec3.right);
  });
  it('rotates forward to left', () => {
    const q = Quaternion.lookTo(Vec3.left);
    const v = q.rotate(Vec3.forward);
    equalVec3(v, Vec3.left);
  });
});

describe('Quaternion.fromMat', () => {
  it('rotation around X axis', () => {
    const m = Mat4.rotateX(0.5 * Math.PI);
    const q = Quaternion.fromMat(m);
    const v = new Vec3(0.0, 1.0, 0.0);
    const rv = q.rotate(v);
    equalVec3(rv, new Vec3(0.0, 0.0, 1.0));
  });
});

test('Quaternion.add', () => {
  const q1 = new Quaternion(1, 2, 3, 4);
  const q2 = new Quaternion(5, 6, 7, 8);
  const actual = Quaternion.add(q1, q2);
  const expected = new Quaternion(6, 8, 10, 12);
  equalQuaternion(actual, expected);
});

test('Quaternion.sub', () => {
  const q1 = new Quaternion(1, 2, 3, 4);
  const q2 = new Quaternion(8, 7, 6, 5);
  const actual = Quaternion.sub(q1, q2);
  const expected = new Quaternion(-7, -5, -3, -1);
  equalQuaternion(actual, expected);
});

describe('Quaternion.mul', () => {
  test('multiplied by a number', () => {
    const q = new Quaternion(1, 2, 3, 4);
    const actual = Quaternion.mul(q, 5);
    const expected = new Quaternion(5, 10, 15, 20);
    equalQuaternion(actual, expected);
  });

  test('multiplied by a quaternion', () => {
    const q1 = Quaternion.axisAngle(new Vec3(0, 1, 0), Math.PI / 3);
    const q2 = Quaternion.axisAngle(new Vec3(0, 1, 0), 2 * Math.PI / 3);
    const actual = Quaternion.mul(q1, q2);
    const expected = new Quaternion(0, 1, 0, 0);
    equalQuaternion(actual, expected);
  });
});

test('Quaternion.conjugate', () => {
  const q = new Quaternion(1, 2, 3, 4);
  const actual = Quaternion.conjugate(q);
  const expected = new Quaternion(-1, -2, -3, 4);
  equalQuaternion(actual, expected);
});

test('Quaternion.inverse', () => {
  const q = new Quaternion(1, 2, 3, 4);
  const actual = Quaternion.mul(q, Quaternion.inverse(q));
  const expected = new Quaternion(0.0, 0.0, 0.0, 1.0);
  equalQuaternion(actual, expected);
});

describe('Quaterion#add', () => {
  it('adds a quaterion', () => {
    const actual = new Quaternion(1, 2, 3, 4);
    actual.add(new Quaternion(5, 6, 7, 8));
    const expected = new Quaternion(6, 8, 10, 12);
    equalQuaternion(actual, expected);
  });
  it('returns myself', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.add(new Quaternion(5, 6, 7, 8))).toBe(q);
  });
});

describe('Quaterion#sub', () => {
  it('subtracts a quaterion', () => {
    const actual = new Quaternion(1, 2, 3, 4);
    actual.sub(new Quaternion(8, 7, 6, 5));
    const expected = new Quaternion(-7, -5, -3, -1);
    equalQuaternion(actual, expected);
  });
  it('returns myself', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.sub(new Quaternion(8, 7, 6, 5))).toBe(q);
  });
});

describe('Quaternion#mul', () => {
  test('multiplied by a number', () => {
    const actual = new Quaternion(1, 2, 3, 4);
    actual.mul(5);
    const expected = new Quaternion(5, 10, 15, 20);
    equalQuaternion(actual, expected);
  });
  test('multiplied by a quaternion', () => {
    const q1 = Quaternion.axisAngle(new Vec3(0, 1, 0), Math.PI / 3);
    const q2 = Quaternion.axisAngle(new Vec3(0, 1, 0), 2 * Math.PI / 3);
    q1.mul(q2);
    const expected = new Quaternion(0, 1, 0, 0);
    equalQuaternion(q1, expected);
  });
  test('returns myself', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.mul(5)).toBe(q);
  });
});

test('Quaterion#sqNorm', () => {
  const q = new Quaternion(1, 2, 3, 4);
  expect(q.sqNorm()).toBeCloseTo(30, CLOSE_DIGITS);
});

test('Quaterion#norm', () => {
  const q = new Quaternion(1, 2, 3, 4);
  expect(q.norm()).toBeCloseTo(Math.sqrt(30), CLOSE_DIGITS);
});

test('Quaternion#rotate', () => {
  const q = Quaternion.axisAngle(new Vec3(0.0, 1.0, 0.0), 0.5 * Math.PI);
  const v = new Vec3(1.0, 0.0, 0.0);
  const actual = q.rotate(v);
  const expected = new Vec3(0.0, 0.0, -1.0);
  equalVec3(actual, expected);
});

describe('Quaterion#clone', () => {
  test('returns quaternion with same values', () => {
    const q = new Quaternion(1, 2, 3, 4);
    equalQuaternion(q, q.clone());
  });

  test('returns new instance of Quaternion', () => {
    const q = new Quaternion(1, 2, 3, 4);
    expect(q.clone()).not.toBe(q);
  });
});

test('Quaternion#toArray', () => {
  const q = new Quaternion(1, 2, 3, 4);
  const a = q.toArray();
  expect(a.length).toBe(4);
  expect(a[0]).toBeCloseTo(1, CLOSE_DIGITS);
  expect(a[1]).toBeCloseTo(2, CLOSE_DIGITS);
  expect(a[2]).toBeCloseTo(3, CLOSE_DIGITS);
  expect(a[3]).toBeCloseTo(4, CLOSE_DIGITS);
});