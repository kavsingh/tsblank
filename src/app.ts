import type { CountProps } from "#components/count";

export async function App(appRoot: HTMLElement): Promise<void> {
	appRoot.innerHTML = `
		<div class="flex min-h-full flex-col gap-4 p-4"></div>
	`;

	const uiRoot = appRoot.firstElementChild;

	if (!uiRoot) throw new Error("Could not create ui root");

	const counts = await Promise.all([
		LazyCount(),
		LazyCount({ initialCount: 10, step: 5 }),
	]);

	for (const { el } of counts) uiRoot.append(el);
}

async function LazyCount(props?: CountProps) {
	const { Count } = await import("#components/count");

	return Count(props);
}
