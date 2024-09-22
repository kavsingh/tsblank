import { useState } from "react";

export default function useCount(initialCount = 0, step = 1) {
	const [count, setCount] = useState(initialCount);

	function increment() {
		setCount((current) => current + step);
	}

	function decrement() {
		setCount((current) => current - step);
	}

	return { count, increment, decrement } as const;
}
