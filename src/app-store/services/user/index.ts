/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import {
	createUseEndpointMutation,
	createUseEndpointQuery,
} from "../query-helpers";

import { usersSchema, userSchema } from "./schemas";

import type { CreateUser, User } from "./schemas";

export const userApi = createApi({
	reducerPath: "userService",
	tagTypes: ["Users", "User"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
	}),
	endpoints(builder) {
		return {
			users: builder.query<User[], void>({
				query() {
					return "users";
				},
				transformResponse(data) {
					return usersSchema.parse(data);
				},
				providesTags(users) {
					return users
						? [
								"Users",
								...users.map(({ id }): { type: "User"; id: number } => {
									return { type: "User", id };
								}),
							]
						: [];
				},
			}),

			user: builder.query<User, number>({
				query(id) {
					return `users/${id}`;
				},
				transformResponse(data) {
					return userSchema.parse(data);
				},
				providesTags(user) {
					return user ? [{ type: "User", id: user.id }] : [];
				},
			}),

			createUser: builder.mutation<User, CreateUser>({
				query(userProps) {
					return { url: "users", method: "post", body: userProps };
				},
				transformResponse(data) {
					return userSchema.parse(data);
				},
				async onQueryStarted(_, api) {
					const result = await api.queryFulfilled;

					api.dispatch(
						userApi.util.updateQueryData("users", undefined, (draft) => {
							draft.push(result.data);
						}),
					);
				},
			}),
		};
	},
});

export const useUserQuery = createUseEndpointQuery(userApi.endpoints.user);
export const useUsersQuery = createUseEndpointQuery(userApi.endpoints.users);
export const useCreateUserMutation = createUseEndpointMutation(
	userApi.endpoints.createUser,
);
