const express = require('express');
const router = express.Router();
const db = require('./db');

// --- Helpers ---
const getCollection = async (collectionName, field, value, orderByField, orderDir = 'asc') => {
    let ref = db.collection(collectionName);
    if (field && value) {
        // In Firestore, value types must match. Assuming IDs may be strings now but existing foreign keys were numbers.
        // We'll store foreign keys as strings if we are generating new IDs, but migration might keep them as numbers.
        // Let's try to match loosely or convert.
        // For safety, let's treat foreign keys as strings since Firestore IDs are strings.
        ref = ref.where(field, '==', value);
    }
    if (orderByField) {
        ref = ref.orderBy(orderByField, orderDir);
    }
    const snapshot = await ref.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// --- Courses ---
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCollection('courses', null, null, 'title'); // orderBy title instead of ID since alphabetic usually better
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/courses', async (req, res) => {
    const { title, code } = req.body;
    try {
        const docRef = await db.collection('courses').add({ title, code });
        res.status(201).json({ id: docRef.id, title, code });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Weeks ---
router.get('/courses/:courseId/weeks', async (req, res) => {
    const { courseId } = req.params;
    try {
        // Note: courseId is passed as string from URL. Ensure stored data matches type.
        // If we migrate number IDs -> stored as number. If new IDs -> string.
        // We will try string first.
        let weeks = await getCollection('weeks', 'courseId', courseId, 'number', 'asc');

        // Fallback: if no weeks found, maybe courseId is stored as number?
        if (weeks.length === 0 && !isNaN(courseId)) {
            weeks = await getCollection('weeks', 'courseId', Number(courseId), 'number', 'asc');
        }

        res.json(weeks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/courses/:courseId/weeks', async (req, res) => {
    const { courseId } = req.params;
    const { title, number } = req.body;
    try {
        // Store courseId as string to be consistent with future string IDs
        const docRef = await db.collection('weeks').add({
            courseId: courseId,
            title,
            number: Number(number)
        });
        res.status(201).json({ id: docRef.id, courseId, title, number });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Answers ---
router.get('/weeks/:weekId/answers', async (req, res) => {
    const { weekId } = req.params;
    try {
        let answers = await getCollection('answers', 'weekId', weekId, 'questionNo', 'asc');
        if (answers.length === 0 && !isNaN(weekId)) {
            answers = await getCollection('answers', 'weekId', Number(weekId), 'questionNo', 'asc');
        }
        res.json(answers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/weeks/:weekId/answers', async (req, res) => {
    const { weekId } = req.params;
    const { questionNo, text } = req.body;
    try {
        const docRef = await db.collection('answers').add({
            weekId: weekId,
            questionNo: Number(questionNo),
            text
        });
        res.status(201).json({ id: docRef.id, weekId, questionNo, text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Delete Routes ---
// Helper for manual cascade since Firestore is NoSQL
const deleteRecursive = async (collection, id) => {
    await db.collection(collection).doc(id).delete();
    // Implementation of full cascade delete in Firestore is complex/costly.
    // For now, we will perform a shallow delete of the document.
};

router.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteRecursive('courses', id);
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/weeks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteRecursive('weeks', id);
        res.json({ message: 'Week deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/answers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteRecursive('answers', id);
        res.json({ message: 'Answer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
