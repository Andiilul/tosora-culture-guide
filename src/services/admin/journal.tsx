import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { JournalTypes } from "../../types/journal";

export async function getJournal(): Promise<JournalTypes | null> {
	try {
		const journalRef = doc(db, "journal", "journal");
		const docSnap = await getDoc(journalRef);

		if (docSnap.exists()) {
			const data = docSnap.data();

			// Ensure the data is cast correctly to JournalTypes
			const journal: JournalTypes = {
				name: data.name,
				link: data.link,
				updatedAt: data.updatedAt, 
			};

			return journal;
		} else {
			console.log("No such document!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching journal:", error);
		throw error;
	}
}

export const updateJournal = async (journal: JournalTypes): Promise<void> => {
  try {
    const journalRef = doc(db, "journal", "journal"); // Assuming "journal" is the document ID
    await updateDoc(journalRef, {
      ...journal,
      updatedAt: Timestamp.now(),
    });
    console.log("Journal updated successfully");
  } catch (error) {
    console.error("Error updating journal:", error);
    throw error;
  }
};