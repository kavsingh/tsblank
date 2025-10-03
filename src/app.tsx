import { Suspense, lazy } from "preact/compat";

import type { JSX } from "preact";

function Loader() {
	return <div>Loading...</div>;
}

function LazyLoad({ children }: { children: JSX.Element }) {
	return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

const LazyCount = lazy(async () => {
	const imported = await import("~/components/count");

	return imported.Count;
});

export function App(): JSX.Element {
	return (
		<div className="flex min-h-full flex-col gap-4 p-4">
			<LazyLoad>
				<LazyCount />
			</LazyLoad>
			<LazyLoad>
				<LazyCount initialCount={10} step={5} />
			</LazyLoad>
		</div>
	);
}
