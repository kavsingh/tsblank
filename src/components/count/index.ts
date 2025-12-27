import { Button } from "#components/button";

// oxlint-disable-next-line max-statements
export function Count({ initialCount = 0, step = 1 }: CountProps = {}): {
	el: HTMLDivElement;
} {
	const el = document.createElement("div");
	const value = document.createElement("span");

	function updateValueBy(by: number) {
		return function updateValue() {
			value.innerHTML = formatValue(Number(value.innerHTML) + by);
		};
	}

	const { el: decrement } = Button({
		label: "-",
		onClick: updateValueBy(-1 * step),
	});
	const { el: increment } = Button({
		label: "+",
		onClick: updateValueBy(step),
	});

	value.innerHTML = formatValue(initialCount);
	el.setAttribute("class", "flex items-center gap-2");
	el.append(decrement);
	el.append(value);
	el.append(increment);

	return { el };
}

export interface CountProps {
	initialCount?: number | undefined;
	step?: number | undefined;
}

function formatValue(value: number) {
	return String(value).padStart(2, "0");
}
