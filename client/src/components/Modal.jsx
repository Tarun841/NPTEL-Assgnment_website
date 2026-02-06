import { X } from 'lucide-react';
import '../styles/components.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
        }}>
            <div className="glass-panel" style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                width: 'min(90%, 500px)',
                position: 'relative',
                animation: 'fadeIn 0.3s ease-out'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                }}>
                    <X />
                </button>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
