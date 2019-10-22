import { vec2, Vec2 } from '../../src/math/vec2';
import { Vec3 } from '../../src/math/vec3';
import { Vec4 } from '../../src/math/vec4';
import { Mat2 } from '../../src/math/mat2';
import { equalVec2, equalVec3, equalVec4, CLOSE_DIGITS } from './utils';

describe('vec2', () => {
  test('vec2(1) => Vec2(1, 1)', () => {
    const actual = vec2(1);
    const expected = new Vec2(1, 1);
    equalVec2(actual, expected);
  });

  test('vec2(1, 2) => Vec2(1, 2)', () => {
    const actual = vec2(1, 2);
    const expected = new Vec2(1, 2);
    equalVec2(actual, expected);
  });

  test('vec2(Vec2(1, 2)) => Vec2(1, 2)', () => {
    const actual = vec2(new Vec2(1, 2));
    const expected = new Vec2(1, 2);
    equalVec2(actual, expected);
  });
});

test('new Vec2', () => {
  const v = new Vec2(1, 2);
  expect(v.x).toBeCloseTo(1, CLOSE_DIGITS);
  expect(v.y).toBeCloseTo(2, CLOSE_DIGITS);
});

test('Vec2.fromArray', () => {
  const actual = Vec2.fromArray([1, 2]);
  const expected = new Vec2(1, 2);
  equalVec2(actual, expected);
});

describe('Vec2.add', () => {
  it('adds a Vec2 and a number', () => {
    const actual = Vec2.add(new Vec2(1, 2), 3);
    const expected = new Vec2(4, 5);
    equalVec2(actual, expected);
  });
  it('adds a Vec2 and another Vec2', () => {
    const actual = Vec2.add(new Vec2(1, 2), new Vec2(3, 4));
    const expected = new Vec2(4, 6);
    equalVec2(actual, expected);
  });
});

describe('Vec2.sub', () => {
  it('subtracts a number from a number', () => {
    const acutal = Vec2.sub(new Vec2(1, 2), 3);
    const expected = new Vec2(-2, -1);
    equalVec2(acutal, expected);
  });
  it('subtracts a Vec2 from another Vec2', () => {
    const acutal = Vec2.sub(new Vec2(1, 2), new Vec2(4, 3));
    const expected = new Vec2(-3, -1);
    equalVec2(acutal, expected);
  });
});

describe('Vec2.mul', () => {
  it('multiplies a Vec2 by number', () => {
    const actual = Vec2.mul(new Vec2(2, 3), 4);
    const expected = new Vec2(8, 12);
    equalVec2(actual, expected);
  });
  it('multiplies a Vec2 by another Vec2', () => {
    const actual = Vec2.mul(new Vec2(2, 3), new Vec2(4, 5));
    const expected = new Vec2(8, 15);
    equalVec2(actual, expected);
  });
  it('multiplies a Vec2 by Mat2', () => {
    const m = Mat2.fromElements(new Float32Array([1, 2, 3, 4]));
    const actual = Vec2.mul(new Vec2(1, 2), m);
    const expected = new Vec2(7, 10);
    equalVec2(actual, expected);
  });
});

describe('Vec2.div', () => {
  test('divides a Vec2 by number', () => {
    const actual = Vec2.div(new Vec2(2, 3), 4);
    const exptected = new Vec2(2 / 4, 3 / 4);
    equalVec2(actual, exptected);
  });
  test('divides a Vec2 by another Vec2', () => {
    const actual = Vec2.div(new Vec2(2, 3), new Vec2(4, 5));
    const exptected = new Vec2(2 / 4, 3 / 5);
    equalVec2(actual, exptected);
  });
});

test('Vec2.negative', () => {
  const actual = Vec2.negative(new Vec2(1, 2));
  const expected = new Vec2(-1, -2);
  equalVec2(actual, expected);
});

test('Vec2.zero', () => {
  const actual = Vec2.zero;
  const expected = new Vec2(0, 0);
  equalVec2(actual, expected);
});

test('Vec2.one', () => {
  const actual = Vec2.one;
  const exptected = new Vec2(1, 1);
  equalVec2(actual, exptected);
});

test('Vec2.fill', () => {
  const actual = Vec2.fill(10);
  const expected = new Vec2(10, 10);
  equalVec2(actual, expected);
});

test('Vec2.left', () => {
  const actual = Vec2.left;
  const expected = new Vec2(-1, 0);
  equalVec2(actual, expected);
});

test('Vec2.right', () => {
  const actual = Vec2.right;
  const expected = new Vec2(1, 0);
  equalVec2(actual, expected);
});

test('Vec2.down', () => {
  const actual = Vec2.down;
  const expected = new Vec2(0, -1);
  equalVec2(actual, expected);
})

test('Vec2.up', () => {
  const acutal = Vec2.up;
  const expected = new Vec2(0, 1);
  equalVec2(acutal, expected);
});

test('Vec2.dot', () => {
  const actual = Vec2.dot(new Vec2(1, 2), new Vec2(3, 4));
  const expected = 11;
  expect(expected).toBeCloseTo(actual, CLOSE_DIGITS);
});

test('Vec2#x', () => {
  const v = new Vec2(1, 2);
  expect(v.x).toBeCloseTo(1, CLOSE_DIGITS);
});

test('Vec2#y', () => {
  const v = new Vec2(1, 2);
  expect(v.y).toBeCloseTo(2, CLOSE_DIGITS);
});

describe('Vec2#add', () => {
  it('adds a scalar', () => {
    const actual = new Vec2(1, 2);
    actual.add(3);
    const expected = new Vec2(4, 5);
    equalVec2(actual, expected);
  });
  it('adds a Vec2', () => {
    const actual = new Vec2(1, 2);
    actual.add(new Vec2(3, 4));
    const expected = new Vec2(4, 6);
    equalVec2(actual, expected);
  });
  it('returns myself when adding a scalar', () => {
    const v = new Vec2(1, 2);
    expect(v.add(3)).toBe(v);
  });
  it('returns myself when adding a Vec2', () => {
    const v = new Vec2(1, 2);
    expect(v.add(new Vec2(3, 4))).toBe(v);
  });
});

describe('Vec2#sub', () => {
  it('subtracts a scalar', () => {
    const actual = new Vec2(1, 2);
    actual.sub(3);
    const expected = new Vec2(-2, -1);
    equalVec2(actual, expected);
  });
  it('subtracts a Vec2', () => {
    const actual = new Vec2(1, 2);
    actual.sub(new Vec2(4, 3));
    const expected = new Vec2(-3, -1);
    equalVec2(actual, expected);
  });
  it('returns myself when subtracting a scalar', () => {
    const v = new Vec2(1, 2);
    expect(v.sub(3)).toBe(v);
  });
  it('returns myself when subtracting a Vec2', () => {
    const v = new Vec2(1, 2);
    expect(v.sub(new Vec2(3, 4))).toBe(v);
  });
});

describe('Vec2#mul', () => {
  it('multiplies by a scalar', () => {
    const actual = new Vec2(2, 3);
    actual.mul(4);
    const expected = new Vec2(8, 12);
    equalVec2(actual, expected);
  });
  it('multiplies by a Vec2', () => {
    const actual = new Vec2(2, 3);
    actual.mul(new Vec2(4, 5));
    const expected = new Vec2(8, 15);
    equalVec2(actual, expected);
  });
  it('multiplies by Mat2', () => {
    const m = Mat2.fromElements(new Float32Array([1, 2, 3, 4]));
    const actual = new Vec2(1, 2);
    actual.mul(m);
    const expected = new Vec2(7, 10);
    equalVec2(actual, expected);
  });
  it('returns myself when multiplying by a scalar', () => {
    const v = new Vec2(2, 3);
    expect(v.mul(4)).toBe(v);
  });
  it('returns myself when multiplying by a Vec2', () => {
    const v = new Vec2(2, 3);
    expect(v.mul(new Vec2(4, 5))).toBe(v);
  });
  it('returns myself when multiplying by a Mat2', () => {
    const m = Mat2.fromElements(new Float32Array([1, 2, 3, 4]));
    const v = new Vec2(2, 3);
    expect(v.mul(m)).toBe(v);
  });
});

describe('Vec2#div', () => {
  it('divided by a scalar', () => {
    const actual = new Vec2(2, 3);
    actual.div(5);
    const expected = new Vec2(0.4, 0.6);
    equalVec2(actual, expected);
  });
  it('divided by a Vec2', () => {
    const actual = new Vec2(2, 3);
    actual.div(new Vec2(4, 5));
    const expected = new Vec2(0.5, 0.6);
    equalVec2(actual, expected);
  });
  it('returns myself when dividing a scalar', () => {
    const v = new Vec2(2, 3);
    expect(v.div(5)).toBe(v);
  });
  it('returns myself when dividing a Vec2', () => {
    const v = new Vec2(2, 3);
    expect(v.div(new Vec2(4, 5))).toBe(v);
  });
});

describe('Vec2#negative', () => {
  it('negatived', () => {
    const actual = new Vec2(1, 2);
    actual.negative();
    const expected = new Vec2(-1, -2);
    equalVec2(actual, expected);
  });
  it ('returns myself', () => {
    const v = new Vec2(1, 2);
    expect(v.negative()).toBe(v);
  });
});

test('Vec2#sqMag', () => {
  const v = new Vec2(1, 2);
  expect(v.sqMag()).toBeCloseTo(5, CLOSE_DIGITS);
});

test('Vec2#mag', () => {
  const v = new Vec2(1, 2);
  expect(v.mag()).toBeCloseTo(Math.sqrt(5), CLOSE_DIGITS);
});

describe('Vec2#norm', () => {
  it('return normalized vector', () => {
    const actual = new Vec2(3, 4);
    actual.norm();
    equalVec2(actual, new Vec2(3 / 5, 4 / 5));
  });
  it('returns myself', () => {
    const v = new Vec2(3, 9);
    expect(v.norm()).toBe(v);
  });
});

describe('Vec2#clone', () => {
  it('returns vector with same values', () => {
    const v = new Vec2(1, 2);
    const actual = v.clone();
    equalVec2(actual, v);
  });
  it('returns a different object', () => {
    const v = new Vec2(1, 2);
    const actual = v.clone();
    expect(actual).not.toBe(v);
  });
});

test('Vec2#toVec3', () => {
  const v = new Vec2(1, 2);
  const actual = v.toVec3(3);
  const expected = new Vec3(1, 2, 3);
  equalVec3(actual, expected);
});

test('Vec2#toVec4', () => {
  const v = new Vec2(1, 2);
  const actual = v.toVec4(3, 4);
  const expected = new Vec4(1, 2, 3, 4);
  equalVec4(actual, expected);
});

test('Vec2#toArray', () => {
  const v = new Vec2(1, 2);
  const a = v.toArray();
  expect(a.length).toBe(2);
  expect(a[0]).toBeCloseTo(1, CLOSE_DIGITS);
  expect(a[1]).toBeCloseTo(2, CLOSE_DIGITS);
});