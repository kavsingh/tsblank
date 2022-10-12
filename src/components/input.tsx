import type { JSX } from "solid-js";

export default function Input(
	props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class">,
) {
	return (
		<input
			{...props}
			class={`
				border-0
				border-b
				border-b-violet-300
				bg-transparent
				hover:border-b-violet-500
				focus:border-b-violet-500
				focus:outline-none
				active:border-b-violet-500
				active:outline-none
				dark:border-b-violet-900
				dark:hover:border-b-violet-600
				dark:focus:border-b-violet-600
				dark:active:border-b-violet-600
			`}
		>
			{props.children}
		</input>
	);
}
