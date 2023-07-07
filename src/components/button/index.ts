export default function Button({ label, onClick }: ButtonProps) {
	const frag = document.createElement("fragment");

	frag.innerHTML = `
		<button class="flex h-6 w-6 items-center leading-none justify-center text-current font-inherit bg-transparent border border-violet-300 rounded-full transition-colors dark:border-violet-900 hover:border-violet-500 dark:hover:border-violet-600">${label}</button>
	`;

	const el = frag.firstElementChild;

	if (!(el instanceof HTMLButtonElement)) {
		throw new Error("Could not create button");
	}

	el.addEventListener("click", onClick);

	return { el };
}

export type ButtonProps = { label: string; onClick: ButtonClickHandler };

export type ButtonClickHandler = (ev: HTMLElementEventMap["click"]) => void;
