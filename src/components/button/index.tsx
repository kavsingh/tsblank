import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import type { ButtonHTMLAttributes } from "react";

const Button = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement>
>(function ButtonComponent({ className, ...props }, ref) {
	return (
		<button
			{...props}
			ref={ref}
			className={twMerge(
				"flex size-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
				className,
			)}
		/>
	);
});

Button.displayName = "Button";

export default Button;
