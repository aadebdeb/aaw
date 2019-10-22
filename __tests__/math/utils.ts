import { Vec2 } from '../../src/math/vec2';
import { Vec3 } from '../../src/math/vec3';
import { Vec4 } from '../../src/math/vec4';
import { Mat2, Mat3 } from '../../src/index';
import { Mat4 } from '../../src/math/mat4';
import { Quaternion } from '../../src/math/quaternion';

export const CLOSE_DIGITS = 5;

export function equalVec2(actual: Vec2, expected: Vec2): void {
  expect(actual.x).toBeCloseTo(expected.x, CLOSE_DIGITS);
  expect(actual.y).toBeCloseTo(expected.y, CLOSE_DIGITS);
}

export function equalVec3(actual: Vec3, expected: Vec3): void {
  expect(actual.x).toBeCloseTo(expected.x, CLOSE_DIGITS);
  expect(actual.y).toBeCloseTo(expected.y, CLOSE_DIGITS);
  expect(actual.z).toBeCloseTo(expected.z, CLOSE_DIGITS);
}

export function equalVec4(actual: Vec4, expected: Vec4): void {
  expect(actual.x).toBeCloseTo(expected.x, CLOSE_DIGITS);
  expect(actual.y).toBeCloseTo(expected.y, CLOSE_DIGITS);
  expect(actual.z).toBeCloseTo(expected.z, CLOSE_DIGITS);
  expect(actual.w).toBeCloseTo(expected.w, CLOSE_DIGITS);
}

export function equalMat2(actual: Mat2, expected: Mat2): void {
  expect(actual.elements[0]).toBeCloseTo(expected.elements[0], CLOSE_DIGITS);
  expect(actual.elements[1]).toBeCloseTo(expected.elements[1], CLOSE_DIGITS);
  expect(actual.elements[2]).toBeCloseTo(expected.elements[2], CLOSE_DIGITS);
  expect(actual.elements[3]).toBeCloseTo(expected.elements[3], CLOSE_DIGITS);
}

export function equalMat3(actual: Mat3, expected: Mat3): void {
  expect(actual.elements[0]).toBeCloseTo(expected.elements[0], CLOSE_DIGITS);
  expect(actual.elements[1]).toBeCloseTo(expected.elements[1], CLOSE_DIGITS);
  expect(actual.elements[2]).toBeCloseTo(expected.elements[2], CLOSE_DIGITS);
  expect(actual.elements[3]).toBeCloseTo(expected.elements[3], CLOSE_DIGITS);
  expect(actual.elements[4]).toBeCloseTo(expected.elements[4], CLOSE_DIGITS);
  expect(actual.elements[5]).toBeCloseTo(expected.elements[5], CLOSE_DIGITS);
  expect(actual.elements[6]).toBeCloseTo(expected.elements[6], CLOSE_DIGITS);
  expect(actual.elements[7]).toBeCloseTo(expected.elements[7], CLOSE_DIGITS);
  expect(actual.elements[8]).toBeCloseTo(expected.elements[8], CLOSE_DIGITS);
}

export function equalMat4(actual: Mat4, expected: Mat4): void {
  expect(actual.elements[0]).toBeCloseTo(expected.elements[0], CLOSE_DIGITS);
  expect(actual.elements[1]).toBeCloseTo(expected.elements[1], CLOSE_DIGITS);
  expect(actual.elements[2]).toBeCloseTo(expected.elements[2], CLOSE_DIGITS);
  expect(actual.elements[3]).toBeCloseTo(expected.elements[3], CLOSE_DIGITS);
  expect(actual.elements[4]).toBeCloseTo(expected.elements[4], CLOSE_DIGITS);
  expect(actual.elements[5]).toBeCloseTo(expected.elements[5], CLOSE_DIGITS);
  expect(actual.elements[6]).toBeCloseTo(expected.elements[6], CLOSE_DIGITS);
  expect(actual.elements[7]).toBeCloseTo(expected.elements[7], CLOSE_DIGITS);
  expect(actual.elements[8]).toBeCloseTo(expected.elements[8], CLOSE_DIGITS);
  expect(actual.elements[9]).toBeCloseTo(expected.elements[9], CLOSE_DIGITS);
  expect(actual.elements[10]).toBeCloseTo(expected.elements[10], CLOSE_DIGITS);
  expect(actual.elements[11]).toBeCloseTo(expected.elements[11], CLOSE_DIGITS);
  expect(actual.elements[12]).toBeCloseTo(expected.elements[12], CLOSE_DIGITS);
  expect(actual.elements[13]).toBeCloseTo(expected.elements[13], CLOSE_DIGITS);
  expect(actual.elements[14]).toBeCloseTo(expected.elements[14], CLOSE_DIGITS);
  expect(actual.elements[15]).toBeCloseTo(expected.elements[15], CLOSE_DIGITS);
}

export function equalQuaternion(actual: Quaternion, expected: Quaternion): void {
  expect(actual.x).toBeCloseTo(expected.x, CLOSE_DIGITS);
  expect(actual.y).toBeCloseTo(expected.y, CLOSE_DIGITS);
  expect(actual.z).toBeCloseTo(expected.z, CLOSE_DIGITS);
  expect(actual.w).toBeCloseTo(expected.w, CLOSE_DIGITS);
}