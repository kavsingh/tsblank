import { createMemo, createSignal, onCleanup } from "solid-js";

import { useAppStore } from "./context";

import type { AppState, AppStore } from "./create";
import type { Accessor, MemoOptions } from "solid-js";

export function useAppSelector<TSelected>(
	selector: (state: AppState) => TSelected,
	equals?: MemoOptions<TSelected>["equals"],
): Accessor<TSelected> {
	const store = useAppStore();
	const [selected, setSelected] = createSignal<TSelected>(
		selector(store().getState()),
	);
	const result = createMemo(() => selected(), { equals });
	const unsubscribe = store().subscribe(() => {
		setSelected(() => selector(store().getState()));
	});

	onCleanup(unsubscribe);

	return result;
}

export function useAppDispatch(): AppStore["dispatch"] {
	const store = useAppStore();

	return store().dispatch;
}
