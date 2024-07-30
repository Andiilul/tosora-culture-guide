import {
	getDocs,
	collection,
	getDoc,
	doc,
	addDoc,
	Timestamp,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AddSiteInput, SitesTypes, UpdateSiteInput } from "../types/sites";

export const getAllSites = async () => {
	const querySnapshot = await getDocs(collection(db, "sites"));
	const sites: SitesTypes[] = [];

	const sitePromises = querySnapshot.docs.map((doc) => {
		const data = doc.data();

		return { ...data, id: doc.id } as SitesTypes;
	});

	const siteResult = await Promise.all(sitePromises);
	sites.push(...siteResult);

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
				name: siteData.name,
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

export async function createSites(site: AddSiteInput): Promise<SitesTypes> {
	try {
		const siteCollection = collection(db, "sites");

		const newSiteRef = await addDoc(siteCollection, {
			name: site.name,
			description: site.description,
			catchphrase: site.catchphrase,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			location: site.location,
			embedded_maplink: site.embedded_maplink,
			designationYear: site.designationYear,
			image_path: site.image_path,
		});

		const newSiteId = newSiteRef.id;

		const newSite: SitesTypes = {
			id: newSiteId,
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

		console.log("Site created successfully with ID:", newSiteId);
		return newSite;
	} catch (error) {
		console.error("Error creating site:", error);
		throw new Error("Failed to create site.");
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
			const updatedSiteData = {
				...currentSiteData,
				...site,
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

export const deleteSite = async (id: string): Promise<void> => {
	try {
		const siteDocRef = doc(db, "sites", id);
		await deleteDoc(siteDocRef);
		console.log("Site deleted successfully with ID:", id);
	} catch (error) {
		console.error("Failed to delete site:", error);
		throw new Error("Failed to delete site: " + error);
	}
};
