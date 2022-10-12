import { z } from "zod";

export const userAddressGeoSchema = z.object({
	lat: z.string(),
	lng: z.string(),
});

export const userCompanySchema = z.object({
	name: z.string(),
	catchPhrase: z.string(),
	bs: z.string(),
});

export const userAddressSchema = z.object({
	street: z.string(),
	suite: z.string(),
	city: z.string(),
	zipcode: z.string(),
	geo: userAddressGeoSchema,
});

export const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	username: z.string(),
	email: z.string(),
	phone: z.string(),
	website: z.string(),
	address: userAddressSchema,
	company: userCompanySchema,
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
export type UserCompany = User["company"];
export type UserAddress = User["address"];
export type UserAddressGeo = User["address"]["geo"];
