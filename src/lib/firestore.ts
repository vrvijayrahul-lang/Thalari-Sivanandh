import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";

const CONTENT_DOC = "portfolio";
const CONTENT_COLLECTION = "content";

/** Fetch all portfolio content from Firestore */
export async function getContent(): Promise<DocumentData | null> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return null;
  }
}

/** Save full portfolio content to Firestore */
export async function saveContent(
  data: DocumentData
): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
    const existingSnap = await getDoc(docRef);
    if (existingSnap.exists()) {
      await updateDoc(docRef, data);
    } else {
      await setDoc(docRef, data);
    }
    return { success: true };
  } catch (error) {
    console.error("Firestore save error:", error);
    return { success: false, error: String(error) };
  }
}

/** Update a specific section of portfolio content */
export async function updateSection(
  section: string,
  data: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
    await updateDoc(docRef, { [section]: data });
    return { success: true };
  } catch (error) {
    // If document doesn't exist yet, create it
    try {
      const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
      await setDoc(docRef, { [section]: data });
      return { success: true };
    } catch (err) {
      console.error("Firestore section update error:", err);
      return { success: false, error: String(err) };
    }
  }
}