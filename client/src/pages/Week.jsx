import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../api';
import { Plus, ArrowLeft, Trash2 } from 'lucide-react';

const Week = () => {
    const { weekId } = useParams();
    const { isEditMode } = useApp();
    const [answers, setAnswers] = useState([]);

    // New Answer State
    const [newQuestionNo, setNewQuestionNo] = useState('');
    const [newAnswerText, setNewAnswerText] = useState('');

    useEffect(() => {
        loadAnswers();
    }, [weekId]);

    // Update question number when answers change
    useEffect(() => {
        if (answers.length > 0) {
            const maxNo = Math.max(...answers.map(a => Number(a.questionNo || 0)));
            setNewQuestionNo(maxNo + 1);
        } else {
            setNewQuestionNo(1);
        }
    }, [answers]);

    const loadAnswers = async () => {
        const data = await api.getAnswers(weekId);
        setAnswers(data);
    };

    const handleAddAnswer = async (e) => {
        e.preventDefault();
        if (!newQuestionNo || !newAnswerText) return;

        await api.addAnswer(weekId, {
            questionNo: parseInt(newQuestionNo),
            text: newAnswerText
        });

        setNewAnswerText('');
        loadAnswers();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete answer?')) {
            await api.deleteAnswer(id);
            loadAnswers();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link to={`/`} className="btn-icon"> {/* Simplifying back nav for now, ideally go to course */}
                    <ArrowLeft size={20} />
                </Link>
                <h1>Answers</h1>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                <div className="answer-list">
                    {answers.length === 0 && <p style={{ color: 'var(--clr-text-muted)', textAlign: 'center' }}>No answers yet.</p>}
                    {answers.sort((a, b) => a.questionNo - b.questionNo).map(answer => (
                        <div key={answer.id} className="answer-item">
                            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                <span className="answer-key">{answer.questionNo}.</span>
                                <span className="answer-text">{answer.text}</span>
                            </div>
                            {isEditMode && (
                                <button
                                    onClick={() => handleDelete(answer.id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ff6b6b',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {isEditMode && (
                    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--clr-border)', paddingTop: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Add Answer</h3>
                        <form onSubmit={handleAddAnswer} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                                type="number"
                                placeholder="#"
                                value={newQuestionNo}
                                onChange={(e) => setNewQuestionNo(e.target.value)}
                                style={{ width: '80px' }}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Answer text (e.g. Option B)"
                                value={newAnswerText}
                                onChange={(e) => setNewAnswerText(e.target.value)}
                                style={{ flex: 1 }}
                                required
                            />
                            <button type="submit" className="btn-primary" style={{ padding: '0.75rem' }}>
                                <Plus size={20} />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Week;
