import { 
    initializeApp, 
    getApps, 
    App, 
    getApp, 
    cert 
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceKey from './service_Key.json'; // Adjust path as needed

let app: App;

// Check if Firebase Admin app is initialized
if (getApps().length === 0) {
    // Initialize Firebase Admin if not already initialized
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    // Use existing app instance if already initialized
    app = getApp();
}

// Initialize Firestore
const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
