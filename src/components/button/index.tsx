import { forwardRef } from "react";

import type { ButtonHTMLAttributes } from "react";

const Button = forwardRef<
	HTMLButtonElement,
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">
>(function ButtonComponent(props, ref) {
	return (
		<button
			{...props}
			ref={ref}
			className="flex h-6 w-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600"
		/>
	);
});

Button.displayName = "Button";

export default Button;
