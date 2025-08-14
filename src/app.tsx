import { useAppState } from "#state";
import { twJoin } from "tailwind-merge";

import type { FormEventHandler, JSX } from "react";

export function App(): JSX.Element {
	return (
		<main className="min-h-full w-full p-4">
			<div className="mx-auto w-full max-w-2xl space-y-8">
				<pre className="w-full text-xs text-wrap text-neutral-400">
					{`Array.from(document.querySelectorAll("input[data-testid='card-input']")).map((i) => i.value).join(" ");`}
				</pre>
				<WordsInput />
				<WordGrid />
				<Collections />
			</div>
		</main>
	);
}

function WordsInput() {
	const [, actions] = useAppState();
	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const wordsValue = formData.get("available");
		const nextWords =
			typeof wordsValue === "string"
				? wordsValue
						.split(/\s/)
						.map((p) => p.trim().toLowerCase())
						.filter(Boolean)
				: undefined;

		if (nextWords) void actions.setWords(nextWords);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="w-full rounded-lg border-neutral-800 bg-neutral-800 p-1 focus-within:border-neutral-50 focus-within:bg-transparent"
				name="available"
			/>
		</form>
	);
}

function WordGrid() {
	const [state, actions] = useAppState();

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-4 grid-rows-4 gap-2">
				{state.w.map(([id, word]) => {
					const isSelected = state.s.includes(id);
					const isInCollection = state.c.some(([, c]) => c.includes(id));

					return (
						<button
							type="button"
							key={id}
							className={twJoin(
								"rounded border bg-amber-50/80 px-7 py-6 text-lg font-bold text-neutral-950 uppercase transition-all duration-300 disabled:scale-50 disabled:border-transparent disabled:bg-transparent disabled:text-neutral-600",
								isSelected && "border-teal-900 bg-teal-900 text-white",
							)}
							onClick={() => void actions.toggleWordSelect(id)}
							disabled={isInCollection}
						>
							{word}
						</button>
					);
				})}
			</div>
			<button
				type="button"
				className="mx-auto block rounded-sm bg-neutral-700 px-4 py-3 text-white disabled:opacity-60"
				onClick={() => void actions.collectSelected()}
				disabled={!state.s.length}
			>
				Collect
			</button>
		</div>
	);
}

function Collections() {
	const [state, actions] = useAppState();

	return (
		<div>
			{state.c.map(([collectionId, wordIds]) => {
				return (
					<div
						key={collectionId}
						className="flex items-center justify-end gap-2 border-t border-t-neutral-800 py-2"
					>
						{wordIds.map((wordId) => {
							const word = state.w.find(([id]) => id === wordId)?.[1];

							return (
								<div
									className="rounded bg-neutral-800 px-3 py-2 text-sm text-white uppercase"
									key={collectionId}
								>
									{word}
								</div>
							);
						})}
						<button
							type="button"
							className="ms-4 rounded border border-neutral-600 p-3 text-sm leading-1"
							onClick={() => void actions.removeCollection(collectionId)}
						>
							clear
						</button>
					</div>
				);
			})}
		</div>
	);
}
