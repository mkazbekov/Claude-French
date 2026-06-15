import { useState } from 'react';
import { montrealPhrases, montrealCategories } from '../data/montreal';
import AudioButton from '../components/AudioButton';

export default function Montreal() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedPhrase, setExpandedPhrase] = useState(null);
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredPhrases = montrealPhrases.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (levelFilter !== 'all' && p.level !== levelFilter) return false;
    return true;
  });

  if (activeCategory) {
    const cat = montrealCategories.find(c => c.id === activeCategory);
    return (
      <div className="page">
        <div className="flex items-center gap-3 mb-4">
          <button className="btn btn-outline btn-sm" onClick={() => { setActiveCategory(null); setExpandedPhrase(null); }}>← All Categories</button>
          <h2 className="font-semibold" style={{ fontSize: '1.1rem' }}>{cat?.icon} {cat?.name}</h2>
        </div>

        <div className="filter-row">
          <select className="select" value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
          <span className="text-sm text-muted">{filteredPhrases.length} phrases</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredPhrases.map(phrase => {
            const isExpanded = expandedPhrase === phrase.id;
            return (
              <div key={phrase.id} className="phrase-card">
                <div className="phrase-card-header">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="french-phrase" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {phrase.french}
                        <AudioButton text={phrase.french} size="md" showSlow />
                      </div>
                      <div className="english-phrase">{phrase.english}</div>
                      <div className="pronunciation">🗣 {phrase.pronunciationHint}</div>
                    </div>
                    <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
                      <span className={`badge ${phrase.level === 'beginner' ? 'badge-green' : 'badge-yellow'}`}>{phrase.level}</span>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setExpandedPhrase(isExpanded ? null : phrase.id)}
                      >
                        {isExpanded ? 'Less' : 'Dialogue'}
                      </button>
                    </div>
                  </div>
                  <p className="when-to-use mt-2">📍 {phrase.whenToUse}</p>
                </div>

                {isExpanded && (
                  <div className="phrase-card-body">
                    <div className="dialogue">
                      {phrase.dialogue.map((line, i) => (
                        <div key={i} className="dialogue-line">
                          <span className="dialogue-speaker">{line.speaker}:</span>
                          <span>{line.text}</span>
                          <AudioButton text={line.text} size="sm" />
                        </div>
                      ))}
                    </div>
                    {phrase.quebecNote && (
                      <div className="quebec-note">🍁 <strong>Quebec note:</strong> {phrase.quebecNote}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredPhrases.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <h3>No phrases found</h3>
              <p>Try a different level filter.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">🍁 Montreal Survival French</h1>
      <p className="page-subtitle">
        Essential French phrases for everyday life in Montreal — with real dialogues, pronunciation hints, and Quebec-specific tips.
      </p>

      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, #1a5276, #196f3d)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '3rem' }}>🏙️</span>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Life in Montreal</h3>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
              Montreal is uniquely bilingual. Most businesses operate in French and appreciate the effort when you try.
              Quebec French has its own expressions — this section covers what you'll actually hear and need!
            </p>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {montrealCategories.map(cat => {
          const count = montrealPhrases.filter(p => p.category === cat.id).length;
          return (
            <div
              key={cat.id}
              className="card card-hover"
              onClick={() => setActiveCategory(cat.id)}
            >
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{cat.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{cat.name}</h3>
              <p className="text-sm text-secondary mb-3">{cat.description}</p>
              <span className="badge badge-blue">{count} phrases</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
