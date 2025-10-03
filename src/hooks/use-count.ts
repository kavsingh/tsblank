import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";

export default function useCount(initialCount = 0, step = 1) {
	const count = useSignal(initialCount);
	const increment = useCallback(() => (count.value += step), [count, step]);
	const decrement = useCallback(() => (count.value -= step), [count, step]);

	return { count, increment, decrement } as const;
}
