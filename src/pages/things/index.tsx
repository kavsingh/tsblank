import AddTodo from "./add-todo";
import AddUser from "./add-user";
import TodoList from "./todo-list";
import UserList from "./user-list";

export default function Things() {
	return (
		<div class="grid w-full grid-cols-[1fr_1fr] gap-4">
			<div>
				<AddTodo />
				<TodoList />
			</div>
			<div>
				<AddUser />
				<UserList />
			</div>
		</div>
	);
}
