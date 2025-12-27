import "./index.css";
import { App } from "./app";

const appRoot = document.querySelector("#app-root");

if (!(appRoot instanceof HTMLElement)) {
	throw new Error("Could not find root element #app-root");
}

void App(appRoot);
