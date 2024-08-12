/* eslint-disable no-mixed-spaces-and-tabs */
import {
	getDocs,
	collection,
	getDoc,
	doc,
	Timestamp,
	setDoc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
// import { AddSiteInput, UpdateSiteInput } from "../types/sites";
// import { deleteAllImage } from "./image";
import {
	AddCuisineInput,
	CuisineTypes,
	UpdateCuisineInput,
} from "../../types/cuisine";
import { deleteAllImage } from "../image";

const collectionName = "cuisine";

export const getAllCuisine = async (): Promise<CuisineTypes[]> => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const cuisines: CuisineTypes[] = [];

		querySnapshot.docs.forEach((doc) => {
			const data = doc.data();
			const cuisine: CuisineTypes = {
				id: doc.id,
				name: data.name ?? "",
				description: data.description ?? "",
				duration: data.duration,
				image_path: data.image_path ?? null,
				recipe: data.recipe ?? {
					ingredients: data.recipe?.ingredients ?? [],
					steps: data.recipe?.steps ?? [],
				},
				createdAt: data.createdAt ?? Timestamp.now(),
				updatedAt: data.updatedAt ?? Timestamp.now(),
			};
			cuisines.push(cuisine);
		});

		console.log(cuisines, "Fetched Cuisines");
		return cuisines;
	} catch (error) {
		console.error("Error fetching cuisines:", error);
		throw new Error("Failed to fetch cuisines");
	}
};

export async function getOneCuisine(
	cuisineId: string
): Promise<CuisineTypes | undefined> {
	try {
		const cuisineDocRef = doc(collection(db, collectionName), cuisineId);
		const cuisineSnapshot = await getDoc(cuisineDocRef);

		if (cuisineSnapshot.exists()) {
			const cuisineData = cuisineSnapshot.data();
			const cuisine: CuisineTypes = {
				id: cuisineSnapshot.id,
				name: cuisineData.name,
				description: cuisineData.description,
				duration: cuisineData.duration,
				image_path: cuisineData.image_path,
				recipe: cuisineData.recipe
					? {
							ingredients: cuisineData.recipe.ingredients,
							steps: cuisineData.recipe.steps,
					  }
					: null,
				createdAt: cuisineData.createdAt || Timestamp.now(),
				updatedAt: cuisineData.updatedAt || Timestamp.now(),
			};
			return cuisine;
		} else {
			console.log("error", "No such site exists!");
			return undefined;
		}
	} catch (error) {
		console.error("Error fetching site:", error);
		throw new Error("Failed to fetch site.");
	}
}

export async function createCuisine(
	cuisine: AddCuisineInput,
	cuisineId: string,
	imageURL: string | undefined
): Promise<CuisineTypes> {
	try {
		if (cuisine.duration === null || isNaN(cuisine.duration)) {
			throw new Error("Duration is either null or not a valid number");
		}
		const cuisineCollection = collection(db, collectionName);

		const newCuisineRef = doc(cuisineCollection, cuisineId);

		const newCuisine: CuisineTypes = {
			id: cuisineId,
			name: cuisine.name,
			description: cuisine.description,
			image_path: imageURL ? imageURL : null,
			duration: cuisine.duration,
			recipe: cuisine.recipe
				? {
						ingredients: cuisine.recipe.ingredients,
						steps: cuisine.recipe.steps,
				  }
				: null,

			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		};

		await setDoc(newCuisineRef, newCuisine);

		return newCuisine;
	} catch (error) {
		console.error("Error creating cuisine: ", error);
		throw error;
	}
}

export const updateCuisine = async ({
	id,
	cuisine,
}: {
	id: string;
	cuisine: UpdateCuisineInput;
}) => {
	try {
		const cuisineDocRef = doc(db, collectionName, id);
		const currentCuisineSnapshot = await getDoc(cuisineDocRef);

		if (currentCuisineSnapshot.exists()) {
			const currentCuisineData = currentCuisineSnapshot.data();
			const formattedName = cuisine.name.toLowerCase().replace(/ /g, "-");
			const updatedCuisineData = {
				...currentCuisineData,
				...cuisine,
				name: formattedName,
				updatedAt: Timestamp.now(),
			};

			await updateDoc(cuisineDocRef, updatedCuisineData);
		} else {
			throw new Error("Site does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update site: " + error);
	}
};

export const deleteCuisine = async (cuisine: CuisineTypes): Promise<void> => {
	try {
		const cuisineDocRef = doc(db, collectionName, cuisine.id);
		await deleteDoc(cuisineDocRef);
		if (cuisine.image_path) {
			await deleteAllImage(cuisine.image_path);
		}
		console.log("Site deleted successfully with ID:", cuisine.id);
	} catch (error) {
		console.error("Failed to delete site:", error);
		throw new Error("Failed to delete site: " + error);
	}
};

// export const deleteSiteImageOnly = async (id: string, imgPaths: string[]) => {
// 	const siteDocRef = doc(db, "sites", id);

// 	try {
// 		// Fetch the document
// 		const siteDoc = await getDoc(siteDocRef);
// 		if (siteDoc.exists()) {
// 			const siteData = siteDoc.data();
// 			const existingImagePaths: string[] = siteData.image_path || [];

// 			// Filter out the images to be deleted
// 			const updatedImagePaths = existingImagePaths.filter(
// 				(path) => !imgPaths.includes(path)
// 			);

// 			await deleteAllImage(imgPaths);
// 			await updateDoc(siteDocRef, {
// 				image_path: updatedImagePaths,
// 				updatedAt: Timestamp.now(),
// 			});

// 			console.log(`Images for site ${id} deleted successfully.`);
// 		} else {
// 			console.log(`Site ${id} not found.`);
// 		}
// 	} catch (error) {
// 		console.error("Error deleting site images: ", error);
// 	}
// };
