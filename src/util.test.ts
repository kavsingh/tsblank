import { take } from './util';

describe('util', () => {
  it('takes elements from an array', () => {
    expect(take<string>(2, ['a', 'b', 'c', 'd'])).toEqual(['a', 'b']);
    expect(take<number>(2, [1, 2, 3])).toEqual([1, 2]);
    expect(take<object>(0, [{ a: 1 }, { b: 2 }])).toEqual([]);
    expect(take(-2, [1, 'a', 5, { a: 1 }])).toEqual([5, { a: 1 }]);
    expect(take(-3, [1, 'a'])).toEqual([1, 'a']);
    // should work but register as type error
    expect(take<number>(2, ['a', 'b', 'c'])).toEqual(['a', 'b']);
  });
});
