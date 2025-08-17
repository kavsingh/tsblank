import { useAppState } from "#state";
import { twJoin } from "tailwind-merge";

import type { FormEventHandler, JSX } from "react";

export function App(): JSX.Element {
	return (
		<main className="min-h-full w-full p-4">
			<div className="mx-auto w-full max-w-2xl space-y-8">
				<Cmd />
				<WordsInput />
				<div className="grid auto-rows-max grid-cols-8 gap-2">
					<Collections />
					<Words />
				</div>
				<CollectButton />
			</div>
		</main>
	);
}

const cmd = `Array.from(document.querySelectorAll("input[data-testid='card-input']")).map((i) => i.value).join(" ");`;

function Cmd() {
	return (
		<button
			type="button"
			onClick={() => {
				void navigator.clipboard.writeText(cmd);
			}}
		>
			<pre className="w-full text-left text-xs text-wrap text-neutral-400">
				{cmd}
			</pre>
		</button>
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

function Collections() {
	const [state, actions] = useAppState();

	return (
		<>
			{state.c.map(([collectionId, wordIds]) => {
				return (
					<div
						key={collectionId}
						className="col-span-8 grid grid-cols-subgrid rounded-lg bg-neutral-800 p-2"
					>
						<div className="col-start-1 col-end-8 flex flex-wrap gap-1">
							{wordIds.map((wordId) => {
								const word = state.w.find(([id]) => id === wordId)?.[1];

								return (
									<div
										className="flex items-center gap-3 rounded bg-neutral-900 px-3 py-2 text-center text-sm text-white uppercase"
										key={wordId}
									>
										<span>{word}</span>
										<button
											className="size-5 items-center text-xs leading-1"
											onClick={() => {
												void actions.moveWordToCollection(wordId, null);
											}}
										>
											×
										</button>
									</div>
								);
							})}
						</div>
						<div className="col-start-8 col-end-9 mt-1.5 flex justify-end">
							<button
								type="button"
								className="size-6 rounded-full border border-neutral-600 text-sm leading-1"
								onClick={() => void actions.removeCollection(collectionId)}
							>
								×
							</button>
						</div>
					</div>
				);
			})}
		</>
	);
}

function Words() {
	const [state, actions] = useAppState();
	const words = state.w.filter(([id]) => {
		return !state.c.some(([, wordIds]) => wordIds.includes(id));
	});

	return (
		<>
			{words.map(([id, word]) => {
				const isSelected = state.s.includes(id);

				return (
					<button
						type="button"
						key={id}
						className={twJoin(
							"col-span-2 rounded border bg-amber-50/80 px-7 py-6 text-lg font-bold text-neutral-950 uppercase transition-colors duration-300",
							isSelected && "border-teal-900 bg-teal-900 text-white",
						)}
						onClick={() => void actions.toggleWordSelect(id)}
					>
						{word}
					</button>
				);
			})}
		</>
	);
}

function CollectButton() {
	const [state, actions] = useAppState();

	return (
		<button
			type="button"
			className="mx-auto block rounded-sm bg-neutral-700 px-4 py-3 text-white disabled:opacity-60"
			onClick={() => void actions.collectSelected()}
			disabled={state.s.length === 0}
		>
			Collect
		</button>
	);
}
