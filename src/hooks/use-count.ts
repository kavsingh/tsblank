import { createSignal } from "solid-js";

export default function useCount(initialCount = 0, step = 1) {
	const [state, setState] = createSignal(initialCount);

	function increment() {
		setState((count) => count + step);
	}

	function decrement() {
		setState((count) => count - step);
	}

	return [state, { increment, decrement }] as const;
}
