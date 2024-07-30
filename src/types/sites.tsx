import { Timestamp } from "firebase/firestore";

export interface SitesTypes {
	id: string;
	name: string;
	description: string;
	catchphrase: string;
	image_path?: string[];
	location: string;
	embedded_maplink: string;
	designationYear?: number;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface AddSiteInput
	extends Omit<SitesTypes, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateSiteInput
	extends Omit<SitesTypes, "id" | "createdAt" | "updatedAt"> {}
