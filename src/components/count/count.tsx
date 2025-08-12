import Button from "#components/button";
import useCount from "#hooks/use-count";

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

interface Props {
	initialCount?: number | undefined;
	step?: number | undefined;
}
