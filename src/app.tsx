import { Suspense, lazy } from "solid-js";

import type { ParentProps } from "solid-js";

export default function App() {
	return (
		<div class="flex min-h-full flex-col gap-4 p-4">
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

function LazyLoad(props: ParentProps) {
	return <Suspense fallback={<Loader />}>{props.children}</Suspense>;
}

const LazyCount = lazy(() => import("#components/count"));
