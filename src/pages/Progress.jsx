import { useProgress } from '../hooks/useProgress';
import { grammarLessons } from '../data/grammar';
import { vocabulary, categories } from '../data/vocabulary';

export default function Progress() {
  const { progress, learnedCount, totalWords, coveragePercent, localPercent } = useProgress();
  const grammarDone = progress.grammarCompleted.length;
  const grammarTotal = grammarLessons.length;

  const recentScores = (progress.quizScores || []).slice(-5).reverse();

  const categoryStats = categories.map(cat => {
    const catWords = vocabulary.filter(w => w.category === cat.id && !w.isContextWord);
    const learned = catWords.filter(w => progress.wordsLearned.includes(w.id)).length;
    return { ...cat, total: catWords.length, learned };
  }).filter(c => c.total > 0);

  return (
    <div className="page">
      <h1 className="page-title">📊 Progress</h1>
      <p className="page-subtitle">Track your French learning journey.</p>

      {/* Main coverage */}
      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, var(--primary), var(--purple))', color: 'white', border: 'none' }}>
        <div className="text-center">
          <div style={{ fontSize: '3.5rem', fontWeight: 700, margin: '8px 0' }}>{coveragePercent}%</div>
          <p style={{ opacity: 0.9, fontSize: '1rem' }}>
            You know approximately <strong>{coveragePercent}%</strong> of the 3,000 most common French words
          </p>
          <p style={{ opacity: 0.75, fontSize: '0.85rem', marginTop: 6 }}>
            ({learnedCount} words marked as learned)
          </p>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, height: 10, margin: '16px 0 0', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'white', borderRadius: 20, width: `${coveragePercent}%`, transition: 'width 0.4s' }} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid-4 mb-6">
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>🔥</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{progress.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>⭐</div>
          <div className="stat-value" style={{ color: 'var(--purple)' }}>{progress.totalXP}</div>
          <div className="stat-label">Total XP</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>✅</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{grammarDone}</div>
          <div className="stat-label">Grammar Done</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>🎯</div>
          <div className="stat-value">{recentScores.length}</div>
          <div className="stat-label">Quizzes Taken</div>
        </div>
      </div>

      <div className="grid-2 mb-6">
        {/* Grammar progress */}
        <div className="card">
          <h3 className="section-title">📐 Grammar Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary">{grammarDone} of {grammarTotal} lessons complete</span>
            <span className="badge badge-green">{Math.round((grammarDone / grammarTotal) * 100)}%</span>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-fill green" style={{ width: `${(grammarDone / grammarTotal) * 100}%` }} />
          </div>
          <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {grammarLessons.map(lesson => (
              <div key={lesson.id} className="flex items-center gap-2 text-sm">
                <span>{progress.grammarCompleted.includes(lesson.id) ? '✅' : '⬜'}</span>
                <span style={{ color: progress.grammarCompleted.includes(lesson.id) ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {lesson.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent quiz scores */}
        <div className="card">
          <h3 className="section-title">🎯 Recent Quiz Scores</h3>
          {recentScores.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              <p className="text-sm text-muted">No quizzes taken yet.<br />Practice → Multiple Choice to start!</p>
            </div>
          ) : (
            recentScores.map((score, i) => {
              const pct = Math.round((score.score / score.total) * 100);
              return (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <span className="text-sm font-semibold">{score.type || 'Quiz'}</span>
                    <div className="text-xs text-muted">{new Date(score.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${pct >= 70 ? 'badge-green' : pct >= 40 ? 'badge-yellow' : 'badge-red'}`}>
                      {score.score}/{score.total}
                    </span>
                    <span className="text-sm text-muted">{pct}%</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="card">
        <h3 className="section-title">📚 Vocabulary by Category</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {categoryStats.sort((a, b) => b.learned - a.learned).map(cat => {
            const pct = cat.total === 0 ? 0 : Math.round((cat.learned / cat.total) * 100);
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">
                    <span style={{ marginRight: 6 }}>{cat.icon}</span>{cat.name}
                  </span>
                  <span className="text-xs text-muted">{cat.learned}/{cat.total} ({pct}%)</span>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%`, background: cat.color || 'var(--primary)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
