import { cn } from "tailwind-variants";

type ButtonClickHandler = (ev: HTMLElementEventMap["click"]) => void;

interface ButtonProps {
	label: string;
	onClick: ButtonClickHandler;
	className?: string | undefined;
}

function Button({ label, onClick, className }: ButtonProps): {
	el: HTMLButtonElement;
} {
	const frag = document.createElement("fragment");
	const classNames = cn(
		"flex items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors block-6 inline-6 hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
		className,
	);

	frag.innerHTML = `
		<button class="${classNames}">${label}</button>
	`;

	const el = frag.firstElementChild;

	if (!(el instanceof HTMLButtonElement)) {
		throw new TypeError("Could not create button");
	}

	el.addEventListener("click", onClick);

	return { el };
}

export { Button };
export type { ButtonProps, ButtonClickHandler };
