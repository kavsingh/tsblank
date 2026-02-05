import { createMemo } from "solid-js";

import { Button } from "~/components/button";
import { useCount } from "~/hooks/use-count";

import type { JSX } from "solid-js";

function formatValue(value: number) {
	return String(value).padStart(2, "0");
}

export interface CountProps {
	initialCount?: number | undefined;
	step?: number | undefined;
}

export function Count(props: CountProps): JSX.Element {
	const [state, { decrement, increment }] = useCount(
		props.initialCount,
		// oxlint-disable-next-line solid/reactivity
		props.step ?? 1,
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
