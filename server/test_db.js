
const admin = require('firebase-admin');
require('dotenv').config();

console.log('--- Testing Firebase Init ---');
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

console.log('Project ID:', projectId);
console.log('Client Email:', clientEmail);
console.log('Private Key exists:', !!privateKeyRaw);

if (privateKeyRaw) {
    console.log('Private Key length:', privateKeyRaw.length);
    console.log('Private Key start:', privateKeyRaw.substring(0, 30));
    // Check for newlines
    const hasLiteralSlashN = privateKeyRaw.includes('\\n');
    console.log('Has literal \\n:', hasLiteralSlashN);
    const hasRealNewline = privateKeyRaw.includes('\n');
    console.log('Has real newline:', hasRealNewline);

    // Simulate db.js replacement
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    console.log('Processed Key length:', privateKey.length);
    console.log('Processed Key start:', privateKey.substring(0, 30));
    console.log('Processed Key has real newline:', privateKey.includes('\n'));

    try {
        const serviceAccount = {
            project_id: projectId,
            private_key: privateKey,
            client_email: clientEmail
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Initialization SUCCESS');

        const db = admin.firestore();
        db.listCollections().then(cols => {
            console.log('Connection SUCCESS. Collections:', cols.length);
        }).catch(err => {
            console.error('Connection FAIL:', err.message);
        });

    } catch (e) {
        console.error('Initialization FAIL:', e.message);
        console.error(e);
    }
} else {
    console.error('ERROR: No private key found in environment.');
}
