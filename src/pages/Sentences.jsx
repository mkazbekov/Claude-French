import { useState, useMemo } from 'react';
import { sentences } from '../data/sentences';

export default function Sentences() {
  const [activeTab, setActiveTab] = useState('browse');
  const [level, setLevel] = useState('all');
  const [category, setCategory] = useState('all');
  const [revealed, setRevealed] = useState({});
  const [clozeAnswers, setClozeAnswers] = useState({});
  const [clozeChecked, setClozeChecked] = useState({});

  const categories = [...new Set(sentences.map(s => s.category))];

  const filtered = useMemo(() => {
    return sentences.filter(s => {
      if (level !== 'all' && s.level !== level) return false;
      if (category !== 'all' && s.category !== category) return false;
      return true;
    });
  }, [level, category]);

  function toggleReveal(id) {
    setRevealed(r => ({ ...r, [id]: !r[id] }));
  }

  function highlightKeyWords(text, keyWords) {
    if (!keyWords || keyWords.length === 0) return text;
    const regex = new RegExp(`(${keyWords.join('|')})`, 'gi');
    return text.split(regex).map((part, i) =>
      keyWords.some(kw => kw.toLowerCase() === part.toLowerCase())
        ? <span key={i} className="key-word">{part}</span>
        : part
    );
  }

  function checkCloze(sentence) {
    const answer = (clozeAnswers[sentence.id] || '').trim().toLowerCase();
    const correct = sentence.clozeWord.toLowerCase();
    setClozeChecked(c => ({ ...c, [sentence.id]: answer === correct ? 'correct' : 'incorrect' }));
  }

  return (
    <div className="page">
      <h1 className="page-title">💬 Sentences</h1>
      <p className="page-subtitle">Learn French vocabulary in context through real sentences. Understanding sentences builds faster fluency than memorizing isolated words.</p>

      <div className="tabs">
        <button className={`tab ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>Browse & Translate</button>
        <button className={`tab ${activeTab === 'cloze' ? 'active' : ''}`} onClick={() => setActiveTab('cloze')}>Fill in the Blank</button>
      </div>

      <div className="filter-row">
        <select className="select" value={level} onChange={e => setLevel(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
        </select>
        <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="text-sm text-muted">{filtered.length} sentences</span>
      </div>

      {activeTab === 'browse' && (
        <div>
          {filtered.map(s => (
            <div key={s.id} className="sentence-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="sentence-fr">{highlightKeyWords(s.french, s.keyWords)}</div>
                  {revealed[s.id] && (
                    <div className="sentence-en mt-2">{s.english}</div>
                  )}
                </div>
                <div className="flex gap-2 items-center" style={{ flexShrink: 0 }}>
                  <span className={`badge ${s.level === 'beginner' ? 'badge-green' : 'badge-yellow'}`}>{s.level}</span>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => toggleReveal(s.id)}
                  >
                    {revealed[s.id] ? 'Hide' : 'Translate'}
                  </button>
                </div>
              </div>
              {s.grammarNote && (
                <div className="grammar-note">{s.grammarNote}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'cloze' && (
        <div>
          <div className="card mb-4" style={{ background: 'var(--primary-light)', border: '1px solid var(--primary)' }}>
            <p className="text-sm" style={{ color: 'var(--primary)' }}>
              Fill in the missing word. This trains your active recall of French vocabulary in context!
            </p>
          </div>
          {filtered.filter(s => s.clozeWord).map(s => {
            const result = clozeChecked[s.id];
            return (
              <div key={s.id} className="sentence-card" style={{
                borderColor: result === 'correct' ? 'var(--success)' : result === 'incorrect' ? 'var(--danger)' : undefined
              }}>
                <div className="sentence-fr mb-3">
                  {s.blankedSentence.split('_____').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        result === 'correct'
                          ? <span className="key-word">{s.clozeWord}</span>
                          : <input
                              className="cloze-input"
                              value={clozeAnswers[s.id] || ''}
                              onChange={e => { setClozeAnswers(a => ({ ...a, [s.id]: e.target.value })); setClozeChecked(c => ({ ...c, [s.id]: null })); }}
                              onKeyDown={e => e.key === 'Enter' && checkCloze(s)}
                              placeholder="___"
                              disabled={!!result}
                            />
                      )}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {!result && (
                    <button className="btn btn-sm btn-primary" onClick={() => checkCloze(s)}>Check</button>
                  )}
                  {result === 'correct' && <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Correct!</span>}
                  {result === 'incorrect' && (
                    <span style={{ color: 'var(--danger)', fontWeight: 600 }}>
                      ✗ Answer: <strong>{s.clozeWord}</strong>
                    </span>
                  )}
                  {result && (
                    <button className="btn btn-sm btn-outline" onClick={() => { setClozeAnswers(a => ({ ...a, [s.id]: '' })); setClozeChecked(c => ({ ...c, [s.id]: null })); }}>
                      Try again
                    </button>
                  )}
                </div>

                <div className="sentence-en mt-2">{s.english}</div>
                {s.grammarNote && <div className="grammar-note">{s.grammarNote}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
