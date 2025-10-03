import { twMerge } from "tailwind-merge";

import type { ComponentProps, JSX } from "preact";

export function Button({
	className,
	type = "button",
	...props
}: Omit<ComponentProps<"button">, "className"> & {
	className?: string | undefined;
}): JSX.Element {
	return (
		<button
			{...props}
			// oxlint-disable-next-line react/button-has-type
			type={type}
			className={twMerge(
				"flex size-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				className,
			)}
		/>
	);
}
