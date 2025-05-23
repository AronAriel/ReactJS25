import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig: Record<string, string | undefined> = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lingangulifood.firebaseapp.com",
  projectId: "lingangulifood",
  storageBucket: "lingangulifood.appspot.com",
  messagingSenderId: "440764986803",
  appId: "1:440764986803:web:64c6aa7d87d5d6220a07c6",
  measurementId: "G-3VJ6MRTB5T",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error: unknown) => {
  console.error("Ошибка при установке persistence:", error);
});

export { auth };
