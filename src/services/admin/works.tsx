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
import { AddWorksInput, UpdateWorksInput, WorksTypes } from "../../types/works";

const collectionName = "works"

export const getAllWorks = async (): Promise<
	WorksTypes[]
> => {
	try {
	const querySnapshot = await getDocs(collection(db, collectionName						));
		const tradition: WorksTypes[] = [];

		querySnapshot.docs.forEach((doc) => {
			const data = doc.data();
			const traditionsData: WorksTypes = {
				id: doc.id,
				name: data.name ?? "",
				type:data.type?? "",
				description: data.description ?? "",
				image_path: data.image_path ?? null,

				createdAt: data.createdAt ?? Timestamp.now(),
				updatedAt: data.updatedAt ?? Timestamp.now(),
			};
			tradition.push(traditionsData);
		});

		console.log(tradition, "Fetched Traditions");
		return tradition;
	} catch (error) {
		console.error("Error fetching Tradition:", error);
		throw new Error("Failed to fetch Tradition");
	}
};

export async function getOneWorks(
	traditionId: string
): Promise<WorksTypes | undefined> {
	try {
		const traditionRef = doc(
		collection(db, collectionName						),
			traditionId
		);
		const traditionSnapshot = await getDoc(traditionRef);

		if (traditionSnapshot.exists()) {
			const traditionData = traditionSnapshot.data();
			const tradition: WorksTypes = {
				id: traditionSnapshot.id,
				name: traditionData.name,
				type:traditionData.type,
				description: traditionData.description,
				image_path: traditionData.image_path,

				createdAt: traditionData.createdAt || Timestamp.now(),
				updatedAt: traditionData.updatedAt || Timestamp.now(),
			};
			return tradition;
		} else {
			console.log("error", "No such tradition exists!");
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching tradition:", error);
		throw new Error("Failed to fetch tradition.");
	}
}

export async function createWorks(
	tradition: AddWorksInput,
	traditionId: string,
	imageURL: string | undefined
): Promise<WorksTypes> {
	try {
	const traditionCollection = collection(db, collectionName						);

		const newTraditionRef = doc(
			traditionCollection,
			traditionId
		);

		const newTradition: WorksTypes = {
			id: traditionId,
			name: tradition.name,
			description: tradition.description,
			type:tradition.type,
			image_path: imageURL ? imageURL : null,

			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		};

		await setDoc(newTraditionRef, newTradition);

		return newTradition;
	} catch (error) {
		console.error("Error creating Tradition: ", error);
		throw error;
	}
}


export const updateWorks = async ({
	id,
	works,
}: {
	id: string;
	works: UpdateWorksInput;
}) => {
	try {
		const worksDocRef = doc(db, collectionName, id);
		const currentWorksSnapshot = await getDoc(worksDocRef);

		if (currentWorksSnapshot.exists()) {
			const currentWorksData = currentWorksSnapshot.data();
			const formattedName = works.name.toLowerCase().replace(/ /g, "-");
			const updatedWorksData = {
				...currentWorksData,
				...works,
				name: formattedName,
				updatedAt: Timestamp.now(),
			};

			await updateDoc(worksDocRef, updatedWorksData);
		} else {
			throw new Error("Works does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update Works: " + error);
	}
};

export const deleteWorks = async (
	tradition: WorksTypes
): Promise<void> => {
	try {
	const traditionRef = doc(db, collectionName						, tradition.id);
		await deleteDoc(traditionRef);
		if (tradition.image_path) {
			await deleteAllImage(tradition.image_path);
		}
		console.log("Tradition deleted successfully with ID:", tradition.id);
	} catch (error) {
		console.error("Failed to delete tradition:", error);
		throw new Error("Failed to delete tradition: " + error);
	}
};
