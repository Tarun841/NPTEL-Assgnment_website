const API_URL = '/api';

export const api = {
    getCourses: async () => {
        const res = await fetch(`${API_URL}/courses`);
        if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
        return res.json();
    },
    addCourse: async (course) => {
        const res = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        return res.json();
    },
    getWeeks: async (courseId) => {
        const res = await fetch(`${API_URL}/courses/${courseId}/weeks`);
        if (!res.ok) throw new Error(`Failed to fetch weeks: ${res.status}`);
        return res.json();
    },
    addWeek: async (courseId, week) => {
        const res = await fetch(`${API_URL}/courses/${courseId}/weeks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(week)
        });
        return res.json();
    },
    getAnswers: async (weekId) => {
        const res = await fetch(`${API_URL}/weeks/${weekId}/answers`);
        if (!res.ok) throw new Error(`Failed to fetch answers: ${res.status}`);
        return res.json();
    },
    addAnswer: async (weekId, answer) => {
        const res = await fetch(`${API_URL}/weeks/${weekId}/answers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answer)
        });
        return res.json();
    },
    deleteCourse: async (id) => {
        await fetch(`${API_URL}/courses/${id}`, { method: 'DELETE' });
    },
    deleteWeek: async (id) => {
        await fetch(`${API_URL}/weeks/${id}`, { method: 'DELETE' });
    },
    deleteAnswer: async (id) => {
        await fetch(`${API_URL}/answers/${id}`, { method: 'DELETE' });
    }
};
