import { AppStoreProvider } from "#app-store/context";
import { createAppStore } from "#app-store/create";
import Todos from "#pages/todos";

const { store } = createAppStore();

export default function App() {
	return (
		<AppStoreProvider store={store}>
			<div class="flex min-h-full flex-col gap-4 p-4">
				<Todos />
			</div>
		</AppStoreProvider>
	);
}
