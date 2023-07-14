import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userApi } from "./services/user";
import { todosSlice } from "./todos/slice";

const reducer = combineSlices(todosSlice, userApi);

export function createAppStore() {
	const store = configureStore({
		reducer,
		middleware(getDefaultMiddleware) {
			return getDefaultMiddleware().concat(userApi.middleware);
		},
		devTools: !import.meta.env.PROD,
	});

	const removeRtkListeners = setupListeners(store.dispatch);

	function dispose() {
		removeRtkListeners();
	}

	return { store, dispose } as const;
}

export type AppStore = ReturnType<typeof createAppStore>["store"];
export type AppState = ReturnType<AppStore["getState"]>;
