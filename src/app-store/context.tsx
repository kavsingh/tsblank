import { createContext, createMemo, useContext } from "solid-js";

import type { AppStore } from "./create";
import type { JSX } from "@solidjs/web";
import type { Accessor, ParentProps } from "solid-js";

const AppStoreContext = createContext<Accessor<AppStore> | undefined>(
	undefined,
);

function AppStoreProvider(
	props: ParentProps<{ store: AppStore }>,
): JSX.Element {
	const store = createMemo(() => props.store);

	return <AppStoreContext value={store}>{props.children}</AppStoreContext>;
}

function useAppStore(): Accessor<AppStore> {
	const store = useContext(AppStoreContext);

	if (!store) {
		throw new Error("useAppStore must be used within AppStoreProvider");
	}

	return store;
}

export { AppStoreProvider, useAppStore };
