import { createMemo } from "solid-js";

import { useAppStore } from "./context";

import type { AppState } from "./create";

export function useAppSelector<T>(selector: (state: AppState) => T) {
	const value = createMemo(() => selector(useAppStore().state));

	return value;
}

export function useAppDispatch() {
	const { store } = useAppStore();

	return store.dispatch;
}
