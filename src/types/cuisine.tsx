import { Timestamp } from "firebase/firestore";

export interface Recipe {
	ingredients: string[];
	steps: string[];
}

export interface CuisineTypes {
	id: string;
	name: string;
	description: string;
	duration: number;
	image_path: string | null;
	recipe: Recipe | null;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface AddCuisineInput
	extends Omit<CuisineTypes, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateCuisineInput
	extends Omit<CuisineTypes, "id" | "createdAt" | "updatedAt"> {}
