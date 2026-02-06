const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = require('./db');

const sqliteDbPath = path.resolve(__dirname, 'database.sqlite');
const sqliteDb = new sqlite3.Database(sqliteDbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

const migrate = async () => {
    try {
        console.log('Starting migration to Firestore...');

        // 1. Migrate Courses
        const courses = await new Promise((resolve, reject) => {
            sqliteDb.all('SELECT * FROM courses', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${courses.length} courses.`);

        for (const course of courses) {
            // Use existing ID as document ID to preserve relationships
            await db.collection('courses').doc(String(course.id)).set({
                title: course.title,
                code: course.code
            });
        }
        console.log('Courses migrated.');

        // 2. Migrate Weeks
        const weeks = await new Promise((resolve, reject) => {
            sqliteDb.all('SELECT * FROM weeks', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${weeks.length} weeks.`);
        for (const week of weeks) {
            await db.collection('weeks').doc(String(week.id)).set({
                courseId: week.courseId, // Keep as number to match existing foreign keys in SQLite
                title: week.title,
                number: week.number
            });
        }
        console.log('Weeks migrated.');

        // 3. Migrate Answers
        const answers = await new Promise((resolve, reject) => {
            sqliteDb.all('SELECT * FROM answers', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${answers.length} answers.`);
        for (const answer of answers) {
            await db.collection('answers').doc(String(answer.id)).set({
                weekId: answer.weekId, // Keep as number
                questionNo: answer.questionNo,
                text: answer.text
            });
        }
        console.log('Answers migrated.');

        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        sqliteDb.close();
        process.exit(0);
    }
};

migrate();
