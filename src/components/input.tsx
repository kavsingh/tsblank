import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { ComponentProps, JSX } from "solid-js";
import type { VariantProps } from "tailwind-variants";

const inputClasses = tv({
	base: "border-0 border-be bg-transparent transition-colors focus:outline-none active:outline-none",
	variants: {
		color: {
			primary:
				"border-be-violet-300 hover:border-be-violet-500 focus:border-be-violet-500 active:border-be-violet-500 dark:border-be-violet-900 dark:hover:border-be-violet-600 dark:focus:border-be-violet-600 dark:active:border-be-violet-600",
			error:
				"border-be-red-300 hover:border-be-red-500 focus:border-be-red-500 active:border-be-red-500 dark:border-be-red-900 dark:hover:border-be-red-600 dark:focus:border-be-red-600 dark:active:border-be-red-600",
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

export function Input(
	props: Omit<ComponentProps<"input">, "classList"> &
		VariantProps<typeof inputClasses>,
): JSX.Element {
	const [local, inputProps] = splitProps(props, ["class", "color"]);

	return (
		<input
			{...inputProps}
			class={inputClasses({ color: local.color, class: local.class })}
		>
			{props.children}
		</input>
	);
}
