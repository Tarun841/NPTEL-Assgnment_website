import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { Plus, ArrowLeft, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';

const Course = () => {
    const { courseId } = useParams();
    const { isEditMode } = useApp();
    const [weeks, setWeeks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weekTitle, setWeekTitle] = useState('');

    useEffect(() => {
        loadWeeks();
    }, [courseId]);

    const loadWeeks = async () => {
        const data = await api.getWeeks(courseId);
        setWeeks(data);
    };

    const handleAddWeek = async (e) => {
        e.preventDefault();
        if (!weekTitle.trim()) return;
        await api.addWeek(courseId, { title: weekTitle, number: weeks.length + 1 });
        setWeekTitle('');
        setIsModalOpen(false);
        loadWeeks();
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (window.confirm('Delete this week?')) {
            await api.deleteWeek(id);
            loadWeeks();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link to="/" className="btn-icon">
                    <ArrowLeft size={20} />
                </Link>
                <h1>Weeks</h1>
            </div>

            <div className="card-grid">
                {weeks.map(week => (
                    <Link key={week.id} to={`/week/${week.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="glass-panel card" style={{ position: 'relative' }}>
                            <h3>{week.title}</h3>
                            <p>Assignment {week.number}</p>
                            {isEditMode && (
                                <button
                                    onClick={(e) => handleDelete(e, week.id)}
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Week">
                <form onSubmit={handleAddWeek}>
                    <div className="answer-input-group" style={{ flexDirection: 'column' }}>
                        <label>Week Title</label>
                        <input
                            type="text"
                            value={weekTitle}
                            onChange={(e) => setWeekTitle(e.target.value)}
                            placeholder="e.g. Week 1"
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Add Week</button>
                </form>
            </Modal>
        </div>
    );
};

export default Course;
