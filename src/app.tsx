import { Suspense, lazy } from "react";

import type { JSX, PropsWithChildren } from "react";

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

function Loader() {
	return <div>Loading...</div>;
}

function LazyLoad({ children }: PropsWithChildren) {
	return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

const LazyCount = lazy(async () => {
	const { Count } = await import("#components/count");

	return { default: Count };
});
