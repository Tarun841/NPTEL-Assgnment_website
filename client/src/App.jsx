import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Home from './pages/Home';
import Course from './pages/Course';
import Week from './pages/Week';
import './styles/global.css';
import './styles/components.css';
import { BookOpen, Settings } from 'lucide-react';

const Navbar = () => {
  const { isEditMode, toggleEditMode } = useApp();

  const handleEditToggle = (e) => {
    // If we are currently NOT in edit mode, validation is needed to turn it ON
    if (!isEditMode) {
      const pin = prompt("Enter Admin PIN to enable Edit Mode:");
      if (pin === "1234") {
        toggleEditMode();
      } else if (pin !== null) {
        alert("Incorrect PIN!");
      }
    } else {
      // If we ARE in edit mode, just turn it OFF
      toggleEditMode();
    }
  };

  return (
    <nav className="glass-panel" style={{
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid var(--clr-border)'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ padding: '0.5rem', background: 'var(--grad-main)', borderRadius: '8px' }}>
          <BookOpen size={24} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>NPTEL Answers</span>
      </Link>

      <div className="edit-toggle">
        <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>Edit Mode</span>
        <label className="switch">
          <input type="checkbox" checked={isEditMode} onChange={handleEditToggle} />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/week/:weekId" element={<Week />} />
          </Routes>
        </main>
      </Router>
    </AppProvider>
  );
}

export default App;
