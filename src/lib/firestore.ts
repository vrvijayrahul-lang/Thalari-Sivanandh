import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
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

/** Save full portfolio content to Firestore (uses setDoc with merge for reliability) */
export async function saveContent(
  data: DocumentData
): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
    // setDoc with merge: true creates or updates the document
    // This is more reliable than updateDoc when fields may not exist yet
    await setDoc(docRef, data, { merge: true });
    console.log("✅ Firestore save successful");
    return { success: true };
  } catch (error) {
    console.error("❌ Firestore save error:", error);
    const message =
      error instanceof Error ? error.message : String(error);

    // Provide helpful hints based on error type
    if (message.includes("permission-denied") || message.includes("PERMISSION_DENIED")) {
      return {
        success: false,
        error:
          "Permission denied! Set Firestore rules in Firebase Console:\n" +
          'rules_version = "2";\n' +
          'service cloud.firestore {\n' +
          '  match /databases/{database}/documents {\n' +
          '    match /content/{document} {\n' +
          '      allow read: if true;\n' +
          '      allow write: if request.auth != null;\n' +
          '    }\n' +
          "  }\n" +
          "}",
      };
    }

    if (message.includes("unavailable") || message.includes("deadline")) {
      return {
        success: false,
        error:
          "Firestore service unavailable. Make sure you've created the Firestore database in the Firebase Console (select a region, start in test mode, then update rules).",
      };
    }

    return { success: false, error: message };
  }
}

/** Update a specific section of portfolio content */
export async function updateSection(
  section: string,
  data: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
    await setDoc(docRef, { [section]: data }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Firestore section update error:", error);
    return { success: false, error: String(error) };
  }
}