import { useState, useMemo } from 'react';
import { vocabulary, categories } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';
import AudioButton from '../components/AudioButton';

export default function Vocabulary() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showContextWords, setShowContextWords] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const { markLearned, unmarkLearned, isLearned } = useProgress();

  const filtered = useMemo(() => {
    return vocabulary.filter(w => {
      if (w.isContextWord && !showContextWords) return false;
      if (selectedCategory !== 'all' && w.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && w.difficulty !== selectedDifficulty) return false;
      if (search) {
        const q = search.toLowerCase();
        return w.french.toLowerCase().includes(q) || w.english.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, selectedCategory, selectedDifficulty, showContextWords]);

  const learnedCount = vocabulary.filter(w => !w.isContextWord && isLearned(w.id)).length;
  const totalContent = vocabulary.filter(w => !w.isContextWord).length;

  function diffBadge(d) {
    if (d === 'beginner') return <span className="badge badge-green">Beginner</span>;
    if (d === 'intermediate') return <span className="badge badge-yellow">Intermediate</span>;
    return <span className="badge badge-red">Advanced</span>;
  }

  return (
    <div className="page">
      <h1 className="page-title">📖 Vocabulary</h1>
      <p className="page-subtitle">
        {learnedCount} / {totalContent} content words learned
        <span className="text-muted"> · Context words (le, la, de...) are taught through grammar lessons</span>
      </p>

      {/* Filters */}
      <div className="filter-row">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="input"
            placeholder="Search words..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        <select className="select" value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-secondary" style={{ cursor: 'pointer' }}>
          <label className="toggle">
            <input type="checkbox" checked={showContextWords} onChange={e => setShowContextWords(e.target.checked)} />
            <span className="toggle-slider" />
          </label>
          Show context words
        </label>
      </div>

      <p className="text-sm text-muted mb-4">{filtered.length} words shown</p>

      <div className="grid-auto">
        {filtered.map(word => {
          const learned = isLearned(word.id);
          const expanded = expandedId === word.id;

          return (
            <div
              key={word.id}
              className="word-card"
              style={{ border: learned ? '1px solid var(--success)' : undefined }}
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="french" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {word.french}
                    <AudioButton text={word.french} size="sm" showSlow />
                  </div>
                  <div className="english">{word.english}</div>
                </div>
                <div className="flex gap-2 items-center">
                  {word.isContextWord
                    ? <span className="context-word-chip">Grammar</span>
                    : diffBadge(word.difficulty)}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted" style={{ fontStyle: 'italic' }}>{word.partOfSpeech}</span>
                {word.quebecNote && <span className="badge badge-yellow">🍁 QC</span>}
              </div>

              {expanded && (
                <div>
                  {word.exampleSentence && (
                    <div className="example">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <strong>{word.exampleSentence}</strong>
                        <AudioButton text={word.exampleSentence} size="sm" />
                      </div>
                      <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>{word.exampleTranslation}</div>
                    </div>
                  )}
                  {word.collocations && word.collocations.length > 0 && (
                    <div className="collocations mt-2">
                      {word.collocations.map(c => (
                        <span key={c} className="collocation-chip">{c}</span>
                      ))}
                    </div>
                  )}
                  {word.quebecNote && (
                    <div className="quebec-note mt-2">🍁 {word.quebecNote}</div>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setExpandedId(expanded ? null : word.id)}
                  style={{ flex: 1 }}
                >
                  {expanded ? 'Less' : 'Details'}
                </button>
                {!word.isContextWord && (
                  <button
                    className={`btn btn-sm ${learned ? 'btn-outline' : 'btn-success'}`}
                    onClick={() => learned ? unmarkLearned(word.id) : markLearned(word.id)}
                  >
                    {learned ? '✓ Known' : '+ Learn'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No words found</h3>
          <p>Try a different search or category filter.</p>
        </div>
      )}
    </div>
  );
}
