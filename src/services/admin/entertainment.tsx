import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { deleteAllImage } from "../image";
import {
	AddEntertainmentInput,
	EntertainmentTypes,
	UpdateEntertainmentInput,
} from "../../types/entertainment";

const collectionName = "entertainments";

export const getAllEntertainment = async (): Promise<EntertainmentTypes[]> => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const EntertainmentsData: EntertainmentTypes[] = [];

		querySnapshot.docs.forEach((doc) => {
			const data = doc.data();
			const entertainments: EntertainmentTypes = {
				id: doc.id,
				name: data.name ?? "",
				type: data.type ?? "",
				description: data.description ?? "",
				image_path: data.image_path ?? null,

				createdAt: data.createdAt ?? Timestamp.now(),
				updatedAt: data.updatedAt ?? Timestamp.now(),
			};
			EntertainmentsData.push(entertainments);
		});

		console.log(EntertainmentsData, "Fetched Entertainments");
		return EntertainmentsData;
	} catch (error) {
		console.error("Error fetching LocalKnowledge:", error);
		throw new Error("Failed to fetch LocalKnowledge");
	}
};

export async function getOneEntertainments(
	entertainmentsId: string
): Promise<EntertainmentTypes | undefined> {
	try {
		const entertainmentsDocRef = doc(
			collection(db, collectionName),
			entertainmentsId
		);
		const entertainmentsSnapshot = await getDoc(entertainmentsDocRef);

		if (entertainmentsSnapshot.exists()) {
			const entertainmentsData = entertainmentsSnapshot.data();
			const entertainments: EntertainmentTypes = {
				id: entertainmentsSnapshot.id,
				name: entertainmentsData.name,
				type: entertainmentsData.type,
				description: entertainmentsData.description,
				image_path: entertainmentsData.image_path,

				createdAt: entertainmentsData.createdAt || Timestamp.now(),
				updatedAt: entertainmentsData.updatedAt || Timestamp.now(),
			};
			return entertainments;
		} else {
			console.log("error", "No such entertainments exists!");
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching entertainments:", error);
		throw new Error("Failed to fetch entertainments.");
	}
}

export async function createEntertainments(
	entertainmentsInput: AddEntertainmentInput,
	entertainmentsId: string,
	imageURL: string | undefined
): Promise<EntertainmentTypes> {
	try {
		const entertainmentsCollection = collection(db, collectionName);

		const newEntertainmentsRef = doc(
			entertainmentsCollection,
			entertainmentsId
		);

		const newEntertainments: EntertainmentTypes = {
			id: entertainmentsId,
			name: entertainmentsInput.name,
			description: entertainmentsInput.description,
			type: entertainmentsInput.type,
			image_path: imageURL ? imageURL : null,

			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		};

		await setDoc(newEntertainmentsRef, newEntertainments);

		return newEntertainments;
	} catch (error) {
		console.error("Error creating Entertainments: ", error);
		throw error;
	}
}

export const updateEntertainment = async ({
	id,
	entertainment,
}: {
	id: string;
	entertainment: UpdateEntertainmentInput;
}) => {
	try {
		const entertainmentDocRef = doc(db, collectionName, id);
		const currentEntertainmentSnapshot = await getDoc(entertainmentDocRef);

		if (currentEntertainmentSnapshot.exists()) {
			const currentEntertainmentData = currentEntertainmentSnapshot.data();
			const formattedName = entertainment.name.toLowerCase().replace(/ /g, "-");
			const updatedEntertainmentData = {
				...currentEntertainmentData,
				...entertainment,
				name: formattedName,
				updatedAt: Timestamp.now(),
			};

			await updateDoc(entertainmentDocRef, updatedEntertainmentData);
		} else {
			throw new Error("Entertainment does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update Entertainment: " + error);
	}
};

export const deleteEntertainments = async (
	entertainment: EntertainmentTypes
): Promise<void> => {
	try {
		const entertainmentsDocRef = doc(db, collectionName, entertainment.id);
		await deleteDoc(entertainmentsDocRef);
		if (entertainment.image_path) {
			await deleteAllImage(entertainment.image_path);
		}
		console.log(
			"Entertainments deleted successfully with ID:",
			entertainment.id
		);
	} catch (error) {
		console.error("Failed to delete entertainments:", error);
		throw new Error("Failed to delete entertainments: " + error);
	}
};
