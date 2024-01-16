import { AppStoreProvider } from "#app-store/context";
import Things from "#pages/things";

import type { AppStore } from "#app-store/create";

export default function App(props: { store: AppStore }) {
	return (
		<AppStoreProvider store={props.store}>
			<div class="flex min-h-full flex-col gap-4 p-4">
				<Things />
			</div>
		</AppStoreProvider>
	);
}
