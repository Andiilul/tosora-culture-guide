import { Timestamp } from "firebase/firestore";

export interface EntertainmentTypes {
	id: string;
	name: string;
	description: string;
	type: "Arts" | "Folk-Games" | "Traditional-Sports";
	image_path?: string | null;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface AddEntertainmentInput
	extends Omit<EntertainmentTypes, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateEntertainmentInput
	extends Omit<EntertainmentTypes, "id" | "createdAt" | "updatedAt"> {}