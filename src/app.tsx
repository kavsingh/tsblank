import { useAppState, useTransientAppState } from "#state";
import { useEffect, useRef } from "react";
import { twJoin } from "tailwind-merge";

import type { FormEventHandler, JSX } from "react";

export function App(): JSX.Element {
	return (
		<main className="min-h-full w-full p-4">
			<div className="mx-auto w-full max-w-2xl space-y-8">
				<Cmd />
				<WordsInput />
				<div className="grid grid-cols-8 gap-2">
					<Collections />
					<Words />
				</div>
				<CollectButton />
			</div>
			<DragWord />
		</main>
	);
}

const WORD_SEPARATOR = " | ";
const WORD_COLLECT_CMD = `[...document.querySelectorAll("input[data-testid='card-input']")]
  .map((i) => i.value)
  .join("${WORD_SEPARATOR}");`;

function Cmd() {
	return (
		<button
			type="button"
			className="w-full rounded bg-neutral-950 p-2 text-left"
			onClick={() => {
				void navigator.clipboard.writeText(WORD_COLLECT_CMD);
			}}
		>
			<pre className="w-full text-xs text-wrap text-neutral-400 select-text">
				{WORD_COLLECT_CMD}
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
						.split(WORD_SEPARATOR)
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

// oxlint-disable-next-line max-lines-per-function
function Collections() {
	const [state, actions] = useAppState();
	const [transientState, transientActions] = useTransientAppState();

	return (
		<>
			{state.c.map(([collectionId, wordIds]) => {
				return (
					<div
						key={collectionId}
						className="col-span-8 grid grid-cols-subgrid rounded-lg bg-neutral-800 p-2"
						data-drop-collection={String(collectionId)}
					>
						<div className="col-start-1 col-end-8 flex flex-wrap gap-1">
							{wordIds.map((wordId) => {
								const word = state.w.find(([id]) => id === wordId)?.[1];
								const isDragging = transientState.draggingWordId === wordId;

								return (
									<div
										className={twJoin(
											"flex cursor-grab items-center gap-3 rounded bg-neutral-900 px-3 py-2 text-center text-sm text-white uppercase",
											isDragging && "opacity-40",
										)}
										onMouseDown={() => {
											transientActions.startDragWord(wordId);
										}}
										key={wordId}
									>
										<span>{word}</span>
										<button
											type="button"
											className="size-5 items-center text-xs leading-1"
											onClick={() => {
												void actions.moveWordToCollection(wordId, undefined);
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
		<div
			className="col-span-8 grid grid-cols-subgrid gap-y-2"
			data-drop-collection="null"
		>
			{words.map(([id, word]) => {
				const isSelected = state.s.includes(id);

				return (
					<button
						type="button"
						key={id}
						className={twJoin(
							"col-span-2 rounded border bg-amber-50/80 px-2 py-6 text-lg font-bold text-neutral-950 uppercase transition-colors duration-300",
							isSelected && "border-teal-900 bg-teal-900 text-white",
						)}
						onClick={() => {
							void actions.toggleWordSelect(id);
						}}
					>
						{word}
					</button>
				);
			})}
		</div>
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

// oxlint-disable-next-line max-lines-per-function
function DragWord() {
	const [appState, appActions] = useAppState();
	const [state, actions] = useTransientAppState();
	const draggingId = state.draggingWordId;
	const draggingRef = useRef<HTMLDivElement | null>(null);
	const stopDrag = actions.stopDragWord;
	const moveWord = appActions.moveWordToCollection;

	useEffect(() => {
		if (!draggingId) return;

		function drag(event: PointerEvent) {
			const el = draggingRef.current;

			if (!el) return;

			el.style.opacity = "1";
			el.style.top = `${event.clientY}px`;
			el.style.left = `${event.clientX}px`;
		}

		function endDrag(event: PointerEvent) {
			if (!draggingId) return;

			const candidates = [
				...document.querySelectorAll("[data-drop-collection]"),
			];

			const target = candidates.find((el) => {
				if (!(el instanceof HTMLElement)) return false;

				const rect = el.getBoundingClientRect();

				return (
					event.clientX >= rect.left &&
					event.clientX <= rect.right &&
					event.clientY >= rect.top &&
					event.clientY <= rect.bottom
				);
			});

			if (!(target instanceof HTMLElement)) return;

			const collectionData = target.dataset["drop-collection"];

			if (!collectionData) return;

			if (collectionData === "null") void moveWord(draggingId, undefined);
			else void moveWord(draggingId, Number(collectionData));

			stopDrag();
		}

		globalThis.window.addEventListener("pointermove", drag);
		globalThis.window.addEventListener("pointerup", endDrag);

		return () => {
			globalThis.window.removeEventListener("pointermove", drag);
			globalThis.window.removeEventListener("pointerup", endDrag);
			stopDrag();
		};
	}, [draggingId, stopDrag, moveWord]);

	if (!draggingId) return;

	return (
		<div
			className="absolute rounded bg-neutral-900 px-3 py-4 text-center text-sm leading-1 text-white uppercase opacity-0 shadow transition-opacity"
			ref={draggingRef}
		>
			{appState.w.find(([id]) => draggingId === id)?.[1]}
		</div>
	);
}
