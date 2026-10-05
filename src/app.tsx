import { Suspense, lazy } from "react";

import type { JSX, PropsWithChildren } from "react";

function Loader() {
	return <div>Loading...</div>;
}

function LazyLoad({ children }: PropsWithChildren) {
	return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

const LazyCount = lazy(async () => {
	const { Count } = await import("~/components/count");

	return { default: Count };
});

export function App(): JSX.Element {
	return (
		<div className="flex flex-col gap-4 p-4 min-block-full">
			<LazyLoad>
				<LazyCount />
			</LazyLoad>
			<LazyLoad>
				<LazyCount initialCount={10} step={5} />
			</LazyLoad>
		</div>
	);
}
