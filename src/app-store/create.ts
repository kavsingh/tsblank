import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userApi } from "./services/user";
import { todosSlice } from "./todos/slice";

const reducer = combineSlices(todosSlice, userApi);

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export function createAppStore() {
	const store = configureStore({
		reducer,
		middleware(getDefaultMiddleware) {
			// oxlint-disable-next-line unicorn/prefer-spread
			return getDefaultMiddleware().concat(userApi.middleware);
		},
		devTools: !import.meta.env.PROD,
	});

	const removeQueryListeners = setupListeners(store.dispatch);

	function dispose() {
		removeQueryListeners();
	}

	return { store, dispose } as const;
}

export type AppStore = ReturnType<typeof createAppStore>["store"];
export type AppState = ReturnType<AppStore["getState"]>;
