import { Timestamp } from "firebase/firestore";

export interface LocalKnowledgeTypes {
	id: string;
	name: string;
	description: string;
	type: "local-technology" | "local-knowledges" | "";
	image_path?: string | null;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface AddLocalKnowledgeInput
	extends Omit<LocalKnowledgeTypes, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateLocalKnowledgeInput
	extends Omit<LocalKnowledgeTypes, "id" | "createdAt" | "updatedAt"> {}
