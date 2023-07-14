import { http, HttpResponse } from "msw";

import { userSchema, type User } from "../app-store/services/user/schema";

const testUser1 = userSchema.parse({
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
} satisfies User);

export const handlers = [
	http.get("https://jsonplaceholder.typicode.com/users", () => {
		return HttpResponse.json([testUser1]);
	}),
	http.get("https://jsonplaceholder.typicode.com/users/*", () => {
		return HttpResponse.json(testUser1);
	}),
];
