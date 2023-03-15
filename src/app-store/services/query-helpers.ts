import { createMemo, onCleanup } from "solid-js";

import { useAppDispatch, useAppSelector } from "../hooks";

import type {
	ApiEndpointQuery,
	EndpointDefinitions,
	QueryDefinition,
} from "@reduxjs/toolkit/query";

export function createUseEndpointQuery<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Definition extends QueryDefinition<any, any, any, any, any>,
	Definitions extends EndpointDefinitions,
>(endpoint: ApiEndpointQuery<Definition, Definitions>) {
	return function useEndpointQuery(
		...args: Parameters<(typeof endpoint)["initiate"]>
	) {
		const dispatch = useAppDispatch();
		const state = useAppSelector((appState) => appState);
		const subscription = dispatch(endpoint.initiate(...args));
		const result = createMemo(() => endpoint.select(args[0])(state()));

		onCleanup(() => {
			subscription.unsubscribe();
		});

		return result;
	};
}
