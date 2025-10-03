import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";

import type { Signal } from "@preact/signals";

export function useCount(
	initialCount = 0,
	step = 1,
): { count: Signal<number>; increment: () => void; decrement: () => void } {
	const count = useSignal(initialCount);
	const increment = useCallback(
		() => void (count.value += step),
		[count, step],
	);
	const decrement = useCallback(
		() => void (count.value -= step),
		[count, step],
	);

	return { count, increment, decrement };
}
