import { useApp } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import { grammarLessons } from '../data/grammar';

export default function Dashboard({ onNavigate }) {
  const { state } = useApp();
  const { progress, learnedCount, totalWords, dailyGoalPercent, coveragePercent } = useProgress();
  const { settings } = state;

  const grammarDone = progress.grammarCompleted.length;
  const grammarTotal = grammarLessons.length;

  return (
    <div className="page">
      <div className="welcome-banner">
        <h2>Bonjour! 👋 Ready to learn French?</h2>
        <p>
          {learnedCount === 0
            ? "You're just getting started. Let's learn some French words for life in Montreal!"
            : `You've learned ${learnedCount} words so far. Keep it up — you're covering ~${coveragePercent}% of the 3,000 most common French words!`}
        </p>
        <div className="quick-actions">
          {[
            { icon: '📖', label: 'Study words', page: 'vocabulary' },
            { icon: '🎯', label: 'Practice', page: 'practice' },
            { icon: '📐', label: 'Grammar', page: 'grammar' },
            { icon: '🍁', label: 'Montreal', page: 'montreal' },
          ].map(a => (
            <button key={a.page} className="quick-action" onClick={() => onNavigate(a.page)}>
              <div className="quick-action-icon">{a.icon}</div>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-4 mb-6">
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>📚</div>
          <div className="stat-value">{learnedCount}</div>
          <div className="stat-label">Words Learned</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>🔥</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{progress.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>✅</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{grammarDone}</div>
          <div className="stat-label">Grammar Lessons</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>⭐</div>
          <div className="stat-value" style={{ color: 'var(--purple)' }}>{progress.totalXP}</div>
          <div className="stat-label">Total XP</div>
        </div>
      </div>

      <div className="grid-2 mb-6">
        {/* Daily Goal */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Daily Goal</span>
            <span className="badge badge-blue">{progress.dailyGoalProgress || 0} / {settings.dailyGoal} words</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill green" style={{ width: `${dailyGoalPercent}%` }} />
          </div>
          <p className="text-xs text-muted mt-2">
            {dailyGoalPercent >= 100 ? '🎉 Goal reached today!' : `${settings.dailyGoal - (progress.dailyGoalProgress || 0)} more words to reach today's goal`}
          </p>
        </div>

        {/* Vocabulary coverage */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Top 3,000 Coverage</span>
            <span className="badge badge-purple">{coveragePercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${coveragePercent}%`, background: 'var(--purple)' }} />
          </div>
          <p className="text-xs text-muted mt-2">
            You know ~{learnedCount} of the 3,000 most common French words
          </p>
        </div>
      </div>

      {/* Grammar progress */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">Grammar Progress</span>
          <span className="badge badge-green">{grammarDone} / {grammarTotal} lessons</span>
        </div>
        <div className="progress-bar" style={{ height: 10 }}>
          <div className="progress-fill green" style={{ width: `${Math.round((grammarDone / grammarTotal) * 100)}%` }} />
        </div>
        {grammarDone < grammarTotal && (
          <button className="btn btn-outline btn-sm mt-3" onClick={() => onNavigate('grammar')}>
            Continue Grammar Lessons →
          </button>
        )}
      </div>

      {/* Beginner tips */}
      <div className="card">
        <h3 className="section-title">🚀 Getting Started</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '1️⃣', text: 'Start with Vocabulary — learn essential verbs and common words first.' },
            { icon: '2️⃣', text: 'Check Word Families — learn how key verbs like faire, avoir, and prendre are used in real expressions.' },
            { icon: '3️⃣', text: 'Try Grammar — work through beginner lessons to understand French structure.' },
            { icon: '4️⃣', text: 'Montreal Phrases — get survival French for everyday life in the city.' },
            { icon: '5️⃣', text: 'Practice daily — even 10 minutes a day builds lasting fluency.' },
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span style={{ fontSize: '1.1rem', marginTop: 2 }}>{tip.icon}</span>
              <span className="text-sm text-secondary">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
