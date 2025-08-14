import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { App } from "./app";

const rootEl = document.querySelector("#app-root");

if (!rootEl) throw new Error("Could not find #app-root");

const root = createRoot(rootEl);

root.render(
	<StrictMode>
		<NuqsAdapter>
			<App />
		</NuqsAdapter>
	</StrictMode>,
);
