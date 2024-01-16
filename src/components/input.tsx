import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { ComponentProps } from "solid-js";
import type { VariantProps } from "tailwind-variants";

export default function Input(
	props: Omit<ComponentProps<"input">, "classList"> &
		VariantProps<typeof inputClasses>,
) {
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

const inputClasses = tv({
	base: "border-0 border-b bg-transparent transition-colors focus:outline-none active:outline-none",
	variants: {
		color: {
			primary:
				"border-b-violet-300 hover:border-b-violet-500 focus:border-b-violet-500 active:border-b-violet-500 dark:border-b-violet-900 dark:hover:border-b-violet-600 dark:focus:border-b-violet-600 dark:active:border-b-violet-600",
			error:
				"border-b-red-300 hover:border-b-red-500 focus:border-b-red-500 active:border-b-red-500 dark:border-b-red-900 dark:hover:border-b-red-600 dark:focus:border-b-red-600 dark:active:border-b-red-600",
		},
	},
	defaultVariants: {
		color: "primary",
	},
});
