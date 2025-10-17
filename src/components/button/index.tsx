import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "preact";

export default function Button({
	className,
	...props
}: Omit<ComponentProps<"button">, "className"> & {
	className?: string | undefined;
}) {
	return (
		<button
			{...props}
			className={twMerge(
				"flex size-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				className,
			)}
		/>
	);
}
