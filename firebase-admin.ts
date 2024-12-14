import { initializeApp, getApps, App, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin'; // Import the 'admin' namespace for types

const serviceAccount = {
    type: "service_account",
    project_id: "notion-clone-6235e",
    private_key_id: "3b58bc824ed5fd7bb08ecd962b2c29cff9276ba6",
    private_key: "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMhSLXt8f42alI\n4KjAm9ZWdfemGV6HkeCbxeck+55K5kRl+msSp2ekv14LEwKV0YY5PT5gnMM/1EbK\njndvY/dlhOyKKP5z6rUeCCUBbbLKLdN72Cl/eZC0xiiZwjy0Af+a+3bo1s+F+H/u\nrRtG7bfgdMvP5HKFfROso0yZhLzieI3QSsgilebqzR00ZxcYQ2q2pLyvG9x/72bh\n5VvIQI9KpNxTTmyZJ5YZUwV7kmzdjrF3dhcaYNtUaRfWZGwSyo/2pcQQq7O9sUxh\nFhYG9+RcGY3sZCK0CpYBmS+Saob83RtxyzXb9oDt+rCctih9FN6DT/xuIRV/fpMu\nllBgtLj9AgMBAAECggEAAOtTJ4apwGViyYDfLUrwk4LGYcuBd/ggDaMKn6qW1Dma\n2NSaJ7ZcwEPDGztUGrkhHGBqBXAbwjVNdQduHV18b+IwHNVDfGxOXOY1hKcm5FJ5\nbDJeMq8d9NU6zOAIPxJSuDz+xvm2i337ZEQKabIX2sn8XVZnL9R6Ir/QSGl7DNf8\n5h0+FkkwqGB5eArOwvDzkm5JVJVpDODXRz2FM78eF5r5JfGb5SXJA3uwvUntT88h\nLfLbf4WCu+y3H0p/NS0ewG3t8EMkVZr+bXhLIH7AD6OvnIQ1ImMK4N1poodbWLhZ\nnzgHj21AcCTbpFXWP26wAB77Xi/KHC2vYUXsICf7gQKBgQDBgDc/jJByFG2UJTRu\nLrYCuWmkH/1HZtJkeh4hkRwKmPl5UgneX+kOT/p2uAUDB1xbc+1WVwEUZTV4nOfh\nnF2MWcB4wqJUCueUQf52kOQQw/RPWBhG3TKF6r+Xqw/VmUqndkgP8FS/wJXhAAD1\nyNd9v+Afe2SJZKwqcJ4Mvv/KvQKBgQC56Cik9y/aRnQx740TSKqXTG8nsomnI1RQ\nz+49mwlHlocTgSF84vOpOyRXpFYWGTV+icxs8I0a9+PgxYpPAwS5+KUdrSFVbskJ\nOBsU2xkIzd8qOPptYaLLLURyBXsUEUAtcpTDMGFQFbJuoUxi8YRG1ihH/3sNKzuA\nSXugGw6rQQKBgBw89dMUVFARoxwngctCjdU/8aa99FxjKPj4yUTkxE7XnDCURFRr\ncrtf+JEysaiLfnLqLAyZjdLIIlGDtGM8Snqc7nWxEbdqD/mW1+e9pUq9Df42QPS2\nexUH+QXNNPZa9IYTwNhyniuNk1HOilVUBf6X7cEqZLWYN3fKD4aUqQeRAoGAFyzz\n9CzEkGd8EMWWRrMmYRosOTyuoGFtH23se02aiIwhZrMQY6s/SPeQfkSEXtjhrFat\nX19Vl+kTRXAa3+K2ciCnJN3ya94Vvcp6xczSgCB6E59qyLwFOWL5R2WbhFLqN0Az\nf2nGl988kUIWbbdCEDqeZutYgbnD/ygp+zmkSIECgYAReOk8bwlM98voptPia5a6\nUyHubHuL5wiy6b5EY4eMOb6ujVlnCvl1nkh4IioXmt+B0LEr+brNkBWKHbjkjM7I\nTH2e7g+4XlwiGRlpoXCMBga2zkK8UkDl5nHa0HCB2FYwd9nxCY7h1rskYvFh3oPn\nUB6Rd2GTAIOicj+Lv6K4xw==",
    client_email: "firebase-adminsdk-x9u4k@notion-clone-6235e.iam.gserviceaccount.com",
    client_id: "108704753962817725378",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x9u4k%40notion-clone-6235e.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };

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
