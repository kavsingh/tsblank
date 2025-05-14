import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "solid-js";

export default function Button(props: ComponentProps<"button">) {
	const [local, buttonProps] = splitProps(props, ["class"]);

	return (
		<button
			{...buttonProps}
			class={twMerge(
				"flex size-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				local.class,
			)}
		/>
	);
}
