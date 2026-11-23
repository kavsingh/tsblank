import {
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	untrack,
} from "solid-js";

import { useAppStore } from "./context";

import type { AppState, AppStore } from "./create";
import type { Accessor, MemoOptions } from "solid-js";

function useAppSelector<TSelected>(
	selector: (appState: AppState) => TSelected,
	memoOptions?: MemoOptions<TSelected>,
): Accessor<TSelected> {
	const store = useAppStore();
	const [appState, setAppState] = createSignal(
		untrack(() => store()).getState(),
	);
	const result = createMemo(() => selector(appState()), memoOptions);
	// oxlint-disable-next-line eslint/init-declarations
	let unsubscribe: (() => void) | undefined;

	createEffect(store, (s) => {
		unsubscribe = s.subscribe(() => {
			setAppState(() => s.getState());
		});
	});

	onCleanup(() => unsubscribe?.());

	return result;
}

function useAppDispatch(): AppStore["dispatch"] {
	const store = useAppStore();

	return untrack(() => store().dispatch);
}

export { useAppSelector, useAppDispatch };
