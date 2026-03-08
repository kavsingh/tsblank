import { createSignal } from "solid-js";

import { useAppDispatch } from "~/app-store/hooks";
import { addTodo } from "~/app-store/todos/actions";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

import type { JSX } from "solid-js";

export function AddTodo(): JSX.Element {
	const dispatch = useAppDispatch();
	const [description, setDescription] = createSignal("");

	const handleInput: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
		if (event.target instanceof HTMLInputElement) {
			setDescription(event.target.value);
		}
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
					onInput={handleInput}
					autofocus
				/>
			</label>
			<Button type="submit" disabled={!description()}>
				Add todo
			</Button>
		</form>
	);
}
