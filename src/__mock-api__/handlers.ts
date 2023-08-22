import { http, HttpResponse } from "msw";
import { z } from "zod";

import {
	userSchema,
	createUserSchema,
} from "../app-store/services/user/schema";
import { type User } from "../app-store/services/user/schema";

export const handlers = [
	http.get("https://jsonplaceholder.typicode.com/users", () => {
		return HttpResponse.json(sessionUsers);
	}),
	http.get("https://jsonplaceholder.typicode.com/users/*", (info) => {
		const { id } = getUserParams.parse(info.params);
		const user = sessionUsers.find((u) => u.id === Number(id));

		return user ? HttpResponse.json(user) : HttpResponse.error();
	}),
	http.post("https://jsonplaceholder.typicode.com/user", async (info) => {
		const userParams = createUserSchema.parse(await info.request.json());
		const newUser: User = { ...userParams, id: sessionUsers.length };

		sessionUsers.push(newUser);

		return HttpResponse.json(newUser);
	}),
];

const getUserParams = z.object({ id: z.string() });

const sessionUsers = z.array(userSchema).parse([
	{
		id: 1,
		name: "User1 Test",
		username: "user1",
		email: "user1@test.com",
		address: {
			street: "Test street 1",
			suite: "1",
			city: "Test City",
			zipcode: "1234",
			geo: { lat: "0", lng: "0" },
		},
		phone: "123456",
		website: "https://user1.com",
		company: {
			name: "corpo",
			catchPhrase: "corpwaffle",
			bs: "bs",
		},
	},
	{
		id: 2,
		name: "User2 Test",
		username: "user2",
		email: "user2@test.com",
		address: {
			street: "Test street 2",
			suite: "2",
			city: "Test City",
			zipcode: "5678",
			geo: { lat: "1", lng: "1" },
		},
		phone: "654321",
		website: "https://user2.com",
		company: {
			name: "bizzo",
			catchPhrase: "bizzpablum",
			bs: "bs",
		},
	},
] satisfies User[]);
