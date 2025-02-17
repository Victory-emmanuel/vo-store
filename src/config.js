/* eslint-disable no-undef */
// src/config.js

const config = {
  firebase: {
    apiKey:
      import.meta.env.VITE_FIREBASE_API_KEY ||
      process.env.VITE_FIREBASE_API_KEY,
    authDomain:
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
      process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:
      import.meta.env.VITE_FIREBASE_PROJECT_ID ||
      process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
      process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:
      import.meta.env.VITE_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
    measurementId:
      import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
      process.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
  flutterwave: {
    publicKey:
      import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY ||
      process.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
  },
};

export default config;
