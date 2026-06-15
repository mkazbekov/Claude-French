import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { runAllValidations } from '../data/validation';
import { vocabulary } from '../data/vocabulary';
import { grammarLessons } from '../data/grammar';
import { montrealPhrases } from '../data/montreal';
import { getFrenchVoices, speak, clearVoiceCache } from '../utils/audio';

export default function Settings() {
  const { state, dispatch } = useApp();
  const { settings, darkMode } = state;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [validation, setValidation] = useState(null);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const load = () => setVoices(getFrenchVoices());
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
    return () => speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  function runValidation() {
    const result = runAllValidations(vocabulary, grammarLessons, montrealPhrases);
    setValidation(result);
  }

  return (
    <div className="page">
      <h1 className="page-title">⚙️ Settings</h1>
      <p className="page-subtitle">Customize your French learning experience.</p>

      {/* Display */}
      <div className="card mb-4">
        <h3 className="section-title">🎨 Display</h3>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <div className="font-semibold text-sm">Dark Mode</div>
            <div className="text-xs text-muted">Easier on the eyes at night</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={darkMode} onChange={() => dispatch({ type: 'TOGGLE_DARK_MODE' })} />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      {/* Audio */}
      <div className="card mb-4">
        <h3 className="section-title">🔊 Audio & Pronunciation</h3>
        <div className="py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold text-sm">French Voice</div>
              <div className="text-xs text-muted">Preferred pronunciation dialect</div>
            </div>
            <select
              className="select"
              style={{ width: 'auto' }}
              value={settings.voiceLang || 'fr-CA'}
              onChange={e => { clearVoiceCache(); dispatch({ type: 'UPDATE_SETTINGS', payload: { voiceLang: e.target.value } }); }}
            >
              <option value="fr-CA">Français canadien (fr-CA)</option>
              <option value="fr-FR">Français de France (fr-FR)</option>
            </select>
          </div>
          {voices.length > 0 ? (
            <div>
              <p className="text-xs text-muted mb-2">Available voices on your device:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {voices.slice(0, 6).map(v => (
                  <div key={v.name} className="flex items-center justify-between text-xs" style={{ padding: '4px 8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                    <span>{v.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-blue">{v.lang}</span>
                      <button className="btn btn-sm btn-outline" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => speak('Bonjour, je parle français.', { lang: v.lang })}>Test</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted">No French voices detected. Install French language packs in your OS settings for better quality audio.</p>
          )}
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-semibold text-sm">Test Audio</div>
            <div className="text-xs text-muted">Verify pronunciation is working</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => speak('Bonjour! Je parle français. Comment allez-vous?', { lang: settings.voiceLang || 'fr-CA' })}>
            🔊 Test Voice
          </button>
        </div>
      </div>

      {/* Learning */}
      <div className="card mb-4">
        <h3 className="section-title">📚 Learning</h3>
        <div className="py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-sm">Daily Word Goal</div>
              <div className="text-xs text-muted">How many new words to learn each day</div>
            </div>
            <span className="badge badge-blue">{settings.dailyGoal} words</span>
          </div>
          <input
            type="range"
            min={5} max={30} step={5}
            value={settings.dailyGoal}
            onChange={e => dispatch({ type: 'UPDATE_SETTINGS', payload: { dailyGoal: Number(e.target.value) } })}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid var(--border)' }}>
          <div>
            <div className="font-semibold text-sm">Show Pronunciation Hints</div>
            <div className="text-xs text-muted">Display phonetic hints for Montreal phrases</div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.showPronunciation}
              onChange={e => dispatch({ type: 'UPDATE_SETTINGS', payload: { showPronunciation: e.target.checked } })}
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      {/* Data Validation */}
      <div className="card mb-4">
        <h3 className="section-title">🔍 Data Validation</h3>
        <p className="text-sm text-secondary mb-3">
          Run a check to verify the quality of vocabulary, grammar, and Montreal phrase data.
        </p>
        <button className="btn btn-outline" onClick={runValidation}>Run Validation</button>

        {validation && (
          <div className="mt-4">
            <div className="grid-3 mb-3">
              {[
                { label: 'Vocabulary', ...validation.vocabulary },
                { label: 'Grammar', ...validation.grammar },
                { label: 'Montreal', ...validation.montreal },
              ].map(ds => (
                <div key={ds.label} className={`card card-sm text-center`} style={{
                  background: ds.valid ? 'var(--success-light)' : 'var(--warning-light)',
                  border: `1px solid ${ds.valid ? 'var(--success)' : 'var(--warning)'}`,
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{ds.valid ? '✅' : '⚠️'}</div>
                  <div className="font-semibold text-sm">{ds.label}</div>
                  <div className="text-xs text-muted">{ds.total} items · {ds.issues} issues</div>
                </div>
              ))}
            </div>
            {validation.allIssues.length > 0 && (
              <div className="card card-sm" style={{ background: 'var(--warning-light)', border: '1px solid var(--warning)' }}>
                <p className="font-semibold text-sm mb-2">Issues found:</p>
                {validation.allIssues.slice(0, 10).map((issue, i) => (
                  <div key={i} className="text-xs text-secondary mb-1">• [{issue.dataset}] {issue.message}</div>
                ))}
                {validation.allIssues.length > 10 && (
                  <div className="text-xs text-muted">...and {validation.allIssues.length - 10} more</div>
                )}
              </div>
            )}
            {validation.overallValid && (
              <div className="card card-sm" style={{ background: 'var(--success-light)', border: '1px solid var(--success)', color: 'var(--success)' }}>
                ✅ All data validated successfully! No issues found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="card" style={{ borderColor: 'var(--danger)' }}>
        <h3 className="section-title" style={{ color: 'var(--danger)' }}>⚠️ Reset Progress</h3>
        <p className="text-sm text-secondary mb-3">
          This will erase all your learned words, grammar completions, quiz scores, and streak. This cannot be undone.
        </p>
        {!showResetConfirm ? (
          <button className="btn btn-danger" onClick={() => setShowResetConfirm(true)}>Reset All Progress</button>
        ) : (
          <div className="card card-sm" style={{ background: 'var(--danger-light)', border: '1px solid var(--danger)' }}>
            <p className="text-sm font-semibold mb-3">Are you sure? All progress will be lost.</p>
            <div className="flex gap-3">
              <button
                className="btn btn-danger"
                onClick={() => { dispatch({ type: 'RESET_PROGRESS' }); setShowResetConfirm(false); }}
              >
                Yes, Reset Everything
              </button>
              <button className="btn btn-outline" onClick={() => setShowResetConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
