import AddTodo from "./add-todo";
import TodoList from "./todo-list";
import User from "./user";

export default function Todos() {
	return (
		<>
			<User />
			<AddTodo />
			<TodoList />
		</>
	);
}
