const admin = require('firebase-admin');
require('dotenv').config();

let serviceAccount;

try {
  if (process.env.FIREBASE_PRIVATE_KEY) {
    serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    };
  } else {
    serviceAccount = require('./serviceAccountKey.json');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin Initialized');
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error. Verify that you have a serviceAccountKey.json file OR that FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL are set in your .env file.');
    console.error('Error details:', error.message);
  }
}

const db = (() => {
  try {
    return admin.firestore();
  } catch (e) {
    return null; // Handle elegantly if init failed
  }
})();
module.exports = db;
