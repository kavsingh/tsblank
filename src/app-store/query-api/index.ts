/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { usersSchema, type User, userSchema } from "./schemas/user";

export const queryApi = createApi({
	reducerPath: "queryApi",
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
	}),
});
