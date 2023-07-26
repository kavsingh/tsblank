/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import {
	createUseEndpointMutation,
	createUseEndpointQuery,
} from "../query-helpers";

import { usersSchema, userSchema } from "./schema";

import type { CreateUser, User } from "./schema";

export const userApi = createApi({
	reducerPath: "userService",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
	}),
	tagTypes: ["Users", "User"],
	endpoints: (builder) => ({
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
			invalidatesTags(user) {
				return user ? ["Users"] : [];
			},
		}),
	}),
});

export const userQuery = userApi.endpoints.user;
export const usersQuery = userApi.endpoints.users;
export const createUserMutation = userApi.endpoints.createUser;
export const userApiUtil = userApi.util;

export const useUserQuery = createUseEndpointQuery(userQuery);
export const useUsersQuery = createUseEndpointQuery(usersQuery);
export const useCreateUserMutation =
	createUseEndpointMutation(createUserMutation);
