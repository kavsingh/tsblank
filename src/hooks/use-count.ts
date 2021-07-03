import { createSignal } from 'solid-js';

import type { Accessor } from 'solid-js';

export default (
  initialCount = 0,
): [Accessor<number>, { decrement: () => void; increment: () => void }] => {
  const [state, setState] = createSignal(initialCount);
  const decrement = () => setState((count) => count - 1);
  const increment = () => setState((count) => count + 1);

  return [state, { decrement, increment }];
};
