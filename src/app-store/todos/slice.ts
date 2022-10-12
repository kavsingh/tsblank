import { createSlice } from "@reduxjs/toolkit";
import { createUniqueId } from "solid-js";

import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TodosState = { ids: [], entities: {} };

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo(state, { payload }: PayloadAction<string>) {
			const id = createUniqueId();

			state.ids.push(id);
			state.entities[id] = { id, description: payload };
		},
		removeTodo(state, { payload }: PayloadAction<string>) {
			if (payload in state.entities) state.entities[payload] = undefined;

			if (state.ids.includes(payload)) {
				state.ids = state.ids.filter((id) => id !== payload);
			}
		},
	},
});

type Todo = {
	id: Id;
	description: string;
};

type TodosState = {
	ids: Id[];
	entities: Record<Id, Todo | undefined>;
};

type Id = string;
