import type { JSX } from "preact/jsx-runtime";

export default function Button(
	props: Omit<JSX.HTMLAttributes<HTMLButtonElement>, "className">,
) {
	return (
		<button
			{...props}
			className="flex size-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600"
		/>
	);
}
