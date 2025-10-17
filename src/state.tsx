import { parseAsJson, useQueryState } from "nuqs";
import { useSyncExternalStore } from "react";
import * as z from "zod/mini";

const appStateSchema = z.object({
	/** words */
	w: z.array(z.tuple([z.number(), z.string()])),
	/** collections */
	c: z.array(z.tuple([z.number(), z.array(z.number())])),
	/** selection */
	s: z.array(z.number()),
});

const queryParser = parseAsJson((val) => appStateSchema.parse(val)).withDefault(
	{ w: [], c: [], s: [] },
);

export type AppState = z.infer<typeof appStateSchema>;

export function useAppState() {
	const [state, setState] = useQueryState("s", queryParser);

	const stateActions = {
		setWords: (words: string[]) => {
			return setState(() => {
				return {
					w: words.map((w, i): [number, string] => [i + 1, w]),
					s: [],
					c: [],
				};
			});
		},

		toggleWordSelect: (id: number) => {
			return setState((current) => {
				const currentSelection = current.s;
				const selectedIdx = currentSelection.indexOf(id);

				if (selectedIdx === -1) {
					return { ...current, s: [...currentSelection, id] };
				}

				const nextSelection = [...currentSelection];

				nextSelection.splice(selectedIdx, 1);

				return { ...current, s: nextSelection };
			});
		},

		collectSelected: () => {
			return setState((current) => {
				if (!current.s.length) return current;

				const nextCollections = [...current.c];

				nextCollections.push([nextCollections.length + 1, [...current.s]]);

				return { ...current, c: nextCollections, s: [] };
			});
		},

		removeCollection: (id: number) => {
			return setState((current) => {
				const collectionIndex = current.c.findIndex(([cid]) => cid === id);

				if (collectionIndex === -1) return current;

				const nextCollections = [...current.c];

				nextCollections.splice(collectionIndex, 1);

				return { ...current, c: nextCollections };
			});
		},

		moveWordToCollection: (wordId: number, collectionId: number | null) => {
			return setState((current) => {
				const nextCollections: AppState["c"] = [];

				for (const [id, words] of current.c) {
					const wordIdx = words.indexOf(wordId);
					const nextWords = [...words];

					if (collectionId === null && wordIdx !== -1) {
						nextWords.splice(wordIdx, 1);

						if (nextWords.length) nextCollections.push([id, nextWords]);

						continue;
					}

					if (id === collectionId && wordIdx === -1) {
						nextWords.push(wordId);
						nextCollections.push([id, nextWords]);

						continue;
					}

					if (id !== collectionId && wordIdx !== -1) {
						nextWords.splice(wordIdx, 1);

						if (nextWords.length) nextCollections.push([id, nextWords]);

						continue;
					}

					nextCollections.push([id, words]);
				}

				return { ...current, c: nextCollections };
			});
		},
	};

	return [state, stateActions] as const;
}

interface TransientAppState {
	draggingWordId?: number | undefined;
}

function createTransientAppStore() {
	const subscribers = new Set<() => void>();
	let state: TransientAppState = {};

	return {
		subscribe: (subscriber: () => void) => {
			subscribers.add(subscriber);

			return () => {
				subscribers.delete(subscriber);
			};
		},

		read: () => state,

		update: (updater: (current: TransientAppState) => TransientAppState) => {
			state = updater(state);

			for (const subscriber of subscribers) subscriber();
		},
	};
}

const transientAppStore = createTransientAppStore();

function startDragWord(wordId: number) {
	transientAppStore.update((current) => {
		return { ...current, draggingWordId: wordId };
	});
}

function stopDragWord() {
	transientAppStore.update((current) => {
		return { ...current, draggingWordId: undefined };
	});
}

export function useTransientAppState() {
	const state = useSyncExternalStore(
		transientAppStore.subscribe,
		transientAppStore.read,
	);

	const actions = { startDragWord, stopDragWord };

	return [state, actions] as const;
}
