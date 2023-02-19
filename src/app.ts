import type { CountProps } from "./components/count";

export default async function App(appRoot: HTMLElement) {
	appRoot.innerHTML = `
		<div data-comp="ui-root" class="flex flex-col gap-4 p-4 min-bs-full"></div>
	`;

	const uiRoot = document.querySelector("[data-comp=ui-root]");

	if (!uiRoot) throw new Error("Could not create ui root");

	await Promise.all([
		LazyCount(),
		LazyCount({ initialCount: 10, step: 5 }),
	]).then((counts) =>
		counts.forEach(({ el }) => {
			uiRoot.appendChild(el);
		}),
	);
}

async function LazyCount(props?: CountProps) {
	const { default: Count } = await import("./components/count");

	return Count(props);
}
