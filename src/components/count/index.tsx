import { createMemo, untrack } from "solid-js";

import { Button } from "~/components/button";
import { useCount } from "~/hooks/use-count";

import type { JSX } from "@solidjs/web";

interface CountProps {
	initialCount?: number | undefined;
	step?: number | undefined;
}

function formatValue(value: number) {
	return String(value).padStart(2, "0");
}

function Count(props: CountProps): JSX.Element {
	const [state, { decrement, increment }] = useCount(
		untrack(() => props.initialCount),
		untrack(() => props.step ?? 1),
	);
	const disableDecrement = createMemo(() => state() <= -20);
	const disableIncrement = createMemo(() => state() >= 20);

	return (
		<div class="flex items-center gap-2">
			<Button onClick={decrement} disabled={disableDecrement()}>
				-
			</Button>
			{formatValue(state())}
			<Button onClick={increment} disabled={disableIncrement()}>
				+
			</Button>
		</div>
	);
}

export { Count };
export type { CountProps };
