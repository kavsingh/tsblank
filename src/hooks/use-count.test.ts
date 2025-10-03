import { renderHook, act } from "@testing-library/preact";
import { describe, it, expect } from "vitest";

import useCount from "./use-count";

describe(useCount, () => {
	it("increments and decrements count", async () => {
		expect.assertions(3);

		const { result } = renderHook(() => useCount(5));

		expect(result.current.count.value).toBe(5);

		await act(() => void result.current.increment());

		expect(result.current.count.value).toBe(6);

		await act(() => {
			result.current.decrement();
			result.current.decrement();
		});

		expect(result.current.count.value).toBe(4);
	});
});
