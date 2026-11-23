import { flush } from "solid-js";
import { describe, it, expect } from "vitest";

import { useCount } from "./use-count";

describe(useCount, () => {
	it("increments and decrements count", () => {
		expect.assertions(3);

		const [state, { decrement, increment }] = useCount(2);

		expect(state()).toBe(2);

		increment();
		flush();

		expect(state()).toBe(3);

		decrement();
		flush();

		expect(state()).toBe(2);
	});
});
