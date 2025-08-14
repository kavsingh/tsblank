import { parseAsJson, useQueryState } from "nuqs";
import { twJoin } from "tailwind-merge";
import { z } from "zod/mini";

import type { FormEventHandler, JSX } from "react";

const stateSchema = z.object({
	/** words */
	w: z.optional(z.array(z.tuple([z.number(), z.string()]))),
	/** collections */
	c: z.optional(z.array(z.array(z.number()))),
	/** selection */
	s: z.optional(z.array(z.number())),
});

const validator = stateSchema.parse.bind(stateSchema);

// oxlint-disable-next-line max-lines-per-function
export function App(): JSX.Element {
	const [state, setState] = useQueryState("s", parseAsJson(validator));

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
						.map((w, i): [number, string] => [i, w])
				: undefined;

		if (nextWords) void setState((current) => ({ ...current, w: nextWords }));
	};

	return (
		<div className="min-h-full space-y-4 p-4">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="w-full border-neutral-300 bg-neutral-600 p-1"
					name="available"
				/>
			</form>
			<div className="grid grid-cols-4 grid-rows-4 gap-2">
				{state?.w?.map(([id, word]) => {
					const selectedIdx = state.s ? state.s.indexOf(id) : -1;
					const isSelected = selectedIdx !== -1;
					const isInCollection = state.c?.some((c) => c.includes(id));

					return (
						<button
							type="button"
							key={id}
							className={twJoin(
								"rounded bg-amber-50 p-2 text-neutral-950 disabled:opacity-20",
								isSelected && "bg-amber-800 text-white",
							)}
							onClick={() => {
								if (selectedIdx === -1) {
									void setState((current) => ({
										...current,
										s: [...(current?.s ?? []), id],
									}));
								} else {
									void setState((current) => {
										const next = [...(current?.s ?? [])];

										next.splice(selectedIdx, 1);

										return { ...current, s: next };
									});
								}
							}}
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
				onClick={() => {
					if (!state?.s?.length) return;

					const collect = [...state.s];

					void setState((current) => {
						const collections = current?.c ?? [];

						collections.push(collect);

						return { ...current, s: [], c: collections };
					});
				}}
				disabled={!state?.s?.length}
			>
				collect
			</button>
			<div className="space-y-3">
				{state?.c?.map((collection, i) => {
					return (
						// oxlint-disable-next-line no-array-index-key
						<div key={i} className="flex items-center gap-2">
							{collection.map((id) => {
								const w = state.w?.find(([wi]) => wi === id)?.[1];

								return <div key={id}>{w}</div>;
							})}
							<button
								type="button"
								className="ms-4 border border-blue-300 p-2 leading-1"
								onClick={() => {
									void setState((current) => {
										const nextCollections = [...(current?.c ?? [])];

										nextCollections.splice(i, 1);

										return { ...current, c: nextCollections };
									});
								}}
							>
								clear
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
