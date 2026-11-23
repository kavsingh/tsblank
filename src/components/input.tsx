import { omit } from "solid-js";
import { tv } from "tailwind-variants";

import type { ComponentProps, JSX } from "@solidjs/web";
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

interface InputProps
	extends
		Omit<ComponentProps<"input">, "class" | "classList">,
		VariantProps<typeof inputClasses> {
	class?: string | undefined;
}

export function Input(props: InputProps): JSX.Element {
	const passProps = omit(props, "class", "color");

	return (
		<input
			{...passProps}
			class={inputClasses({ color: props.color, class: props.class })}
		>
			{props.children}
		</input>
	);
}
