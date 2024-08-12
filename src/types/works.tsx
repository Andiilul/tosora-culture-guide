import { Timestamp } from "firebase/firestore";

export interface WorksTypes {
	id: string;
	name: string;
	description: string;
	type: "Manuskrip" | "Lisan";
	image_path?: string | null;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface AddWorksInput
	extends Omit<WorksTypes, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateWorksInput
	extends Omit<WorksTypes, "id" | "createdAt" | "updatedAt"> {}
