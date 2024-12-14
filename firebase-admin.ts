import { initializeApp, getApps, App, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin'; // Import the 'admin' namespace for types

import * as serviceAccount from './service_Key.json';

let app: App;
// Check if Firebase Admin app is initialized
if (getApps().length === 0) {
    // Initialize Firebase Admin with cert object
    app = initializeApp({
        credential: cert(serviceAccount as admin.ServiceAccount), // Use 'admin.ServiceAccount' type here
    });
} else {
    // Use existing app instance if already initialized
    app = getApp();
}

// Initialize Firestore
const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
