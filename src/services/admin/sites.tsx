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
import { AddSiteInput, SitesTypes, UpdateSiteInput } from "../../types/sites";
import { deleteAllImage } from "../image";

export const getAllSites = async (): Promise<SitesTypes[]> => {
	const querySnapshot = await getDocs(collection(db, "sites"));
	const sites: SitesTypes[] = [];

	querySnapshot.docs.forEach((doc) => {
		const data = doc.data();

		const site: SitesTypes = {
			id: doc.id,
			name: data.name ?? "",
			description: data.description ?? "",
			catchphrase: data.catchphrase ?? "",
			image_path: data.image_path ?? [],
			location: data.location ?? "",
			embedded_maplink: data.embedded_maplink ?? "",
			designationYear: data.designationYear ?? 0,
			createdAt: data.createdAt ?? Timestamp.now(),
			updatedAt: data.updatedAt ?? Timestamp.now(),
		};

		sites.push(site);
	});

	return sites;
};

export async function getOneSite(
	siteId: string
): Promise<SitesTypes | undefined> {
	try {
		const siteDocRef = doc(collection(db, "sites"), siteId);
		const siteSnapshot = await getDoc(siteDocRef);

		if (siteSnapshot.exists()) {
			const siteData = siteSnapshot.data();
			const site: SitesTypes = {
				id: siteSnapshot.id,
				name: siteData.name
					.replace(/-/g, " ")
					.split(" ")
					.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				description: siteData.description,
				catchphrase: siteData.catchphrase,
				createdAt: siteData.createdAt,
				updatedAt: siteData.updatedAt,
				location: siteData.location,
				embedded_maplink: siteData.embedded_maplink,
				designationYear: siteData.designationYear,
				image_path: siteData.image_path,
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

export async function createSites(
	site: AddSiteInput,
	siteId: string
): Promise<SitesTypes> {
	try {
		const siteCollection = collection(db, "sites");

		const newSiteRef = doc(siteCollection, siteId);

		const newSite: SitesTypes = {
			id: siteId,
			name: site.name,
			description: site.description,
			catchphrase: site.catchphrase,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			location: site.location,
			embedded_maplink: site.embedded_maplink,
			designationYear: site.designationYear,
			image_path: site.image_path,
		};
		await setDoc(newSiteRef, newSite);

		return newSite;
	} catch (error) {
		console.error("Error creating site: ", error);
		throw error;
	}
}

export const updateSite = async ({
	id,
	site,
}: {
	id: string;
	site: UpdateSiteInput;
}) => {
	try {
		const siteDocRef = doc(db, "sites", id);
		const currentSiteSnapshot = await getDoc(siteDocRef);

		if (currentSiteSnapshot.exists()) {
			const currentSiteData = currentSiteSnapshot.data();
			const formattedName = site.name.toLowerCase().replace(/ /g, "-");
			const updatedSiteData = {
				...currentSiteData,
				...site,
				name: formattedName,
				updatedAt: Timestamp.now(),
			};

			await updateDoc(siteDocRef, updatedSiteData);
		} else {
			throw new Error("Site does not exist");
		}
	} catch (error) {
		throw new Error("Failed to update site: " + error);
	}
};

export const deleteSite = async (site: SitesTypes): Promise<void> => {
	try {
		const siteDocRef = doc(db, "sites", site.id);
		await deleteDoc(siteDocRef);
		await deleteAllImage(site.image_path);
		console.log("Site deleted successfully with ID:", site.id);
	} catch (error) {
		console.error("Failed to delete site:", error);
		throw new Error("Failed to delete site: " + error);
	}
};

export const deleteSiteImageOnly = async (id: string, imgPaths: string[]) => {
	const siteDocRef = doc(db, "sites", id);

	try {
		// Fetch the document
		const siteDoc = await getDoc(siteDocRef);
		if (siteDoc.exists()) {
			const siteData = siteDoc.data();
			const existingImagePaths: string[] = siteData.image_path || [];

			// Filter out the images to be deleted
			const updatedImagePaths = existingImagePaths.filter(
				(path) => !imgPaths.includes(path)
			);

			await deleteAllImage(imgPaths);
			await updateDoc(siteDocRef, {
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
