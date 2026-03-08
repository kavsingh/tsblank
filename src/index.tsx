import { render } from "solid-js/web";

import "./index.css";
import { App } from "./app";
import { createAppStore } from "./app-store/create";

async function init() {
	if (import.meta.env.DEV) {
		const { worker } = await import("./__mock-api__/browser");

		await worker.start();
	}

	const appRoot = document.querySelector("#app-root");

	if (!appRoot) throw new Error("#app-root not found");

	const { store } = createAppStore();

	render(() => <App store={store} />, appRoot);
}

// oxlint-disable-next-line unicorn/prefer-top-level-await
void init();
