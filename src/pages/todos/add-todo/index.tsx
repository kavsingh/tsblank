import { createSignal } from "solid-js";

import { useAppDispatch } from "#app-store/hooks";
import { addTodo } from "#app-store/todos/actions";
import Button from "#components/button";
import Input from "#components/input";

import type { JSX } from "solid-js";

export default function AddTodo() {
	const dispatch = useAppDispatch();
	const [description, setDescription] = createSignal("");

	const handleInput: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
		setDescription((event.target as HTMLInputElement).value);
	};

	const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = (event) => {
		event.preventDefault();

		const todoDescription = description();

		if (!todoDescription) return;

		dispatch(addTodo(todoDescription));
		setDescription("");
	};

	return (
		<form onSubmit={handleSubmit} class="flex items-center gap-2">
			<label for="todo-description" class="flex items-center gap-2">
				Description
				<Input
					id="todo-description"
					name="todo-description"
					value={description()}
					onChange={handleInput}
					autofocus
				/>
			</label>
			<Button type="submit">Add todo</Button>
		</form>
	);
}
