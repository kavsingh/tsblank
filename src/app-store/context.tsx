import { createContext, createMemo, useContext } from "solid-js";

import type { AppStore } from "./create";
import type { Accessor, ParentProps } from "solid-js";

export function AppStoreProvider(props: ParentProps<{ store: AppStore }>) {
	const store = createMemo(() => props.store);

	return (
		<AppStoreContext.Provider value={store}>
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

const AppStoreContext = createContext<Accessor<AppStore> | undefined>(
	undefined,
);
