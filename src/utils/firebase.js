// src/utils/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import config from "../config";

const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export default app;
