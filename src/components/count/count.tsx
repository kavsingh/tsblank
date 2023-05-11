import useCount from "~/hooks/use-count";

import Button from "../button";

export default function Count({ initialCount = 0, step = 1 }: Props) {
	const { count, increment, decrement } = useCount(initialCount, step);

	return (
		<div className="flex items-center gap-2">
			<Button onClick={decrement}>-</Button>
			{String(count).padStart(2, "0")}
			<Button onClick={increment}>+</Button>
		</div>
	);
}

type Props = { initialCount?: number; step?: number };
