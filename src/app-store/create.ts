import { configureStore } from "@reduxjs/toolkit";

import { todosSlice } from "./todos/slice";

import type { StateFromReducersMapObject } from "@reduxjs/toolkit";

const reducer = {
	[todosSlice.name]: todosSlice.reducer,
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
		devTools: !import.meta.env.PROD,
	});

	return { store };
}

export type AppStore = ReturnType<typeof createAppStore>["store"];
export type AppState = ReturnType<AppStore["getState"]>;
