import { z } from "zod";

const userAddressGeoSchema = z.object({
	lat: z.optional(z.string()),
	lng: z.optional(z.string()),
});

const userCompanySchema = z.object({
	name: z.optional(z.string()),
	catchPhrase: z.optional(z.string()),
	bs: z.optional(z.string()),
});

const userAddressSchema = z.object({
	street: z.optional(z.string()),
	suite: z.optional(z.string()),
	city: z.optional(z.string()),
	zipcode: z.optional(z.string()),
	geo: z.optional(userAddressGeoSchema),
});

const userSchema = z.object({
	id: z.number(),
	name: z.optional(z.string()),
	username: z.optional(z.string()),
	email: z.optional(z.string()),
	phone: z.optional(z.string()),
	website: z.optional(z.string()),
	address: z.optional(userAddressSchema),
	company: z.optional(userCompanySchema),
});

const usersSchema = z.array(userSchema);

const createUserSchema = userSchema.partial().omit({ id: true });

type User = z.infer<typeof userSchema>;
type CreateUser = z.infer<typeof createUserSchema>;

export {
	userAddressGeoSchema,
	userCompanySchema,
	userAddressSchema,
	userSchema,
	usersSchema,
	createUserSchema,
};
export type { User, CreateUser };
