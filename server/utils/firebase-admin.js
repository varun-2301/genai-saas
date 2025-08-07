// utils/firebase-admin.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
    readFileSync(new URL('./serviceAccountKey.json', import.meta.url))
);

if (!admin.apps.length) {
    console.log("⛔ No existing Firebase app, initializing...");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // DO NOT manually pass `projectId` here
    });
} else {
    console.log("⚠️ Firebase admin already initialized");
}


export default admin;
