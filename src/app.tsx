import { Suspense, lazy } from "react";
import { twMerge } from "tailwind-merge";

import type { PropsWithChildren } from "react";

export default function App() {
	return (
		// forcing twMerge into main chunk to inspect compiled output
		<div className={twMerge("flex min-h-full flex-col gap-4 p-4")}>
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

const LazyCount = lazy(() => import("#components/count/count"));
