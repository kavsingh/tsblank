import { z } from "zod";

export const userAddressGeoSchema = z.object({
	lat: z.optional(z.string()),
	lng: z.optional(z.string()),
});

export const userCompanySchema = z.object({
	name: z.optional(z.string()),
	catchPhrase: z.optional(z.string()),
	bs: z.optional(z.string()),
});

export const userAddressSchema = z.object({
	street: z.optional(z.string()),
	suite: z.optional(z.string()),
	city: z.optional(z.string()),
	zipcode: z.optional(z.string()),
	geo: z.optional(userAddressGeoSchema),
});

export const userSchema = z.object({
	id: z.number(),
	name: z.optional(z.string()),
	username: z.optional(z.string()),
	email: z.optional(z.string()),
	phone: z.optional(z.string()),
	website: z.optional(z.string()),
	address: z.optional(userAddressSchema),
	company: z.optional(userCompanySchema),
});

export const usersSchema = z.array(userSchema);

export const createUserSchema = userSchema.partial().omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
