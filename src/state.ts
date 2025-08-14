import { parseAsJson, useQueryState } from "nuqs";
import { z } from "zod/mini";

const appStateSchema = z.object({
	/** words */
	w: z.optional(z.array(z.tuple([z.number(), z.string()]))),
	/** collections */
	c: z.optional(z.array(z.tuple([z.number(), z.array(z.number())]))),
	/** selection */
	s: z.optional(z.array(z.number())),
});

const queryParser = parseAsJson((val) => appStateSchema.parse(val)).withDefault(
	{ w: [], c: [], s: [] },
);

export type AppState = z.infer<typeof appStateSchema>;

// oxlint-disable-next-line explicit-module-boundary-types
export function useAppState() {
	const [state, setState] = useQueryState("s", queryParser);

	const stateActions = {
		setWords: (words: string[]) => {
			const withIds = words.map((w, i): [number, string] => [i + 1, w]);

			return setState((current) => ({ ...current, w: withIds }));
		},

		toggleWordSelect: (id: number) => {
			return setState((current) => {
				const currentSelection = current.s;

				if (!currentSelection) return { ...current, s: [id] };

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
				const selected = current.s;

				if (!selected?.length) return current;

				const nextCollections = current.c ? [...current.c] : [];

				nextCollections.push([nextCollections.length + 1, selected]);

				return { ...current, c: nextCollections, s: [] };
			});
		},

		removeCollection: (id: number) => {
			return setState((current) => {
				const currentCollections = current.c;

				if (!currentCollections) return current;

				const collectionIndex = currentCollections.findIndex(
					([cid]) => cid === id,
				);

				if (collectionIndex === -1) return current;

				const nextCollections = [...currentCollections];

				nextCollections.splice(collectionIndex, 1);

				return { ...current, c: nextCollections };
			});
		},
	};

	return [state, stateActions] as const;
}
