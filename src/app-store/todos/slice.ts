import { createSlice } from "@reduxjs/toolkit";
import { createUniqueId } from "solid-js";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TodosState = { ids: [], entities: {} };

type Id = string;

interface Todo {
	id: Id;
	description: string;
}

interface TodosState {
	ids: Id[];
	entities: Record<Id, Todo>;
}

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo(state, { payload }: PayloadAction<string>) {
			const id = createUniqueId();

			state.ids.push(id);
			state.entities[id] = { id, description: payload };
		},
		removeTodo(state, { payload }: PayloadAction<string>) {
			// should be safe, use of Maps not recommended in redux stores
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			if (payload in state.entities) delete state.entities[payload];

			const idIndex = state.ids.indexOf(payload);

			if (idIndex !== -1) state.ids.splice(idIndex, 1);
		},
	},
	selectors: {
		selectTodoIds(state) {
			return state.ids;
		},
		selectTodo(state, id: string) {
			return state.entities[id];
		},
	},
});

export { todosSlice };
export type { Id, Todo, TodosState };
