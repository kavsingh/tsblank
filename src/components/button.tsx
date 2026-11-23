import { omit } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX, ComponentProps } from "@solidjs/web";
import type { VariantProps } from "tailwind-variants";

const buttonClasses = tv({
	base: "rounded-sm border p-2 leading-none transition-colors disabled:pointer-events-none disabled:opacity-60",
	variants: {
		color: {
			primary:
				"border-violet-300 hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
			destructive:
				"border-red-300 hover:border-red-500 dark:border-red-900 dark:hover:border-red-600",
		},
	},
	defaultVariants: {
		color: "primary",
	},
});

interface ButtonProps
	extends
		Omit<ComponentProps<"button">, "class" | "classList">,
		VariantProps<typeof buttonClasses> {
	class?: string | undefined;
}

export function Button(props: ButtonProps): JSX.Element {
	const passProps = omit(props, "class", "color", "type");

	return (
		<button
			{...passProps}
			type={props.type ?? "button"}
			class={buttonClasses({ color: props.color, class: props.class })}
		/>
	);
}
