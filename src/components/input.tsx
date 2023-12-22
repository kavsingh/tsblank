import { cva } from "class-variance-authority";
import { splitProps, type JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

import type { VariantProps } from "class-variance-authority";

export default function Input(
	props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "classList"> &
		InputVariantProps,
) {
	const [localProps, inputProps] = splitProps(props, ["status", "class"]);

	return (
		<input
			{...inputProps}
			class={inputClasses({
				status: localProps.status,
				class: localProps.class,
			})}
		>
			{props.children}
		</input>
	);
}

function inputClasses(...args: Parameters<typeof inputVariants>) {
	return twMerge(inputVariants(...args));
}

const inputVariants = cva(
	"border-0 border-b bg-transparent transition-colors focus:outline-none active:outline-none",
	{
		variants: {
			status: {
				default:
					"border-b-violet-300 hover:border-b-violet-500 focus:border-b-violet-500 active:border-b-violet-500 dark:border-b-violet-900 dark:hover:border-b-violet-600 dark:focus:border-b-violet-600 dark:active:border-b-violet-600",
				error:
					"border-b-red-300 hover:border-b-red-500 focus:border-b-red-500 active:border-b-red-500 dark:border-b-red-900 dark:hover:border-b-red-600 dark:focus:border-b-red-600 dark:active:border-b-red-600",
			},
		},
		defaultVariants: {
			status: "default",
		},
	},
);

type InputVariantProps = VariantProps<typeof inputVariants>;
