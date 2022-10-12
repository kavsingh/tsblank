import { createMemo } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { createAppStore } from "./create";

import type { AppState } from "./create";

const { store } = createAppStore();

// structuredClone since immer freezes tree by default, which we want to
// keep. instead of turning off auto-freeze, make sure root object to reconcile
// into is unfrozen, otherwise there will be errors
const [state, setState] = createStore(structuredClone(store.getState()));

store.subscribe(() => {
	setState(reconcile(store.getState()));
});

export function useAppSelector<T>(selector: (state: AppState) => T) {
	const value = createMemo(() => selector(state));

	return value;
}

export function useAppDispatch() {
	return store.dispatch;
}
