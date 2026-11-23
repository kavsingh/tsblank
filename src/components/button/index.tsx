import { omit } from "solid-js";
import { cn } from "tailwind-variants";

import type { ComponentProps, JSX } from "@solidjs/web";

interface ButtonProps extends Omit<ComponentProps<"button">, "class"> {
	class?: string | undefined;
}

export function Button(props: ButtonProps): JSX.Element {
	const passProps = omit(props, "class");

	return (
		<button
			{...passProps}
			class={cn(
				"flex items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors block-6 inline-6 hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				props.class,
			)}
		/>
	);
}
