import { useState } from 'react';
import { wordFamilies, phraseChunks } from '../data/wordFamilies';
import AudioButton from '../components/AudioButton';

export default function WordFamilies() {
  const [activeTab, setActiveTab] = useState('families');
  const [expandedFamily, setExpandedFamily] = useState(wordFamilies[0]?.id || null);

  return (
    <div className="page">
      <h1 className="page-title">🌿 Word Families & Phrase Chunks</h1>
      <p className="page-subtitle">Learn how key verbs are used in real everyday expressions — the most powerful way to expand your French!</p>

      <div className="tabs">
        <button className={`tab ${activeTab === 'families' ? 'active' : ''}`} onClick={() => setActiveTab('families')}>Word Families</button>
        <button className={`tab ${activeTab === 'chunks' ? 'active' : ''}`} onClick={() => setActiveTab('chunks')}>Phrase Chunks</button>
      </div>

      {activeTab === 'families' && (
        <div>
          <div className="card mb-4" style={{ background: 'var(--primary-light)', border: '1px solid var(--primary)' }}>
            <p className="text-sm" style={{ color: 'var(--primary)' }}>
              💡 <strong>Why word families?</strong> Knowing one word can unlock dozens of expressions.
              Mastering <em>faire</em> alone lets you say "cook", "exercise", "go for a walk", "pay attention", and much more!
            </p>
          </div>

          {wordFamilies.map(family => {
            const isOpen = expandedFamily === family.id;
            return (
              <div key={family.id} className="grammar-lesson mb-3">
                <div
                  className="lesson-header"
                  onClick={() => setExpandedFamily(isOpen ? null : family.id)}
                >
                  <div className="lesson-header-left">
                    <div>
                      <div className="lesson-title">{family.title}</div>
                      <div className="lesson-level">{family.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-blue">{family.expressions.length} expressions</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="lesson-body">
                    <table className="examples-table">
                      <thead>
                        <tr>
                          <th>Expression</th>
                          <th>Meaning</th>
                          <th>Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {family.expressions.map((expr, i) => (
                          <tr key={i}>
                            <td className="fr" style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                {expr.french}
                                <AudioButton text={expr.french} size="sm" showSlow />
                              </span>
                            </td>
                            <td style={{ color: 'var(--text-secondary)' }}>{expr.english}</td>
                            <td>
                              <div style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                {expr.example}
                                <AudioButton text={expr.example} size="sm" />
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{expr.exampleTranslation}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'chunks' && (
        <div>
          <div className="card mb-4" style={{ background: 'var(--success-light)', border: '1px solid var(--success)' }}>
            <p className="text-sm" style={{ color: 'var(--success)' }}>
              💡 <strong>Phrase chunks</strong> are ready-made expressions you can use immediately.
              Learn these as single units — they'll make you sound fluent much faster!
            </p>
          </div>

          <div className="grid-auto">
            {phraseChunks.map(chunk => (
              <div key={chunk.id} className="card card-sm" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {chunk.chunk}
                    <AudioButton text={chunk.chunk} size="sm" showSlow />
                  </span>
                  <span className={`badge ${chunk.level === 'beginner' ? 'badge-green' : 'badge-yellow'}`}>
                    {chunk.level}
                  </span>
                </div>
                <p className="text-sm text-secondary mb-3">{chunk.meaning}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {chunk.examples.map((ex, i) => (
                    <div key={i} style={{ fontSize: '0.82rem', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                      "{ex}"
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
