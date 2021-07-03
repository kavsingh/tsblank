import { renderHook, act } from '@testing-library/react-hooks';

import useCount from './use-count';

describe('useCount', () => {
  it('increments and decrements count', () => {
    const { result } = renderHook(() => useCount(5));

    expect(result.current.count).toBe(5);

    act(() => result.current.increment());

    expect(result.current.count).toBe(6);

    act(() => result.current.decrement());

    expect(result.current.count).toBe(5);
  });
});
