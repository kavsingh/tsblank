import { twMerge } from "tailwind-merge";

import type { ComponentProps, JSX } from "react";

export function Button({
	className,
	type = "button",
	...props
}: ComponentProps<"button">): JSX.Element {
	return (
		<button
			{...props}
			// oxlint-disable-next-line button-has-type
			type={type}
			className={twMerge(
				"flex items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors block-6 inline-6 hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				className,
			)}
		/>
	);
}
