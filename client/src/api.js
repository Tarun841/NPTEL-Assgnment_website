import { db } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    doc
} from 'firebase/firestore';

export const api = {
    // --- Courses ---
    getCourses: async () => {
        const q = query(collection(db, 'courses'), orderBy('title'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addCourse: async (course) => {
        const docRef = await addDoc(collection(db, 'courses'), course);
        return { id: docRef.id, ...course };
    },
    deleteCourse: async (id) => {
        await deleteDoc(doc(db, 'courses', id));
    },

    // --- Weeks ---
    getWeeks: async (courseId) => {
        // Try querying by string courseId first
        let q = query(
            collection(db, 'weeks'),
            where('courseId', '==', String(courseId)),
            orderBy('number', 'asc')
        );
        let querySnapshot = await getDocs(q);
        let weeks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fallback: if no weeks found, maybe courseId is stored as number
        if (weeks.length === 0 && !isNaN(courseId)) {
            q = query(
                collection(db, 'weeks'),
                where('courseId', '==', Number(courseId)),
                orderBy('number', 'asc')
            );
            querySnapshot = await getDocs(q);
            weeks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        return weeks;
    },
    addWeek: async (courseId, week) => {
        const newWeek = {
            ...week,
            courseId: String(courseId), // Store as string for consistency
            number: Number(week.number)
        };
        const docRef = await addDoc(collection(db, 'weeks'), newWeek);
        return { id: docRef.id, ...newWeek };
    },
    deleteWeek: async (id) => {
        await deleteDoc(doc(db, 'weeks', id));
    },

    // --- Answers ---
    getAnswers: async (weekId) => {
        // Try querying by string weekId first
        let q = query(
            collection(db, 'answers'),
            where('weekId', '==', String(weekId)),
            orderBy('questionNo', 'asc')
        );
        let querySnapshot = await getDocs(q);
        let answers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fallback: if no answers found, maybe weekId is stored as number
        if (answers.length === 0 && !isNaN(weekId)) {
            q = query(
                collection(db, 'answers'),
                where('weekId', '==', Number(weekId)),
                orderBy('questionNo', 'asc')
            );
            querySnapshot = await getDocs(q);
            answers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        return answers;
    },
    addAnswer: async (weekId, answer) => {
        const newAnswer = {
            ...answer,
            weekId: String(weekId),
            questionNo: Number(answer.questionNo)
        };
        const docRef = await addDoc(collection(db, 'answers'), newAnswer);
        return { id: docRef.id, ...newAnswer };
    },
    deleteAnswer: async (id) => {
        await deleteDoc(doc(db, 'answers', id));
    }
};
