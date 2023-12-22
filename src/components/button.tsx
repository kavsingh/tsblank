import { cva } from "class-variance-authority";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

import type { VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";

export default function Button(
	props: Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "classList"> &
		ButtonVariantProps,
) {
	const [localProps, buttonProps] = splitProps(props, [
		"class",
		"type",
		"intent",
	]);

	return (
		<button
			{...buttonProps}
			type={localProps.type ?? "button"}
			class={buttonClasses({
				intent: localProps.intent,
				class: localProps.class,
			})}
		/>
	);
}

function buttonClasses(...args: Parameters<typeof buttonVariants>) {
	return twMerge(buttonVariants(...args));
}

const buttonVariants = cva(
	"rounded border p-2 leading-none transition-colors disabled:pointer-events-none disabled:opacity-60",
	{
		variants: {
			intent: {
				primary:
					"border-violet-300 hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				destructive:
					"border-red-300 hover:border-red-500 dark:border-red-900 dark:hover:border-red-600",
			},
		},
		defaultVariants: {
			intent: "primary",
		},
	},
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
