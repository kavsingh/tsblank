import { createContext, createMemo, useContext } from "solid-js";

import type { AppStore } from "./create";
import type { JSX, Accessor, ParentProps } from "solid-js";

const AppStoreContext = createContext<Accessor<AppStore> | undefined>(
	undefined,
);

export function AppStoreProvider(
	props: ParentProps<{ store: AppStore }>,
): JSX.Element {
	const store = createMemo(() => props.store);

	return (
		<AppStoreContext.Provider value={store}>
			{props.children}
		</AppStoreContext.Provider>
	);
}

export function useAppStore(): Accessor<AppStore> {
	const store = useContext(AppStoreContext);

	if (!store) {
		throw new Error("useAppStore must be used within AppStoreProvider");
	}

	return store;
}
