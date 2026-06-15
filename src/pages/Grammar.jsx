import { useState } from 'react';
import { grammarLessons } from '../data/grammar';
import { useProgress } from '../hooks/useProgress';
import AudioButton from '../components/AudioButton';

function Quiz({ lesson, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const q = lesson.quiz[current];
  const isLast = current === lesson.quiz.length - 1;

  function select(idx) {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers(a => [...a, { correct: idx === q.correct }]);
  }

  function next() {
    if (isLast) {
      const score = answers.filter(a => a.correct).length + (selected === q.correct ? 1 : 0);
      onComplete(score, lesson.quiz.length);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted">Question {current + 1} of {lesson.quiz.length}</span>
        <div className="progress-bar" style={{ width: 120 }}>
          <div className="progress-fill" style={{ width: `${((current) / lesson.quiz.length) * 100}%` }} />
        </div>
      </div>

      <p className="font-semibold mb-4" style={{ fontSize: '1rem' }}>{q.question}</p>

      {q.options.map((opt, i) => (
        <button
          key={i}
          className={`quiz-option ${selected !== null ? (i === q.correct ? 'correct' : selected === i ? 'incorrect' : '') : ''}`}
          onClick={() => select(i)}
          disabled={selected !== null}
        >
          {opt}
        </button>
      ))}

      {selected !== null && (
        <div className="card card-sm mt-3" style={{
          background: selected === q.correct ? 'var(--success-light)' : 'var(--danger-light)',
          border: `1px solid ${selected === q.correct ? 'var(--success)' : 'var(--danger)'}`,
        }}>
          <p className="text-sm">{q.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button className="btn btn-primary mt-3" onClick={next}>
          {isLast ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

function LessonView({ lesson, onClose }) {
  const [view, setView] = useState('lesson');
  const [quizScore, setQuizScore] = useState(null);
  const { completeGrammar, isGrammarComplete } = useProgress();

  function handleQuizComplete(score, total) {
    setQuizScore({ score, total });
    if (score >= Math.ceil(total * 0.7)) {
      completeGrammar(lesson.id);
    }
    setView('score');
  }

  const pct = quizScore ? Math.round((quizScore.score / quizScore.total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button className="btn btn-outline btn-sm" onClick={onClose}>← Back</button>
        <h2 className="font-semibold" style={{ fontSize: '1.1rem' }}>{lesson.icon} {lesson.title}</h2>
        {isGrammarComplete(lesson.id) && <span className="badge badge-green">✓ Completed</span>}
      </div>

      <div className="tabs">
        <button className={`tab ${view === 'lesson' ? 'active' : ''}`} onClick={() => setView('lesson')}>Lesson</button>
        <button className={`tab ${view === 'quiz' ? 'active' : ''}`} onClick={() => setView('quiz')}>Quiz</button>
        <button className={`tab ${view === 'mistakes' ? 'active' : ''}`} onClick={() => setView('mistakes')}>Common Mistakes</button>
        {quizScore && <button className={`tab ${view === 'score' ? 'active' : ''}`} onClick={() => setView('score')}>Results</button>}
      </div>

      {view === 'lesson' && (
        <div>
          <div className="lesson-explanation">{lesson.content}</div>
          <h3 className="section-title">Examples</h3>
          <table className="examples-table">
            <thead><tr><th>French</th><th>English</th>{lesson.examples.some(e => e.note) && <th>Note</th>}</tr></thead>
            <tbody>
              {lesson.examples.map((ex, i) => (
                <tr key={i}>
                  <td className="fr">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {ex.french}
                      <AudioButton text={ex.french} size="sm" showSlow />
                    </span>
                  </td>
                  <td>{ex.english}</td>
                  {ex.note && <td className="note">{ex.note}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mt-4" onClick={() => setView('quiz')}>Take the Quiz →</button>
        </div>
      )}

      {view === 'quiz' && !quizScore && (
        <Quiz lesson={lesson} onComplete={handleQuizComplete} />
      )}

      {view === 'score' && quizScore && (
        <div className="score-display">
          <div className={`score-circle ${pct >= 70 ? 'score-great' : pct >= 40 ? 'score-ok' : 'score-poor'}`}>
            {quizScore.score}/{quizScore.total}
          </div>
          <h3 className="font-bold mb-2">{pct >= 70 ? '🎉 Great job!' : pct >= 40 ? '👍 Good effort!' : '📚 Keep studying!'}</h3>
          <p className="text-secondary mb-4">Score: {pct}%{pct >= 70 ? ' — Lesson marked complete!' : ''}</p>
          <div className="flex gap-3 justify-center">
            <button className="btn btn-outline" onClick={() => { setQuizScore(null); setView('quiz'); }}>Retake Quiz</button>
            <button className="btn btn-primary" onClick={onClose}>Back to Lessons</button>
          </div>
        </div>
      )}

      {view === 'mistakes' && (
        <div>
          <h3 className="section-title">⚠️ Common Mistakes</h3>
          <div className="card">
            {lesson.commonMistakes.map((m, i) => (
              <div key={i} className="mistake-item">{m}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Grammar() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [levelFilter, setLevelFilter] = useState('all');
  const { isGrammarComplete } = useProgress();

  const filtered = grammarLessons.filter(l => levelFilter === 'all' || l.level === levelFilter);

  if (activeLesson) {
    return (
      <div className="page">
        <LessonView lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">📐 Grammar</h1>
      <p className="page-subtitle">Learn French grammar step by step, with explanations, examples, and quizzes.</p>

      <div className="filter-row mb-4">
        <select className="select" value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
        </select>
        <span className="text-sm text-muted">
          {grammarLessons.filter(l => isGrammarComplete(l.id)).length} / {grammarLessons.length} completed
        </span>
      </div>

      {filtered.map(lesson => (
        <div key={lesson.id} className="grammar-lesson">
          <div className="lesson-header" onClick={() => setActiveLesson(lesson)}>
            <div className="lesson-header-left">
              <span className="lesson-icon">{lesson.icon}</span>
              <div>
                <div className="lesson-title">{lesson.title}</div>
                <div className="lesson-level">{lesson.explanation}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${lesson.level === 'beginner' ? 'badge-green' : 'badge-yellow'}`}>{lesson.level}</span>
              {isGrammarComplete(lesson.id)
                ? <span className="badge badge-green">✓ Done</span>
                : <span className="text-muted">→</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
