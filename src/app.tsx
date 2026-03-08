import { AppStoreProvider } from "~/app-store/context";
import { Things } from "~/pages/things";

import type { JSX } from "solid-js";
import type { AppStore } from "~/app-store/create";

export function App(props: { store: AppStore }): JSX.Element {
	return (
		<AppStoreProvider store={props.store}>
			<div class="flex min-h-full flex-col gap-4 p-4">
				<Things />
			</div>
		</AppStoreProvider>
	);
}
