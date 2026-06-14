import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Vocabulary from './pages/Vocabulary';
import WordFamilies from './pages/WordFamilies';
import Sentences from './pages/Sentences';
import Grammar from './pages/Grammar';
import Montreal from './pages/Montreal';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    dashboard: <Dashboard onNavigate={setCurrentPage} />,
    vocabulary: <Vocabulary />,
    'word-families': <WordFamilies />,
    sentences: <Sentences />,
    grammar: <Grammar />,
    montreal: <Montreal />,
    practice: <Practice />,
    progress: <Progress />,
    settings: <Settings />,
  };

  return (
    <div className="app-layout">
      <button className="menu-toggle" onClick={() => setSidebarOpen(o => !o)}>☰</button>

      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        {pages[currentPage] || pages.dashboard}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
