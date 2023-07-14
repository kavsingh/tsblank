import { render } from "solid-js/web";

import "./index.css";
import App from "./app";
import { createAppStore } from "./app-store/create";

const appRoot = document.getElementById("app-root");

if (!appRoot) throw new Error("#app-root not found");

const { store } = createAppStore();

render(() => <App store={store} />, appRoot);
