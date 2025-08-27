import admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    // Fix private_key newlines (Render may keep them escaped as literal \n)
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
} else {
    throw new Error("❌ Firebase service account key not found in environment variables");
}

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
