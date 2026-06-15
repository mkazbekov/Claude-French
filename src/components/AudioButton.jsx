import { useState, useEffect } from 'react';
import { speak, speakSlow, stopSpeaking, isSupported, initVoices } from '../utils/audio';
import { useApp } from '../context/AppContext';

// Shared voice-ready state across all instances
let voicesReady = false;
initVoices().then(() => { voicesReady = true; });

export default function AudioButton({
  text,
  size = 'md',       // 'sm' | 'md' | 'lg'
  showSlow = false,  // show a "slow" button alongside
  label,             // optional accessible label override
  style,
}) {
  const { state } = useApp();
  const lang = state.settings?.voiceLang || 'fr-CA';
  const [playing, setPlaying] = useState(false);
  const [supported] = useState(isSupported);

  useEffect(() => () => stopSpeaking(), []);

  if (!supported) return null;

  const iconSize = { sm: '0.85rem', md: '1rem', lg: '1.25rem' };
  const padSize  = { sm: '4px 6px', md: '6px 8px', lg: '8px 12px' };

  function playNormal() {
    if (playing) { stopSpeaking(); setPlaying(false); return; }
    speak(text, {
      lang,
      onStart: () => setPlaying(true),
      onEnd:   () => setPlaying(false),
      onError: () => setPlaying(false),
    });
  }

  function playSlow() {
    speakSlow(text, {
      lang,
      onStart: () => setPlaying(true),
      onEnd:   () => setPlaying(false),
      onError: () => setPlaying(false),
    });
  }

  const btnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: padSize[size],
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    background: playing ? 'var(--primary-light)' : 'var(--bg-card)',
    color: playing ? 'var(--primary)' : 'var(--text-muted)',
    cursor: 'pointer', fontSize: iconSize[size],
    transition: 'all 0.15s',
    fontFamily: 'var(--font)',
    ...style,
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <button
        onClick={playNormal}
        style={btnStyle}
        title={label || `Listen: ${text}`}
        aria-label={label || `Play pronunciation of: ${text}`}
      >
        {playing ? '⏹' : '🔊'}
      </button>
      {showSlow && (
        <button
          onClick={playSlow}
          style={{ ...btnStyle, background: 'var(--bg-card)', color: 'var(--text-muted)', fontSize: `calc(${iconSize[size]} * 0.85)` }}
          title={`Listen slowly: ${text}`}
          aria-label={`Play slowly: ${text}`}
        >
          🐢
        </button>
      )}
    </span>
  );
}
