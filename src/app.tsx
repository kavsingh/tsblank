import { Loading, lazy } from "solid-js";

import type { JSX } from "@solidjs/web";
import type { ParentProps } from "solid-js";

function Loader() {
	return <div>Loading...</div>;
}

function LazyLoad(props: ParentProps) {
	return <Loading fallback={<Loader />}>{props.children}</Loading>;
}

const LazyCount = lazy(async () => {
	const { Count } = await import("~/components/count");

	return { default: Count };
});

export function App(): JSX.Element {
	return (
		<div class="flex flex-col gap-4 p-4 min-block-full">
			<LazyLoad>
				<LazyCount />
			</LazyLoad>
			<LazyLoad>
				<LazyCount initialCount={10} step={5} />
			</LazyLoad>
		</div>
	);
}
