import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

/**
 * Fetch all documents from a specific collection.
 * @param {string} collectionName - The name of the collection to fetch data from.
 * @returns {Promise<Array>} - A promise that resolves to an array of documents.
 */
export const fetchAll = async (collectionName: string) => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const data = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return data;
	} catch (error) {
		console.error("Error fetching documents: ", error);
		throw error;
	}
};

/**
 * Fetch a single document by its ID.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The ID of the document to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the document data.
 */

export const fetchOneDocument = async (
	collectionName: string,
	documentId: string
) => {
	try {
		const docRef = doc(db, collectionName, documentId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() };
		} else {
			console.error("No such document!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching document: ", error);
		throw error;
	}
};

/**
 * Add a new document to a specific collection.
 * @param collectionName - The name of the collection to add the document to.
 * @param data - The data to be added as the new document.
 * @returns A promise that resolves to the ID of the newly created document.
 */
export const postDocument = async <T extends Record<string, unknown>>(
	collectionName: string,
	data: T
): Promise<string> => {
	try {
		const docRef = await addDoc(collection(db, collectionName), data);
		console.log("Document written with ID: ", docRef.id);
		return docRef.id;
	} catch (error) {
		console.error("Error adding document: ", error);
		throw error;
	}
};

/**
 * Set a document with a specific ID in a Firestore collection.
 * @param collectionName - The name of the collection.
 * @param documentId - The ID of the document to create or overwrite.
 * @param data - The data to set for the document.
 * @returns A promise that resolves once the document has been set.
 */
export const setDocument = async <T extends Record<string, unknown>>(
	collectionName: string,
	documentId: string,
	data: T
): Promise<void> => {
	try {
		const docRef = doc(db, collectionName, documentId);
		await setDoc(docRef, data);
		console.log("Document set with ID: ", documentId);
	} catch (error) {
		console.error("Error setting document: ", error);
		throw error;
	}
};
/**
 * Update an existing document in a Firestore collection.
 * @param collectionName - The name of the collection.
 * @param documentId - The ID of the document to update.
 * @param updates - An object containing the fields to update and their new values.
 * @param converter - Optional Firestore data converter if used.
 * @returns A promise that resolves once the document has been updated.
 */
export const updateDocument = async <T,>(
	collectionName: string,
	documentId: string,
	updates: Partial<T>
): Promise<void> => {
	try {
		const docRef = doc(db, collectionName, documentId);
		await updateDoc(docRef, updates);
		console.log("Document updated with ID: ", documentId);
	} catch (error) {
		console.error("Error updating document: ", error);
		throw error;
	}
};

export const deleteDocument = async (
	collectionName: string,
	documentId: string
) => {
	try {
		await deleteDoc(doc(db, collectionName, documentId));
		console.log("Document deleted with ID: ", documentId);
	} catch (error) {
		console.error("Error deleting document: ", error);
		throw error;
	}
};
