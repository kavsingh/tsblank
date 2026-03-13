import { useState } from "react";

interface UseCount {
	count: number;
	increment: () => void;
	decrement: () => void;
}

export function useCount(initialCount = 0, step = 1): UseCount {
	const [count, setCount] = useState(initialCount);

	function increment() {
		setCount((current) => current + step);
	}

	function decrement() {
		setCount((current) => current - step);
	}

	return { count, increment, decrement };
}
