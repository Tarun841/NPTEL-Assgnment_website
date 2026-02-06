
const admin = require('firebase-admin');
const db = require('./db');

async function debugWeeks() {
    console.log('--- Debugging Weeks ---');
    try {
        if (!db) { console.error('DB not init'); return; }

        const snapshot = await db.collection('weeks').get();
        if (snapshot.empty) {
            console.log('No weeks found in database.');
        } else {
            console.log(`Found ${snapshot.size} weeks:`);
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                console.log(`- ID: ${doc.id}, Title: ${data.title}, CourseID: ${data.courseId} (${typeof data.courseId})`);
            });
        }

    } catch (e) {
        console.error(e);
    }
}

debugWeeks();
