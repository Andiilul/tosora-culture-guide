import { Timestamp } from "firebase/firestore";

export interface JournalTypes {
	name: string;
	link: string;
	updatedAt: Timestamp;
}
