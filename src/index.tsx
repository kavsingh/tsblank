import { render } from "solid-js/web";

import "./index.css";
import App from "./app";
import { createAppStore } from "./app-store/create";

async function init() {
	if (import.meta.env.DEV) {
		const { worker } = await import("./__mock-api__/browser");

		await worker.start();
	}

	const appRoot = document.getElementById("app-root");

	if (!appRoot) throw new Error("#app-root not found");

	const { store } = createAppStore();

	render(() => <App store={store} />, appRoot);
}

void init();
