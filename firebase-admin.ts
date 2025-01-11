import { 
    initializeApp, 
    getApps, 
    App, 
    getApp, 
    cert 
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
// import path from 'path'

//const serviceAccount = require(path.resolve(__dirname, './admin.json'));
 const serviceAccount = require('./admin.json');
// Declare the Firebase app instance
let app: App;


if (getApps().length === 0) {

    app = initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase admin app initialized successfully.");
} else {
    // Use the already initialized app
    app = getApp();
    console.log("Firebase app already initialized, using existing instance.");
}


const adminDB = getFirestore(app);

console.log("Firebase admin database connected successfully.");
export { app as adminApp, adminDB };
