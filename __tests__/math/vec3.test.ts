import { Vec2 } from '../../src/math/vec2';
import { vec3, Vec3 } from '../../src/math/vec3';
import { Vec4 } from '../../src/math/vec4'
import { Mat3 } from '../../src/math/mat3';
import { equalVec2, equalVec3, equalVec4, CLOSE_DIGITS } from './utils';

describe('vec3', () => {
  test('vec3(1) => Vec3(1, 1, 1)', () => {
    const actual = vec3(1);
    const expected = new Vec3(1, 1, 1);
    equalVec3(actual, expected);
  });

  test('vec3(1, 2, 3) => Vec3(1, 2, 3)', () => {
    const actual = vec3(1, 2, 3);
    const expected = new Vec3(1, 2, 3);
    equalVec3(actual, expected);
  });

  test('vec3(Vec2(1, 2), 3) => Vec3(1, 2, 3)', () => {
    const actual = vec3(new Vec2(1, 2), 3);
    const expected = new Vec3(1, 2, 3);
    equalVec3(actual, expected);
  });

  test('vec3(Vec3(1, 2, 3)) => Vec3(1, 2, 3)', () => {
    const actual = vec3(new Vec3(1, 2, 3));
    const expected = new Vec3(1, 2, 3);
    equalVec3(actual, expected);
  });
});

test('new Vec3', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.x).toBeCloseTo(1, CLOSE_DIGITS);
  expect(v.y).toBeCloseTo(2, CLOSE_DIGITS);
  expect(v.z).toBeCloseTo(3, CLOSE_DIGITS);
});

test('Vec3.fromArray', () => {
  const actual = Vec3.fromArray([1, 2, 3]);
  const expected = new Vec3(1, 2, 3);
  equalVec3(actual, expected);
});

describe('Vec3.add', () => {
  test('adds a Vec2 and a number', () => {
    const actual = Vec3.add(new Vec3(1, 2, 3), 4);
    const expected = new Vec3(5, 6, 7);
    equalVec3(actual, expected);
  });
  test('adds a Vec2 and another Vec2', () => {
    const actual = Vec3.add(new Vec3(1, 2, 3), new Vec3(4, 5, 6));
    const expected = new Vec3(5, 7, 9);
    equalVec3(actual, expected);
  });
});

describe('Vec3.sub', () => {
  test('subtracts a Vec2 from a number', () => {
    const acutal = Vec3.sub(new Vec3(1, 2, 3), 4);
    const expected = new Vec3(-3, -2, -1);
    equalVec3(acutal, expected);
  });
  test('subtracts a Vec2 from antoher Vec2', () => {
    const acutal = Vec3.sub(new Vec3(1, 2, 3), new Vec3(6, 5, 4));
    const expected = new Vec3(-5, -3, -1);
    equalVec3(acutal, expected);
  });
});

describe('Vec3.mul', () => {
  test('multiplies a Vec2 by a number', () => {
    const actual = Vec3.mul(new Vec3(2, 3, 4), 5);
    const expected = new Vec3(10, 15, 20);
    equalVec3(actual, expected);
  });
  test('multiplies a Vec2 by another Vec2', () => {
    const actual = Vec3.mul(new Vec3(2, 3, 4), new Vec3(5, 6, 7));
    const expected = new Vec3(10, 18, 28);
    equalVec3(actual, expected);
  });
  test('multiplies a Vec2 by a Mat3', () => {
    const m = Mat3.fromElements(new Float32Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ]));
    const actual = Vec3.mul(new Vec3(1, 2, 3), m);
    const expected = new Vec3(30, 36, 42);
    equalVec3(actual, expected);
  });
});

describe('Vec3.div', () => {
  test('divides a Vec2 by a number', () => {
    const actual = Vec3.div(new Vec3(2, 3, 4), 5);
    const exptected = new Vec3(2 / 5, 3 / 5, 4 / 5);
    equalVec3(actual, exptected);
  });
  test('divides a Vec2 by another Vec2', () => {
    const actual = Vec3.div(new Vec3(2, 3, 4), new Vec3(5, 6, 20));
    const exptected = new Vec3(0.4, 0.5, 0.2);
    equalVec3(actual, exptected);
  });
});

test('Vec3.negative', () => {
  const actual = Vec3.negative(new Vec3(1, 2, 3));
  const expected = new Vec3(-1, -2, -3);
  equalVec3(actual, expected);
});

test('Vec3.zero', () => {
  const actual = Vec3.zero;
  const expected = new Vec3(0, 0, 0);
  equalVec3(actual, expected);
});

test('Vec3.one', () => {
  const actual = Vec3.one;
  const exptected = new Vec3(1, 1, 1);
  equalVec3(actual, exptected);
});

test('Vec3.fill', () => {
  const actual = Vec3.fill(10);
  const expected = new Vec3(10, 10, 10);
  equalVec3(actual, expected);
});

test('Vec3.left', () => {
  const actual = Vec3.left;
  const expected = new Vec3(-1, 0, 0);
  equalVec3(actual, expected);
});

test('Vec3.right', () => {
  const actual = Vec3.right;
  const expected = new Vec3(1, 0, 0);
  equalVec3(actual, expected);
});

test('Vec3.down', () => {
  const actual = Vec3.down;
  const expected = new Vec3(0, -1, 0);
  equalVec3(actual, expected);
})

test('Vec3.up', () => {
  const acutal = Vec3.up;
  const expected = new Vec3(0, 1, 0);
  equalVec3(acutal, expected);
});

test('Vec3.forward', () => {
  const actual = Vec3.forward;
  const expected = new Vec3(0, 0, -1);
  equalVec3(actual, expected);
})

test('Vec3.backward', () => {
  const acutal = Vec3.backward;
  const expected = new Vec3(0, 0, 1);
  equalVec3(acutal, expected);
});

test('Vec3.dot', () => {
  const actual = Vec3.dot(new Vec3(1, 2, 3), new Vec3(4, 5, 6));
  const expected = 32;
  expect(actual).toBeCloseTo(expected, CLOSE_DIGITS);
});

test('Vec3.cross', () => {
  const v1 = new Vec3(1, 2, 3);
  const v2 = new Vec3(-4, -5, -6);
  const actual = Vec3.cross(v1, v2);
  const expected = new Vec3(3, -6, 3);
  equalVec3(actual, expected);
});

test('Vec3#x', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.x).toBeCloseTo(1, CLOSE_DIGITS);
});

test('Vec3#y', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.y).toBeCloseTo(2, CLOSE_DIGITS);
});

test('Vec3#z', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.z).toBeCloseTo(3, CLOSE_DIGITS);
});

describe('Vec3#add', () => {
  it('adds a scalar', () => {
    const actual = new Vec3(1, 2, 3);
    actual.add(4);
    const expected = new Vec3(5, 6, 7);
    equalVec3(actual, expected);
  });
  it('adds a Vec3', () => {
    const actual = new Vec3(1, 2, 3);
    actual.add(new Vec3(4, 5, 6));
    const expected = new Vec3(5, 7, 9);
    equalVec3(actual, expected);
  });
  it('returns myself when adding a scalar', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.add(4)).toBe(v);
  });
  it('returns myself when adding a Vec3', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.add(new Vec3(4, 5, 6))).toBe(v);
  });
});

describe('Vec3#sub', () => {
  it('subtracts a scalar', () => {
    const actual = new Vec3(1, 2, 3);
    actual.sub(4);
    const expected = new Vec3(-3, -2, -1);
    equalVec3(actual, expected);
  });
  it('subtracts a Vec3', () => {
    const actual = new Vec3(1, 2, 3);
    actual.sub(new Vec3(6, 5, 4));
    const expected = new Vec3(-5, -3, -1);
    equalVec3(actual, expected);
  });
  it('returns myself when subtracting a scalar', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.sub(4)).toBe(v);
  });
  it('returns myself when subtracting a Vec3', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.sub(new Vec3(6, 5, 4))).toBe(v);
  });
});

describe('Vec3#mul', () => {
  it('multiplies by a scalar', () => {
    const actual = new Vec3(2, 3, 4);
    actual.mul(5);
    const expected = new Vec3(10, 15, 20);
    equalVec3(actual, expected);
  });
  it('multiplies by a Vec3', () => {
    const actual = new Vec3(2, 3 ,4);
    actual.mul(new Vec3(5, 6, 7));
    const expected = new Vec3(10, 18, 28);
    equalVec3(actual, expected);
  });
  it('multiplies by a Mat3', () => {
    const m = Mat3.fromElements(new Float32Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ]));
    const actual = new Vec3(1, 2, 3);
    actual.mul(m);
    const expected = new Vec3(30, 36, 42);
    equalVec3(actual, expected);
  });
  it('returns myself when multiplying by a scalar', () => {
    const v = new Vec3(2, 3, 4);
    expect(v.mul(5)).toBe(v);
  });
  it('returns myself when multiplying by a Vec2', () => {
    const v = new Vec3(2, 3, 4);
    expect(v.mul(new Vec3(5, 6, 7))).toBe(v);
  });
  it('returns myself when multiplying by a Mat2', () => {
    const m = Mat3.fromElements(new Float32Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9
    ]));
    const v = new Vec3(2, 3, 4);
    expect(v.mul(m)).toBe(v);
  });
});

describe('Vec3#div', () => {
  it('divided by a scalar', () => {
    const actual = new Vec3(2, 3, 4);
    actual.div(5);
    const expected = new Vec3(0.4, 0.6, 0.8);
    equalVec3(actual, expected);
  });
  it('divided by a Vec3', () => {
    const actual = new Vec3(2, 3, 4);
    actual.div(new Vec3(5, 6, 20));
    const expected = new Vec3(0.4, 0.5, 0.2);
    equalVec3(actual, expected);
  });
  it('returns myself when dividing a scalar', () => {
    const v = new Vec3(2, 3, 4);
    expect(v.div(5)).toBe(v);
  });
  it('returns myself when dividing a Vec3', () => {
    const v = new Vec3(2, 3, 4);
    expect(v.div(new Vec3(5, 6, 20))).toBe(v);
  });
});

describe('Vec3#negative', () => {
  it('negatives', () => {
    const actual = new Vec3(1, 2, 3);
    actual.negative();
    const expected = new Vec3(-1, -2, -3);
    equalVec3(actual, expected);
  });
  it ('returns myself', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.negative()).toBe(v);
  });
});

test('Vec3#sqMag', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.sqMag()).toBeCloseTo(14, CLOSE_DIGITS);
});

test('Vec3#mag', () => {
  const v = new Vec3(1, 2, 3);
  expect(v.mag()).toBeCloseTo(Math.sqrt(14), CLOSE_DIGITS);
});

describe('Vec4#norm', () => {
  it('return normalized vector', () => {
    const actual = new Vec3(3, 4, 5);
    actual.norm();
    equalVec3(actual, new Vec3(3 / Math.sqrt(50), 4 / Math.sqrt(50), 5 / Math.sqrt(50)));
  });
  it('returns myself', () => {
    const v = new Vec3(3, 4, 5);
    expect(v.norm()).toBe(v);
  });
});

describe('Vec3#clone', () => {
  it('returns vector with same values', () => {
    const v = new Vec3(1, 2, 3);
    const actual = v.clone();
    equalVec3(actual, v);
  });
  it('returns different object', () => {
    const v = new Vec3(1, 2, 3);
    const actual = v.clone();
    expect(actual).not.toBe(v);
  });
});

test('Vec3.toVec2', () => {
  const v = new Vec3(1, 2, 3);
  const actual = v.toVec2();
  const expected = new Vec2(1, 2);
  equalVec2(actual, expected);
});

test('Vec3.toVec4', () => {
  const v = new Vec3(1, 2, 3);
  const actual = v.toVec4(4);
  const expected = new Vec4(1, 2, 3, 4);
  equalVec4(actual, expected);
});

test('Vec2#toArray', () => {
  const v = new Vec3(1, 2, 3);
  const a = v.toArray();
  expect(a.length).toBe(3);
  expect(a[0]).toBeCloseTo(1, CLOSE_DIGITS);
  expect(a[1]).toBeCloseTo(2, CLOSE_DIGITS);
  expect(a[2]).toBeCloseTo(3, CLOSE_DIGITS);
});