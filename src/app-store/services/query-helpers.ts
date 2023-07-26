import { createSignal, onCleanup, createMemo } from "solid-js";

import { useAppStore } from "../context";
import { useAppDispatch, useAppSelector } from "../hooks";

import type {
	ApiEndpointQuery,
	ApiEndpointMutation,
	EndpointDefinitions,
	QueryDefinition,
	MutationDefinition,
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

export function createUseEndpointMutation<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Definition extends MutationDefinition<any, any, any, any, any>,
	Definitions extends EndpointDefinitions,
>(endpoint: ApiEndpointMutation<Definition, Definitions>) {
	return function useEndpointMutation(
		options?: Parameters<(typeof endpoint)["initiate"]>[1],
	) {
		const store = useAppStore();
		const [requestId, setRequestId] = createSignal<string>();

		async function mutate(arg: Parameters<(typeof endpoint)["initiate"]>[0]) {
			const init = endpoint.initiate(arg, options);
			const request = init(
				store.dispatch.bind(store),
				store.getState.bind(store),
				undefined,
			);

			setRequestId(request.requestId);

			return request;
		}

		const state = createMemo(() => {
			return endpoint.select({
				requestId: requestId(),
				fixedCacheKey: options?.fixedCacheKey,
			})(store.getState());
		});

		return [mutate, state] as const;
	};
}
