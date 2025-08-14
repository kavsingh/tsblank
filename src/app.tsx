import { useAppState } from "#state";
import { twJoin } from "tailwind-merge";

import type { FormEventHandler, JSX } from "react";

export function App(): JSX.Element {
	return (
		<div className="min-h-full space-y-4 p-4">
			<WordsInput />
			<WordGrid />
			<Collections />
		</div>
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
				className="w-full border-neutral-300 bg-neutral-600 p-1"
				name="available"
			/>
		</form>
	);
}

function WordGrid() {
	const [state, actions] = useAppState();

	return (
		<div className="space-y-2">
			<div className="grid grid-cols-4 grid-rows-4 gap-2">
				{state.w?.map(([id, word]) => {
					const isSelected = state.s?.includes(id);
					const isInCollection = state.c?.some(([, c]) => c.includes(id));

					return (
						<button
							type="button"
							key={id}
							className={twJoin(
								"rounded bg-amber-50 p-2 text-neutral-950 disabled:opacity-20",
								isSelected && "bg-amber-800 text-white",
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
				className="rounded-sm bg-neutral-700 px-2 py-1 text-white disabled:opacity-60"
				onClick={() => void actions.collectSelected()}
				disabled={!state.s?.length}
			>
				collect
			</button>
		</div>
	);
}

function Collections() {
	const [state, actions] = useAppState();

	return (
		<div className="space-y-3">
			{state.c?.map(([collectionId, wordIds]) => {
				return (
					<div key={collectionId} className="flex items-center gap-2">
						{wordIds.map((wordId) => {
							const word = state.w?.find(([id]) => id === wordId)?.[1];

							return <div key={collectionId}>{word}</div>;
						})}
						<button
							type="button"
							className="ms-4 border border-blue-300 p-2 leading-1"
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
