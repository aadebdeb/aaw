export function isNumber(v: unknown): v is number {
  // ref: https://github.com/jonschlinkert/is-number/blob/master/index.js
  return typeof v === 'number' && v - v === 0;
}