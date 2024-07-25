import { GeoPoint, Timestamp } from "firebase/firestore";

export interface HeritageCategory {
	name: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface SitesTypes {
	name: string;
	description: string;
	image_path?: string[];
	location: string;
	designationYear?: number;
	category: HeritageCategory;
	coordinates: GeoPoint;
	createdAt: Timestamp;
	updatedAt: Timestamp;

}
