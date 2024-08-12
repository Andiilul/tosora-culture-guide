import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export const uploadImages = async (
	collection: string,
	preGeneratedId: string,
	images: File[]
) => {
	return await Promise.all(
		images.map(async (img) => {
			const imgRef = ref(
				storage,
				`${collection}/${preGeneratedId}/${crypto.randomUUID()}`
			);
			await uploadBytes(imgRef, img);
			const imgUrl = await getDownloadURL(imgRef);
			return imgUrl;
		})
	);
};

export const deleteAllImage = async (
	urls: string[] | string
): Promise<void> => {
	try {
		// Ensure urls is always an array
		const urlArray = Array.isArray(urls) ? urls : [urls];

		await Promise.all(
			urlArray.map(async (url) => {
				const imgRef = ref(storage, url);
				await deleteObject(imgRef);
			})
		);
		console.log("All images deleted successfully");
	} catch (error) {
		console.error("Error deleting images:", error);
	}
};
