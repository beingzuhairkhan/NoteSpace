import { 
    initializeApp, 
    getApps, 
    App, 
    getApp 
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';




const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase admin app initialized successfully.");
} else {
    app = getApp();
    console.log("Firebase app already initialized, using existing instance.");
}

const adminDB = getFirestore(app);

console.log("Firebase admin database connected successfully.");
export { app as adminApp, adminDB };
