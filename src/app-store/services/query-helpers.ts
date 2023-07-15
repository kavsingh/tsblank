import { onCleanup } from "solid-js";

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
		...[queryArg, ...rest]: Parameters<(typeof endpoint)["initiate"]>
	) {
		const dispatch = useAppDispatch();
		const subscription = dispatch(endpoint.initiate(queryArg, ...rest));
		const result = useAppSelector(endpoint.select(queryArg));

		onCleanup(() => {
			subscription.unsubscribe();
		});

		return result;
	};
}
