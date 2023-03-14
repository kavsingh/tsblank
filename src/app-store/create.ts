import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userApi } from "./services/user";
import { todosSlice } from "./todos/slice";

import type { StateFromReducersMapObject } from "@reduxjs/toolkit";

const reducer = {
	[todosSlice.name]: todosSlice.reducer,
	[userApi.reducerPath]: userApi.reducer,
} as const;

export function createAppStore(
	state?: Partial<StateFromReducersMapObject<typeof reducer>> | undefined,
) {
	const preloadedState: StateFromReducersMapObject<typeof reducer> = {
		todos: todosSlice.getInitialState(),
		...state,
	};

	const store = configureStore({
		reducer,
		preloadedState,
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
