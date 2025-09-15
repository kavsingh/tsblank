import { parseAsJson, useQueryState } from "nuqs";
import { useSyncExternalStore } from "react";
import { z } from "zod/mini";

const appStateSchema = z.object({
	/** words */
	w: z.array(z.tuple([z.number(), z.string()])),
	/** collections */
	c: z.array(z.tuple([z.number(), z.array(z.number())])),
});

export type AppState = z.infer<typeof appStateSchema>;

function getEmptyCollections(): AppState["c"] {
	return [
		// purple
		[4, []],
		// blue
		[3, []],
		// green
		[2, []],
		// yellow
		[1, []],
	];
}

const queryParser = parseAsJson((val) => appStateSchema.parse(val)).withDefault(
	{ w: [], c: getEmptyCollections() },
);

// oxlint-disable-next-line explicit-module-boundary-types
export function useAppState() {
	const [state, setState] = useQueryState("s", queryParser);

	const stateActions = {
		setWords: (words: string[]) => {
			return setState(() => {
				return {
					w: words.map((w, i): [number, string] => [i + 1, w]),
					c: getEmptyCollections(),
				};
			});
		},

		moveWordToCollection: (
			wordId: number,
			collectionId: number | undefined,
		) => {
			// oxlint-disable-next-line max-statements
			return setState((current) => {
				const nextCollections = structuredClone(current.c);

				for (let i = 0; i < nextCollections.length; i++) {
					const collection = nextCollections[i];

					if (!collection) continue;

					const [id, words] = collection;
					const wordIdx = words.indexOf(wordId);
					const nextWords = [...words];

					if (id !== collectionId && wordIdx !== -1) {
						nextWords.splice(wordIdx, 1);
					} else if (id === collectionId && wordIdx === -1) {
						nextWords.push(wordId);
					}

					nextCollections[i] = [id, nextWords];
				}

				return { ...current, c: nextCollections };
			});
		},

		clearCollection: (collectionId: number) => {
			return setState((current) => {
				const nextCollections = structuredClone(current.c);

				for (let i = 0; i < nextCollections.length; i++) {
					const collection = nextCollections[i];

					if (!collection) continue;

					const [id] = collection;

					if (id === collectionId) nextCollections[i] = [id, []];
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

// oxlint-disable-next-line explicit-module-boundary-types
export function useTransientAppState() {
	const state = useSyncExternalStore(
		transientAppStore.subscribe,
		transientAppStore.read,
	);

	const actions = { startDragWord, stopDragWord };

	return [state, actions] as const;
}
