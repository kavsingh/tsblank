import "./index.css";
import { App } from "./app";

const appRoot = document.querySelector("#app-root");

if (!(appRoot instanceof HTMLElement)) {
	throw new TypeError("Could not find root element #app-root");
}

void App(appRoot);
