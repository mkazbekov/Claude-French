import { useState, useMemo } from 'react';
import { vocabulary } from '../data/vocabulary';
import { sentences } from '../data/sentences';
import { useProgress } from '../hooks/useProgress';

// ── Flashcard Mode ────────────────────────────────────
function FlashcardMode() {
  const { markLearned, isLearned } = useProgress();
  const pool = useMemo(() => vocabulary.filter(w => !w.isContextWord), []);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionLearned, setSessionLearned] = useState(0);

  const word = pool[index];

  function next() { setIndex(i => (i + 1) % pool.length); setFlipped(false); }
  function prev() { setIndex(i => (i - 1 + pool.length) % pool.length); setFlipped(false); }

  function handleLearned() {
    if (!isLearned(word.id)) { markLearned(word.id); setSessionLearned(s => s + 1); }
    next();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">Card {index + 1} of {pool.length}</span>
        <span className="badge badge-green">✓ {sessionLearned} learned this session</span>
      </div>

      <div className="flashcard-area">
        <div className="flashcard-wrapper">
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)} style={{ display: 'block', height: 260 }}>
            <div className="flashcard-front">
              <div className="flashcard-french">{word.french}</div>
              <div className="flashcard-pos">{word.partOfSpeech}</div>
              {word.collocations && word.collocations.length > 0 && (
                <div className="flashcard-hint">Common with: {word.collocations[0]}</div>
              )}
              <div className="text-xs text-muted mt-4">Click to reveal</div>
            </div>
            <div className="flashcard-back">
              <div className="flashcard-english">{word.english}</div>
              <div className="flashcard-example">{word.exampleSentence}</div>
              <div className="text-xs text-muted mt-2">{word.exampleTranslation}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flashcard-actions mt-4">
        <button className="btn btn-outline" onClick={prev}>← Prev</button>
        <button className="btn btn-danger" onClick={next}>Skip</button>
        <button className="btn btn-success" onClick={handleLearned}>
          {isLearned(word.id) ? '✓ Known' : '✓ I know this!'}
        </button>
        <button className="btn btn-outline" onClick={next}>Next →</button>
      </div>
    </div>
  );
}

// ── Multiple Choice Mode ──────────────────────────────
function MultipleChoice() {
  const { addQuizScore } = useProgress();
  const pool = useMemo(() => vocabulary.filter(w => !w.isContextWord).sort(() => Math.random() - 0.5).slice(0, 10), []);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const word = pool[current];
  const options = useMemo(() => {
    if (!word) return [];
    const wrong = vocabulary.filter(w => w.id !== word.id && !w.isContextWord).sort(() => Math.random() - 0.5).slice(0, 3);
    return [...wrong, word].sort(() => Math.random() - 0.5);
  }, [current, word]);

  function select(opt) {
    if (selected) return;
    setSelected(opt);
    if (opt.id === word.id) setCorrect(c => c + 1);
  }

  function next() {
    if (current === pool.length - 1) {
      addQuizScore(correct + (selected?.id === word.id ? 1 : 0), pool.length, 'multiple-choice');
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }

  if (done) {
    const score = correct;
    const pct = Math.round((score / pool.length) * 100);
    return (
      <div className="score-display">
        <div className={`score-circle ${pct >= 70 ? 'score-great' : pct >= 40 ? 'score-ok' : 'score-poor'}`}>
          {score}/{pool.length}
        </div>
        <h3 className="font-bold mb-2">{pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good job!' : '📚 Keep practicing!'}</h3>
        <p className="text-secondary mb-4">{pct}% correct</p>
        <button className="btn btn-primary" onClick={() => { setCurrent(0); setSelected(null); setCorrect(0); setDone(false); }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">Question {current + 1} of {pool.length}</span>
        <div className="progress-bar" style={{ width: 150 }}>
          <div className="progress-fill green" style={{ width: `${(current / pool.length) * 100}%` }} />
        </div>
      </div>

      <div className="card text-center mb-6" style={{ padding: '32px' }}>
        <p className="text-sm text-muted mb-2">What does this mean?</p>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{word.french}</div>
        <div className="text-xs text-muted mt-2" style={{ fontStyle: 'italic' }}>{word.partOfSpeech}</div>
      </div>

      {options.map((opt, i) => (
        <button
          key={i}
          className={`quiz-option ${selected ? (opt.id === word.id ? 'correct' : selected.id === opt.id ? 'incorrect' : '') : ''}`}
          onClick={() => select(opt)}
          disabled={!!selected}
        >
          {opt.english}
        </button>
      ))}

      {selected && (
        <div className="mt-3">
          {selected.id === word.id
            ? <div className="card card-sm" style={{ background: 'var(--success-light)', border: '1px solid var(--success)', color: 'var(--success)', marginBottom: 12 }}>✓ Correct!</div>
            : <div className="card card-sm" style={{ background: 'var(--danger-light)', border: '1px solid var(--danger)', color: 'var(--danger)', marginBottom: 12 }}>✗ Correct answer: <strong>{word.english}</strong></div>
          }
          {word.exampleSentence && (
            <div className="grammar-note mb-3">📝 Example: <em>{word.exampleSentence}</em> — {word.exampleTranslation}</div>
          )}
          <button className="btn btn-primary" onClick={next}>
            {current === pool.length - 1 ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Fill in the Blank Mode ────────────────────────────
function FillBlank() {
  const { addQuizScore } = useProgress();
  const pool = useMemo(() => sentences.filter(s => s.clozeWord).sort(() => Math.random() - 0.5).slice(0, 8), []);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const s = pool[current];

  function check() {
    const isCorrect = answer.trim().toLowerCase() === s.clozeWord.toLowerCase();
    setChecked(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setCorrect(c => c + 1);
  }

  function next() {
    if (current === pool.length - 1) {
      addQuizScore(correct, pool.length, 'fill-blank');
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setAnswer('');
      setChecked(null);
    }
  }

  if (done) {
    const pct = Math.round((correct / pool.length) * 100);
    return (
      <div className="score-display">
        <div className={`score-circle ${pct >= 70 ? 'score-great' : pct >= 40 ? 'score-ok' : 'score-poor'}`}>
          {correct}/{pool.length}
        </div>
        <h3 className="font-bold mb-2">{pct >= 70 ? '🎉 Great!' : '📚 Keep practicing!'}</h3>
        <p className="text-secondary mb-4">{pct}% correct</p>
        <button className="btn btn-primary" onClick={() => { setCurrent(0); setAnswer(''); setChecked(null); setCorrect(0); setDone(false); }}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">Sentence {current + 1} of {pool.length}</span>
        <span className={`badge ${s.level === 'beginner' ? 'badge-green' : 'badge-yellow'}`}>{s.level}</span>
      </div>

      <div className="card mb-4" style={{ padding: '24px' }}>
        <p className="text-sm text-muted mb-2">Fill in the missing word:</p>
        <div style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 8 }}>
          {s.blankedSentence.split('_____').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                checked === 'correct'
                  ? <span className="key-word">{s.clozeWord}</span>
                  : <input
                      className="cloze-input"
                      value={answer}
                      onChange={e => { setAnswer(e.target.value); setChecked(null); }}
                      onKeyDown={e => e.key === 'Enter' && !checked && check()}
                      placeholder="___"
                      disabled={!!checked}
                      autoFocus
                    />
              )}
            </span>
          ))}
        </div>
        <p className="text-sm text-secondary">{s.english}</p>
      </div>

      {s.grammarNote && <div className="grammar-note mb-4">{s.grammarNote}</div>}

      {!checked && (
        <button className="btn btn-primary" onClick={check} disabled={!answer.trim()}>Check Answer</button>
      )}

      {checked && (
        <div>
          {checked === 'correct'
            ? <div className="card card-sm mb-3" style={{ background: 'var(--success-light)', border: '1px solid var(--success)', color: 'var(--success)' }}>✓ Correct!</div>
            : <div className="card card-sm mb-3" style={{ background: 'var(--danger-light)', border: '1px solid var(--danger)', color: 'var(--danger)' }}>
                ✗ Answer: <strong>{s.clozeWord}</strong>
              </div>
          }
          <button className="btn btn-primary" onClick={next}>
            {current === pool.length - 1 ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Translation Mode ──────────────────────────────────
function TranslationMode() {
  const pool = useMemo(() => sentences.sort(() => Math.random() - 0.5).slice(0, 8), []);
  const [current, setCurrent] = useState(0);
  const [shown, setShown] = useState(false);

  const s = pool[current];

  return (
    <div>
      <span className="text-sm text-muted">Sentence {current + 1} of {pool.length}</span>

      <div className="card my-4" style={{ padding: '28px', textAlign: 'center' }}>
        <p className="text-sm text-muted mb-3">Translate this sentence:</p>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{s.french}</div>
        {!shown && <p className="text-xs text-muted">Think of the translation, then reveal it</p>}
        {shown && (
          <div>
            <hr className="divider" />
            <p className="text-secondary">{s.english}</p>
            {s.grammarNote && <div className="grammar-note mt-3">{s.grammarNote}</div>}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {!shown
          ? <button className="btn btn-primary btn-full" onClick={() => setShown(true)}>Reveal Translation</button>
          : (
            <>
              <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => { setShown(false); setCurrent(c => (c + 1) % pool.length); }}>Didn't know</button>
              <button className="btn btn-success" style={{ flex: 1 }} onClick={() => { setShown(false); setCurrent(c => (c + 1) % pool.length); }}>Got it!</button>
            </>
          )
        }
      </div>
    </div>
  );
}

// ── Main Practice Page ────────────────────────────────
export default function Practice() {
  const [mode, setMode] = useState(null);

  const modes = [
    { id: 'flashcards', icon: '🃏', title: 'Flashcards', desc: 'Classic front/back cards — mark words as you learn them', color: 'var(--primary)' },
    { id: 'multiple-choice', icon: '✅', title: 'Multiple Choice', desc: '10-question quizzes with immediate feedback', color: 'var(--success)' },
    { id: 'fill-blank', icon: '✏️', title: 'Fill in the Blank', desc: 'Complete real French sentences by typing the missing word', color: 'var(--warning)' },
    { id: 'translation', icon: '🔄', title: 'Sentence Translation', desc: 'See a French sentence and recall its English translation', color: 'var(--purple)' },
  ];

  if (mode) {
    return (
      <div className="page">
        <div className="flex items-center gap-3 mb-6">
          <button className="btn btn-outline btn-sm" onClick={() => setMode(null)}>← Back</button>
          <h2 className="font-semibold">{modes.find(m => m.id === mode)?.icon} {modes.find(m => m.id === mode)?.title}</h2>
        </div>
        {mode === 'flashcards' && <FlashcardMode />}
        {mode === 'multiple-choice' && <MultipleChoice />}
        {mode === 'fill-blank' && <FillBlank />}
        {mode === 'translation' && <TranslationMode />}
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">🎯 Practice</h1>
      <p className="page-subtitle">Choose a practice mode to reinforce your French learning.</p>

      <div className="grid-2">
        {modes.map(m => (
          <div
            key={m.id}
            className="card card-hover"
            onClick={() => setMode(m.id)}
            style={{ borderTop: `4px solid ${m.color}` }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{m.icon}</div>
            <h3 className="font-semibold mb-2">{m.title}</h3>
            <p className="text-sm text-secondary">{m.desc}</p>
            <button className="btn btn-outline btn-sm mt-4">Start →</button>
          </div>
        ))}
      </div>

      <div className="card mt-6" style={{ background: 'var(--success-light)', border: '1px solid var(--success)' }}>
        <h3 style={{ fontWeight: 600, color: 'var(--success)', marginBottom: 8 }}>💡 Practice Tips</h3>
        <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8 }}>
          <li>10–20 minutes daily is more effective than 2 hours once a week</li>
          <li>Try to use new words in sentences, not just recall their meaning</li>
          <li>Mix up practice modes — variety improves retention</li>
          <li>Focus on words you find difficult, not just the easy ones</li>
        </ul>
      </div>
    </div>
  );
}
