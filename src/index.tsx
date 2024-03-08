import { render } from "preact";

import "./index.css";
import App from "./app";

const rootEl = document.getElementById("app-root");

if (!rootEl) throw new Error("Could not find #app-root");

render(<App />, rootEl);
