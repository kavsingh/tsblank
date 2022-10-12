import { For } from "solid-js";

import { useAppSelector } from "#app-store/hooks";

import Todo from "./todo";

export default function TodoList() {
	const ids = useAppSelector((state) => state.todos.ids);

	return (
		<div class="flex flex-col gap-1">
			<For each={ids()}>{(id) => <Todo id={id} />}</For>
		</div>
	);
}
