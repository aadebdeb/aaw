import { Vec2 } from '../../src/math/vec2';
import { Vec3 } from '../../src/math/vec3';
import { vec4, Vec4 } from '../../src/math/vec4';
import { Mat4 } from '../../src/math/mat4';
import { equalVec2, equalVec3, equalVec4, CLOSE_DIGITS } from './utils';

describe('vec4', () => {
  test('vec4(1) => Vec4(1, 1, 1, 1)', () => {
    const actual = vec4(1);
    const expected = new Vec4(1, 1, 1, 1);
    equalVec4(actual, expected);
  });
  test('vec4(1, 2, 3, 4) => Vec4(1, 2, 3, 4)', () => {
    const actual = vec4(1, 2, 3, 4);
    const expected = new Vec4(1, 2, 3, 4);
    equalVec4(actual, expected);
  });
  test('vec4(Vec2(1, 2), 3, 4) => Vec4(1, 2, 3, 4)', () => {
    const actual = vec4(new Vec2(1, 2), 3, 4);
    const expected = new Vec4(1, 2, 3, 4);
    equalVec4(actual, expected);
  });
  test('vec4(Vec3(1, 2, 3), 4) => Vec4(1, 2, 3, 4)', () => {
    const actual = vec4(new Vec3(1, 2, 3), 4);
    const expected = new Vec4(1, 2, 3, 4);
    equalVec4(actual, expected);
  });
  test('vec4(Vec4(1, 2, 3, 4)) => Vec4(1, 2, 3, 4)', () => {
    const actual = vec4(new Vec4(1, 2, 3, 4));
    const expected = new Vec4(1, 2, 3, 4);
    equalVec4(actual, expected);
  });
});

test('new Vec4', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.x).toBeCloseTo(1, CLOSE_DIGITS);
  expect(v.y).toBeCloseTo(2, CLOSE_DIGITS);
  expect(v.z).toBeCloseTo(3, CLOSE_DIGITS);
  expect(v.w).toBeCloseTo(4, CLOSE_DIGITS);
});

test('Vec4.fromElements', () => {
  const actual = Vec4.fromElements([1, 2, 3, 4]);
  const expected = new Vec4(1, 2, 3, 4);
  equalVec4(actual, expected);
});

describe('Vec4.add', () => {
  test('adds a Vec4 and a number', () => {
    const actual = Vec4.add(new Vec4(1, 2, 3, 4), 5);
    const expected = new Vec4(6, 7, 8, 9);
    equalVec4(actual, expected);
  });
  test('adds a Vec4 and another Vec4', () => {
    const actual = Vec4.add(new Vec4(1, 2, 3, 4), new Vec4(5, 6, 7, 8));
    const expected = new Vec4(6, 8, 10, 12);
    equalVec4(actual, expected);
  });
});

describe('Vec4.sub', () => {
  test('subtracts a Vec4 from a number', () => {
    const acutal = Vec4.sub(new Vec4(1, 2, 3, 4), 5);
    const expected = new Vec4(-4, -3, -2, -1);
    equalVec4(acutal, expected);
  });
  test('subtracts a Vec4 from another Vec4', () => {
    const acutal = Vec4.sub(new Vec4(1, 2, 3, 4), new Vec4(8, 7, 6, 5));
    const expected = new Vec4(-7, -5, -3, -1);
    equalVec4(acutal, expected);
  });
});

describe('Vec4.mul', () => {
  test('multiplies a Vec4 by a number', () => {
    const actual = Vec4.mul(new Vec4(2, 3, 4, 5), 6);
    const expected = new Vec4(12, 18, 24, 30);
    equalVec4(actual, expected);
  });
  test('multiplies a Vec4 by another Vec4', () => {
    const actual = Vec4.mul(new Vec4(2, 3, 4, 5), new Vec4(6, 7, 8, 9));
    const expected = new Vec4(12, 21, 32, 45);
    equalVec4(actual, expected);
  });
  test('multiplies a Vec4 by a Mat4', () => {
    const m = Mat4.fromElements(new Float32Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ]));
    const actual = Vec4.mul(new Vec4(1, 2, 3, 4), m);
    const expected = new Vec4(90, 100, 110, 120);
    equalVec4(actual, expected);
  });
});

describe('Vec4.div', () => {
  test('divides a Vec4 by a number', () => {
    const actual = Vec4.div(new Vec4(2, 3, 4, 5), 6);
    const exptected = new Vec4(2 / 6, 3 / 6, 4 / 6, 5 / 6);
    equalVec4(actual, exptected);
  });
  test('divides a Vec4 by another Vec4', () => {
    const actual = Vec4.div(new Vec4(2, 3, 4, 5), new Vec4(6, 7, 8, 9));
    const exptected = new Vec4(2 / 6, 3 / 7, 4 / 8, 5 / 9);
    equalVec4(actual, exptected);
  });
});

test('Vec4.negative', () => {
  const actual = Vec4.negative(new Vec4(1, 2, 3, 4));
  const expected = new Vec4(-1, -2, -3, -4);
  equalVec4(actual, expected);
});

test('Vec4.zero', () => {
  const actual = Vec4.zero;
  const expected = new Vec4(0, 0, 0, 0);
  equalVec4(actual, expected);
});

test('Vec4.one', () => {
  const actual = Vec4.one;
  const exptected = new Vec4(1, 1, 1, 1);
  equalVec4(actual, exptected);
});

test('Vec4.fill', () => {
  const actual = Vec4.fill(10);
  const expected = new Vec4(10, 10, 10, 10);
  equalVec4(actual, expected);
});

test('Vec4.left', () => {
  const actual = Vec4.left;
  const expected = new Vec4(-1, 0, 0, 0);
  equalVec4(actual, expected);
});

test('Vec4.right', () => {
  const actual = Vec4.right;
  const expected = new Vec4(1, 0, 0, 0);
  equalVec4(actual, expected);
});

test('Vec3.down', () => {
  const actual = Vec4.down;
  const expected = new Vec4(0, -1, 0, 0);
  equalVec4(actual, expected);
})

test('Vec4.up', () => {
  const acutal = Vec4.up;
  const expected = new Vec4(0, 1, 0, 0);
  equalVec4(acutal, expected);
});

test('Vec4.forward', () => {
  const actual = Vec4.forward;
  const expected = new Vec4(0, 0, -1, 0);
  equalVec4(actual, expected);
})

test('Vec4.backward', () => {
  const acutal = Vec4.backward;
  const expected = new Vec4(0, 0, 1, 0);
  equalVec4(acutal, expected);
});

test('Vec4.dot', () => {
  const actual = Vec4.dot(new Vec4(1, 2, 3, 4), new Vec4(5, 6, 7, 8));
  const expected = 70;
  expect(actual).toBeCloseTo(expected, CLOSE_DIGITS);
});

test('Vec4#x', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.x).toBeCloseTo(1, CLOSE_DIGITS);
});

test('Vec4#y', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.y).toBeCloseTo(2, CLOSE_DIGITS);
});

test('Vec4#z', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.z).toBeCloseTo(3, CLOSE_DIGITS);
});

test('Vec4#w', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.w).toBeCloseTo(4, CLOSE_DIGITS);
});

describe('Vec4#add', () => {
  it('adds a scalar', () => {
    const actual = new Vec4(1, 2, 3, 5);
    actual.add(5);
    const expected = new Vec4(6, 7, 8, 10);
    equalVec4(actual, expected);
  });
  it('adds a Vec4', () => {
    const actual = new Vec4(1, 2, 3, 4);
    actual.add(new Vec4(5, 6, 7, 8));
    const expected = new Vec4(6, 8, 10, 12);
    equalVec4(actual, expected);
  });
  it('returns myself when adding a scalar', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.add(5)).toBe(v);
  });
  it('returns myself when adding a Vec4', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.add(new Vec4(5, 6, 7, 8))).toBe(v);
  });
});

describe('Vec4#sub', () => {
  it('subtracts a scalar', () => {
    const actual = new Vec4(1, 2, 3, 4);
    actual.sub(5);
    const expected = new Vec4(-4, -3, -2, -1);
    equalVec4(actual, expected);
  });
  it('subtracts a Vec4', () => {
    const actual = new Vec4(1, 2, 3, 4);
    actual.sub(new Vec4(8, 7, 6, 5));
    const expected = new Vec4(-7, -5, -3, -1);
    equalVec4(actual, expected);
  });
  it('returns myself when subtracting a scalar', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.sub(5)).toBe(v);
  });
  it('returns myself when subtracting a Vec4', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.sub(new Vec4(8, 7, 6, 5))).toBe(v);
  });
});

describe('Vec4#mul', () => {
  it('multiplies by a scalar', () => {
    const actual = new Vec4(2, 3, 4, 5);
    actual.mul(6);
    const expected = new Vec4(12, 18, 24, 30);
    equalVec4(actual, expected);
  });
  it('multiplies by a Vec4', () => {
    const actual = new Vec4(2, 3 ,4, 5);
    actual.mul(new Vec4(6, 7, 8, 9));
    const expected = new Vec4(12, 21, 32, 45);
    equalVec4(actual, expected);
  });
  it('multiplies by a Mat4', () => {
    const m = Mat4.fromElements(new Float32Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ]));
    const actual = new Vec4(1, 2, 3, 4);
    actual.mul(m);
    const expected = new Vec4(90, 100, 110, 120);
    equalVec4(actual, expected);
  });
  it('returns myself when multiplying by a scalar', () => {
    const v = new Vec4(2, 3, 4, 5);
    expect(v.mul(6)).toBe(v);
  });
  it('returns myself when multiplying by a Vec4', () => {
    const v = new Vec4(2, 3, 4, 5);
    expect(v.mul(new Vec4(6, 7, 8, 9))).toBe(v);
  });
  it('returns myself when multiplying by a Mat4', () => {
    const m = Mat4.fromElements(new Float32Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
    ]));
    const v = new Vec4(2, 3, 4, 5);
    expect(v.mul(m)).toBe(v);
  });
});

describe('Vec4#div', () => {
  it('divided by a scalar', () => {
    const actual = new Vec4(2, 3, 4, 5);
    actual.div(6);
    const expected = new Vec4(2 / 6, 3 / 6, 4 / 6, 5 / 6);
    equalVec4(actual, expected);
  });
  it('divided by a Vec4', () => {
    const actual = new Vec4(2, 3, 4, 5);
    actual.div(new Vec4(6, 7, 8, 9));
    const expected = new Vec4(2 / 6, 3 / 7, 4 / 8, 5 / 9);
    equalVec4(actual, expected);
  });
  it('returns myself when dividing by a number', () => {
    const v = new Vec4(2, 3, 4, 5);
    expect(v.div(6)).toBe(v);
  });
  it('returns myself when dividing by a Vec4', () => {
    const v = new Vec4(2, 3, 4, 5);
    expect(v.div(new Vec4(6, 7, 8, 9))).toBe(v);
  });
});

describe('Vec4#negative', () => {
  it('negatived', () => {
    const actual = new Vec4(1, 2, 3, 4);
    actual.negative();
    const expected = new Vec4(-1, -2, -3, -4);
    equalVec4(actual, expected);
  });
  it ('returns myself', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.negative()).toBe(v);
  });
});

test('Vec4#sqMag', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.sqMag()).toBeCloseTo(30, CLOSE_DIGITS);
});

test('Vec4#mag', () => {
  const v = new Vec4(1, 2, 3, 4);
  expect(v.mag()).toBeCloseTo(Math.sqrt(30), CLOSE_DIGITS);
});

describe('Vec4#norm', () => {
  it('return normalized vector', () => {
    const actual = new Vec4(1, 2, 3, 4);
    actual.norm();
    const n = Math.sqrt(30);
    const expected = new Vec4(1 / n, 2 / n, 3 / n, 4 / n);
    equalVec4(actual, expected);
  });
  it('returns myself', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.norm()).toBe(v);
  });
});

describe('Vec4#clone', () => {
  it('returns vector with same values', () => {
    const v = new Vec4(1, 2, 3, 4);
    const actual = v.clone();
    equalVec4(actual, v);
  });
  it('returns different object', () => {
    const v = new Vec4(1, 2, 3, 4);
    const actual = v.clone();
    expect(actual).not.toBe(v);
  });
});

test('Vec4#toVec2', () => {
  const v = new Vec4(1, 2, 3, 4);
  const actual = v.toVec2();
  const expected = new Vec2(1, 2);
  equalVec2(actual, expected);
});

test('Vec4#toVec3', () => {
  const v = new Vec4(1, 2, 3, 4);
  const actual = v.toVec3();
  const expected = new Vec3(1, 2, 3);
  equalVec3(actual, expected);
});

test('Vec4#toArray', () => {
  const v = new Vec4(1, 2, 3, 4);
  const a = v.toArray();
  expect(a.length).toBe(4);
  expect(a[0]).toBeCloseTo(1, CLOSE_DIGITS);
  expect(a[1]).toBeCloseTo(2, CLOSE_DIGITS);
  expect(a[2]).toBeCloseTo(3, CLOSE_DIGITS);
  expect(a[3]).toBeCloseTo(4, CLOSE_DIGITS);
});