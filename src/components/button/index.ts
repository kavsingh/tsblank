import { twMerge } from "tailwind-merge";

export default function Button({ label, onClick, className }: ButtonProps) {
	const frag = document.createElement("fragment");

	frag.innerHTML = `
		<button class="${twMerge(
			"flex size-6 items-center justify-center rounded-full border border-violet-300 bg-transparent leading-none text-current transition-colors hover:border-violet-500 dark:border-violet-900 dark:hover:border-violet-600",
			className,
		)}">${label}</button>
	`;

	const el = frag.firstElementChild;

	if (!(el instanceof HTMLButtonElement)) {
		throw new Error("Could not create button");
	}

	el.addEventListener("click", onClick);

	return { el };
}

export type ButtonProps = {
	label: string;
	onClick: ButtonClickHandler;
	className?: string | undefined;
};

export type ButtonClickHandler = (ev: HTMLElementEventMap["click"]) => void;
