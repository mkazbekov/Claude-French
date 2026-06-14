import { useApp } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'vocabulary', label: 'Vocabulary', icon: '📖' },
  { id: 'word-families', label: 'Word Families', icon: '🌿' },
  { id: 'sentences', label: 'Sentences', icon: '💬' },
  { id: 'grammar', label: 'Grammar', icon: '📐' },
  { id: 'montreal', label: 'Montreal Phrases', icon: '🍁' },
  { id: 'practice', label: 'Practice', icon: '🎯' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  const { state } = useApp();
  const { progress } = useProgress();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h1>🇫🇷 Français MTL</h1>
          <p>Learn French for Montreal</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => { onNavigate(item.id); onClose(); }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          {progress.streak > 0 && (
            <div className="streak-display">🔥 {progress.streak} day streak</div>
          )}
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            {progress.wordsLearned.length} words learned · {progress.totalXP} XP
          </div>
        </div>
      </aside>
    </>
  );
}
