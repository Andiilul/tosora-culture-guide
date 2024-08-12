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
import {
	AddLocalKnowledgeInput,
	LocalKnowledgeTypes,
	UpdateLocalKnowledgeInput,
} from "../../types/local-knowledge";
import { db } from "../../config/firebaseConfig";
import { deleteAllImage } from "../image";

const collectionName = "wisdom"

export const getAllLocalKnowledge = async (): Promise<
	LocalKnowledgeTypes[]
> => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const LocalKnowledge: LocalKnowledgeTypes[] = [];

		querySnapshot.docs.forEach((doc) => {
			const data = doc.data();
			const localKnowledge: LocalKnowledgeTypes = {
				id: doc.id,
				name: data.name ?? "",
				type:data.type?? "",
				description: data.description ?? "",
				image_path: data.image_path ?? null,

				createdAt: data.createdAt ?? Timestamp.now(),
				updatedAt: data.updatedAt ?? Timestamp.now(),
			};
			LocalKnowledge.push(localKnowledge);
		});

		console.log(LocalKnowledge, "Fetched LocalKnowledges");
		return LocalKnowledge;
	} catch (error) {
		console.error("Error fetching LocalKnowledge:", error);
		throw new Error("Failed to fetch LocalKnowledge");
	}
};

export async function getOneLocalKnowledge(
	localKnowledgeId: string
): Promise<LocalKnowledgeTypes | undefined> {
	try {
		const localKnowledgeDocRef = doc(
			collection(db, collectionName),
			localKnowledgeId
		);
		const localKnowledgeSnapshot = await getDoc(localKnowledgeDocRef);

		if (localKnowledgeSnapshot.exists()) {
			const localKnowledgeData = localKnowledgeSnapshot.data();
			const localKnowledge: LocalKnowledgeTypes = {
				id: localKnowledgeSnapshot.id,
				name: localKnowledgeData.name,
				type:localKnowledgeData.type,
				description: localKnowledgeData.description,
				image_path: localKnowledgeData.image_path,

				createdAt: localKnowledgeData.createdAt || Timestamp.now(),
				updatedAt: localKnowledgeData.updatedAt || Timestamp.now(),
			};
			return localKnowledge;
		} else {
			console.log("error", "No such site exists!");
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching site:", error);
		throw new Error("Failed to fetch site.");
	}
}

export async function createLocalKnowledge(
	localKnowledge: AddLocalKnowledgeInput,
	localKnowledgeId: string,
	imageURL: string | undefined
): Promise<LocalKnowledgeTypes> {
	try {
		const localKnowledgeCollection = collection(db, collectionName);

		const newLocalKnowledgeRef = doc(
			localKnowledgeCollection,
			localKnowledgeId
		);

		const newLocalKnowledge: LocalKnowledgeTypes = {
			id: localKnowledgeId,
			name: localKnowledge.name,
			description: localKnowledge.description,
			type:localKnowledge.type,
			image_path: imageURL ? imageURL : null,

			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		};

		await setDoc(newLocalKnowledgeRef, newLocalKnowledge);

		return newLocalKnowledge;
	} catch (error) {
		console.error("Error creating Local Knowledge: ", error);
		throw error;
	}
}

export const updateLocalKnowledge = async ({
	id,
	wisdoms,
}: {
	id: string;
	wisdoms: UpdateLocalKnowledgeInput;
}) => {
	try {
		const wisdomDocRef = doc(db, collectionName, id);
		const currentWisdomSnapshot = await getDoc(wisdomDocRef);

		if (currentWisdomSnapshot.exists()) {
			const currentWisdomData = currentWisdomSnapshot.data();
			const formattedName = wisdoms.name.toLowerCase().replace(/ /g, "-");
			const updatedWisdomData = {
				...currentWisdomData,
				...wisdoms,
				name: formattedName,
				updatedAt: Timestamp.now(),
			};

			await updateDoc(wisdomDocRef, updatedWisdomData);
		} else {
			throw new Error("Wisdom does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update wisdom: " + error);
	}
};


export const deleteLocalKnowledge = async (
	localKnowledge: LocalKnowledgeTypes
): Promise<void> => {
	try {
		const localKnowledgeDocRef = doc(db, collectionName, localKnowledge.id);
		await deleteDoc(localKnowledgeDocRef);
		if (localKnowledge.image_path) {
			await deleteAllImage(localKnowledge.image_path);
		}
		console.log("Local Knowledge deleted successfully with ID:", localKnowledge.id);
	} catch (error) {
		console.error("Failed to delete site:", error);
		throw new Error("Failed to delete site: " + error);
	}
};
