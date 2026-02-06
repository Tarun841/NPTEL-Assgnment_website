import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { Plus, Trash2, Search } from 'lucide-react'; // Ensure lucide-react is installed
import Modal from '../components/Modal';

const Home = () => {
    const { isEditMode } = useApp();
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const data = await api.getCourses();
        setCourses(data);
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!newCourseName.trim()) {
            alert("Please enter a course name");
            return;
        }
        try {
            await api.addCourse({ title: newCourseName, code: 'NEW' });
            setNewCourseName('');
            setIsModalOpen(false);
            loadCourses();
        } catch (error) {
            console.error("Failed to add course:", error);
            alert("Failed to add course. See console for details.");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevent navigation
        if (window.confirm('Are you sure you want to delete this course?')) {
            await api.deleteCourse(id);
            loadCourses();
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', fontWeight: 300, fontSize: '2.5rem' }}>
                My <span style={{ fontWeight: 700, color: 'var(--clr-primary)' }}>Courses</span>
            </h1>

            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-muted)' }} size={20} />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--clr-bg-card)',
                        border: '1px solid var(--clr-border)',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div className="card-grid">
                {courses.filter(c =>
                    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.code.toLowerCase().includes(searchQuery.toLowerCase())
                ).map(course => (
                    <Link key={course.id} to={`/course/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="glass-panel card" style={{ position: 'relative' }}>
                            <h3>{course.title}</h3>
                            <p>{course.code}</p>
                            {isEditMode && (
                                <button
                                    onClick={(e) => handleDelete(e, course.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(255,0,0,0.2)',
                                        border: 'none',
                                        color: '#ff6b6b',
                                        padding: '0.4rem',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {isEditMode && (
                <button className="fab" onClick={() => setIsModalOpen(true)}>
                    <Plus size={32} />
                </button>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Course">
                <form onSubmit={handleAddCourse}>
                    <div className="answer-input-group" style={{ flexDirection: 'column' }}>
                        <label>Course Name</label>
                        <input
                            type="text"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            placeholder="e.g. Data Structures"
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Add Course</button>
                </form>
            </Modal>
        </div>
    );
};

export default Home;
