import { For, Show } from "solid-js";

import { useAppDispatch, useAppSelector } from "#app-store/hooks";
import { removeTodo } from "#app-store/todos/actions";
import Button from "#components/button";

export default function TodoList() {
	const ids = useAppSelector((state) => state.todos.ids);

	return (
		<div class="flex flex-col gap-1">
			<For each={ids()}>{(id) => <Todo id={id} />}</For>
		</div>
	);
}

function Todo(props: { id: string }) {
	const dispatch = useAppDispatch();
	const todo = useAppSelector((state) => state.todos.entities[props.id]);

	return (
		<Show when={todo()} keyed>
			{({ id, description }) => (
				<div>
					<div>{description}</div>
					<Button onClick={[dispatch, removeTodo(id)]}>Remove</Button>
				</div>
			)}
		</Show>
	);
}
