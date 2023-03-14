import { createContext, onCleanup, useContext } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import type { AppStore } from "./create";
import type { ParentProps } from "solid-js";

export function AppStoreProvider(props: ParentProps<{ store: AppStore }>) {
	// eslint-disable-next-line solid/reactivity
	const { state, dispose } = observeReduxStore(props.store);

	onCleanup(dispose);

	return (
		// eslint-disable-next-line solid/reactivity
		<AppStoreContext.Provider value={{ store: props.store, state }}>
			{props.children}
		</AppStoreContext.Provider>
	);
}

export function useAppStore() {
	const store = useContext(AppStoreContext);

	if (!store) {
		throw new Error("useAppStore must be used within AppStoreProvider");
	}

	return store;
}

function observeReduxStore(store: AppStore) {
	// structuredClone since immer freezes tree by default, which we want to
	// keep. instead of turning off auto-freeze, make sure root object to
	// reconcile into is unfrozen, otherwise there will be errors
	const initialState = structuredClone(store.getState());
	const [state, setState] = createStore(initialState);
	const dispose = store.subscribe(() => {
		setState(reconcile(store.getState()));
	});

	return { state, dispose } as const;
}

const AppStoreContext = createContext<AppStoreValue | undefined>(undefined);

type AppStoreValue = Readonly<{
	store: AppStore;
	state: ReturnType<AppStore["getState"]>;
}>;
