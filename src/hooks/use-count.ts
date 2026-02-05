import { createSignal } from "solid-js";

import type { Accessor } from "solid-js";

export function useCount(
	initialCount = 0,
	step = 1,
): [Accessor<number>, { increment: () => void; decrement: () => void }] {
	const [state, setState] = createSignal(initialCount);

	function increment() {
		setState((count) => count + step);
	}

	function decrement() {
		setState((count) => count - step);
	}

	return [state, { increment, decrement }] as const;
}
