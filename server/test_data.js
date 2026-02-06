
const admin = require('firebase-admin');
const db = require('./db');

async function testFetch() {
    console.log('--- Testing Fetch Courses ---');
    try {
        if (!db) {
            console.error('DB is null!');
            return;
        }

        console.log('Getting courses collection ref...');
        let ref = db.collection('courses');

        console.log('Ordering by title...');
        ref = ref.orderBy('title', 'asc');

        console.log('Fetching snapshot...');
        const snapshot = await ref.get();

        console.log('Snapshot empty?', snapshot.empty);
        console.log('Docs size:', snapshot.size);

        if (snapshot.docs) {
            console.log('Mapping docs...');
            const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Courses:', JSON.stringify(courses, null, 2));
        } else {
            console.error('snapshot.docs is undefined!');
        }

    } catch (error) {
        console.error('FETCH ERROR:', error.message);
        console.error(error);
    }
}

testFetch();
