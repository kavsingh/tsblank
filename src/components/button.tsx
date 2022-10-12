import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

import type { JSX } from "solid-js";

export default function Button(
	props: Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "classList">,
) {
	const [local, buttonProps] = splitProps(props, ["class"]);

	return (
		<button
			{...buttonProps}
			class={twMerge(
				"rounded border border-violet-300 p-2 leading-none transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				local.class,
			)}
		/>
	);
}
