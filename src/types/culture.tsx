import { Timestamp } from "firebase/firestore";

export interface CultureTypes {
	id: string;
	name: string;
	description: string;
	type: "rites" | "customs";
	image_path: string[];

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface AddCultureInput
	extends Omit<CultureTypes, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateCultureInput
	extends Omit<CultureTypes, "id" | "createdAt" | "updatedAt"> {}
