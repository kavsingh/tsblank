/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import {
	createUseEndpointMutation,
	createUseEndpointQuery,
} from "~/app-store/services/query-helpers";

import { usersSchema, userSchema } from "./schemas";

import type { CreateUser, User } from "./schemas";

const userApi = createApi({
	reducerPath: "userService",
	tagTypes: ["User"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
	}),
	endpoints(builder) {
		return {
			users: builder.query<User[], void>({
				query: () => "users",
				transformResponse: (data) => usersSchema.parse(data),
				providesTags: (users) => {
					return users
						? [
								...users.map(({ id }) => {
									return { type: "User" as const, id };
								}),
								{ type: "User", id: "LIST" },
							]
						: [{ type: "User", id: "LIST" }];
				},
			}),

			user: builder.query<User, number>({
				query: (id) => `users/${id}`,
				transformResponse: (data) => userSchema.parse(data),
				providesTags: (user) => (user ? [{ type: "User", id: user.id }] : []),
			}),

			createUser: builder.mutation<User, CreateUser>({
				query: (userProps) => {
					return { url: "users", method: "post", body: userProps };
				},
				transformResponse: (data) => userSchema.parse(data),
				onQueryStarted: (userProps, api) => {
					const patch = api.dispatch(
						userApi.util.updateQueryData("users", undefined, (draft) => {
							draft.push({ ...userProps, id: Number.NaN });
						}),
					);

					// eslint-disable-next-line promise/prefer-await-to-then
					api.queryFulfilled.catch(patch.undo);
				},
				invalidatesTags: [{ type: "User", id: "LIST" }],
			}),
		};
	},
});

const useUserQuery = createUseEndpointQuery(userApi.endpoints.user);
const useUsersQuery = createUseEndpointQuery(userApi.endpoints.users);
const useCreateUserMutation = createUseEndpointMutation(
	userApi.endpoints.createUser,
);

export { userApi, useUserQuery, useUsersQuery, useCreateUserMutation };
