import { useState, useCallback } from 'react';

export default (
  initialCount = 0,
): Readonly<{
  count: number;
  increment(): void;
  decrement(): void;
}> => {
  const [count, setCount] = useState(initialCount);
  const increment = useCallback(() => setCount((current) => current + 1), []);
  const decrement = useCallback(() => setCount((current) => current - 1), []);

  return { count, increment, decrement };
};
