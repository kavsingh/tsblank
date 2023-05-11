import { useState, useCallback } from "react";

export default function useCount(initialCount = 0, step = 1) {
	const [count, setCount] = useState(initialCount);
	const increment = useCallback(
		() => setCount((current) => current + step),
		[step],
	);
	const decrement = useCallback(
		() => setCount((current) => current - step),
		[step],
	);

	return { count, increment, decrement } as const;
}
