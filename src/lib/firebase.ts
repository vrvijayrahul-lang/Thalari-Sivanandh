import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDq0uW58iBHQdF3QWCWcAXGfrcmemvUPP4",
  authDomain: "pvkn-d2cba.firebaseapp.com",
  projectId: "pvkn-d2cba",
  storageBucket: "pvkn-d2cba.firebasestorage.app",
  messagingSenderId: "214216162677",
  appId: "1:214216162677:web:54fc28ba864d9e214a273c",
  measurementId: "G-24GPVEZKJ5",
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics (only in browser)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, auth, db, storage, analytics };