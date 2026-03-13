import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { useCount } from "./use-count";

describe(useCount, () => {
	it("increments and decrements count", () => {
		expect.assertions(3);

		const { result } = renderHook(() => useCount(5));

		expect(result.current.count).toBe(5);

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(6);

		act(() => {
			result.current.decrement();
			result.current.decrement();
		});

		expect(result.current.count).toBe(4);
	});
});
