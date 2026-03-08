import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX, ComponentProps } from "solid-js";
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

export function Button(
	props: Omit<ComponentProps<"button">, "classList"> &
		VariantProps<typeof buttonClasses>,
): JSX.Element {
	const [local, buttonProps] = splitProps(props, ["class", "color", "type"]);

	return (
		<button
			{...buttonProps}
			type={local.type ?? "button"}
			class={buttonClasses({ color: local.color, class: local.class })}
		/>
	);
}
