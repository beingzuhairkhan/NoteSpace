import {
    initializeApp, 
    getApps, 
    App, 
    getApp, 
    cert
} from 'firebase-admin/app';
import path from 'path';
import { getFirestore } from 'firebase-admin/firestore';

// Import the service account key
const serviceKey = path.resolve('./service_key.json');

let app: App;

// Check if Firebase apps are initialized
if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    app = getApp();
}

// Initialize Firestore
const adminDB = getFirestore(app);

export { app as adminApp , adminDB };
