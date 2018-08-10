export const take = <T = any>(num: number, arr: T[]): T[] =>
  num >= 0 ? arr.slice(0, num) : arr.slice(num);
