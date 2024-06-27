// eslint-disable-next-line import-x/no-unresolved
import Button from "#components/button";

export default function Count({ initialCount = 0, step = 1 }: CountProps = {}) {
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
	el.appendChild(decrement);
	el.appendChild(value);
	el.appendChild(increment);

	return { el };
}

export type CountProps = { initialCount?: number; step?: number };

function formatValue(value: number) {
	return String(value).padStart(2, "0");
}
