import {
	getDocs,
	collection,
	getDoc,
	doc,
	Timestamp,
	updateDoc,
	deleteDoc,
	setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { deleteAllImage } from "../image";
import { AddCultureInput, CultureTypes, UpdateCultureInput } from "../../types/culture";

const collectionName = "culture";

export const getAllCulture = async (): Promise<CultureTypes[]> => {
	const querySnapshot = await getDocs(collection(db, collectionName));
	const sites: CultureTypes[] = [];

	querySnapshot.docs.forEach((doc) => {
		const data = doc.data();

		const culture: CultureTypes = {
			id: doc.id,
			name: data.name ?? "",
			description: data.description ?? "",
			image_path: data.image_path ?? [],
			type: data.type ?? "customs",

			createdAt: data.createdAt ?? Timestamp.now(),
			updatedAt: data.updatedAt ?? Timestamp.now(),
		};

		sites.push(culture);
	});

	return sites;
};

export async function getOneCulture(
	cultureId: string
): Promise<CultureTypes | undefined> {
	try {
		const cultureDocRed = doc(collection(db, collectionName), cultureId);
		const cultureSnapshot = await getDoc(cultureDocRed);

		if (cultureSnapshot.exists()) {
			const cultureData = cultureSnapshot.data();
			const site: CultureTypes = {
				id: cultureSnapshot.id,
				name: cultureData.name
					.replace(/-/g, " ")
					.split(" ")
					.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				description: cultureData.description,
				type: cultureData.type,
				image_path: cultureData.image_path,

				createdAt: cultureData.createdAt,
				updatedAt: cultureData.updatedAt,
			};
			return site;
		} else {
			console.log("error", "No such site exists!");
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching site:", error);
		throw new Error("Failed to fetch site.");
	}
}

export async function createCulture(
	site: AddCultureInput,
	siteId: string
): Promise<CultureTypes> {
	try {
		const siteCollection = collection(db, collectionName);

		const newSiteRef = doc(siteCollection, siteId);

		const newSite: CultureTypes = {
			id: siteId,
			name: site.name,
			description: site.description,
			createdAt: Timestamp.now(),
			type: site.type,

			updatedAt: Timestamp.now(),
			image_path: site.image_path,
		};
		await setDoc(newSiteRef, newSite);

		return newSite;
	} catch (error) {
		console.error("Error creating site: ", error);
		throw error;
	}
}

export const updateCulture = async ({
	id,
	culture,
}: {
	id: string;
	culture: UpdateCultureInput;
}) => {
	try {
		const cultureDocRed = doc(db, collectionName, id);
		const currentcultureSnapshot = await getDoc(cultureDocRed);

		if (currentcultureSnapshot.exists()) {
			const currentCultureData = currentcultureSnapshot.data();
			const formattedName = culture.name.toLowerCase().replace(/ /g, "-");
			const updatedCultureData = {
				...currentCultureData,
				...culture,
				name: formattedName,
				updatedAt: Timestamp.now(),
			};

			await updateDoc(cultureDocRed, updatedCultureData);
		} else {
			throw new Error("Site does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update site: " + error);
	}
};

export const deleteCulture = async (site: CultureTypes): Promise<void> => {
	try {
		const cultureDocRed = doc(db, collectionName, site.id);
		await deleteDoc(cultureDocRed);
		await deleteAllImage(site.image_path);
		console.log("Site deleted successfully with ID:", site.id);
	} catch (error) {
		console.error("Failed to delete site:", error);
		throw new Error("Failed to delete site: " + error);
	}
};

export const deleteCultureImageOnly = async (id: string, imgPaths: string[]) => {
	const cultureDocRed = doc(db, collectionName, id);

	try {
		// Fetch the document
		const siteDoc = await getDoc(cultureDocRed);
		if (siteDoc.exists()) {
			const cultureData = siteDoc.data();
			const existingImagePaths: string[] = cultureData.image_path || [];

			// Filter out the images to be deleted
			const updatedImagePaths = existingImagePaths.filter(
				(path) => !imgPaths.includes(path)
			);

			await deleteAllImage(imgPaths);
			await updateDoc(cultureDocRed, {
				image_path: updatedImagePaths,
				updatedAt: Timestamp.now(),
			});

			console.log(`Images for site ${id} deleted successfully.`);
		} else {
			console.log(`Site ${id} not found.`);
		}
	} catch (error) {
		console.error("Error deleting site images: ", error);
	}
};
