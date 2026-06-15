let currentUtterance = null;
let voiceCache = null;

// Get all available French voices, ranked by quality
export function getFrenchVoices() {
  const voices = speechSynthesis.getVoices();
  return voices.filter(v => v.lang.startsWith('fr')).sort((a, b) => {
    // Prefer fr-CA (Quebec), then fr-FR, then others
    const score = v => {
      if (v.lang === 'fr-CA') return 3;
      if (v.lang === 'fr-FR') return 2;
      if (v.lang.startsWith('fr')) return 1;
      return 0;
    };
    return score(b) - score(a);
  });
}

export function getPreferredVoice(langPref = 'fr-CA') {
  if (voiceCache) return voiceCache;
  const voices = speechSynthesis.getVoices();
  // Try exact match first
  let voice = voices.find(v => v.lang === langPref);
  if (!voice) {
    // Try the other French variant
    const alt = langPref === 'fr-CA' ? 'fr-FR' : 'fr-CA';
    voice = voices.find(v => v.lang === alt);
  }
  if (!voice) {
    // Any French voice
    voice = voices.find(v => v.lang.startsWith('fr'));
  }
  voiceCache = voice || null;
  return voiceCache;
}

export function clearVoiceCache() {
  voiceCache = null;
}

export function speak(text, { lang = 'fr-CA', rate = 0.82, pitch = 1, onStart, onEnd, onError } = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API not supported');
    return;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;

  const voice = getPreferredVoice(lang);
  if (voice) utterance.voice = voice;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  currentUtterance = utterance;
  speechSynthesis.speak(utterance);
  return utterance;
}

export function speakSlow(text, opts = {}) {
  return speak(text, { ...opts, rate: 0.6 });
}

export function stopSpeaking() {
  speechSynthesis.cancel();
  currentUtterance = null;
}

export function isSpeaking() {
  return speechSynthesis.speaking;
}

export function isSupported() {
  return 'speechSynthesis' in window;
}

// Voices load async — call this to warm up the voice cache
export function initVoices() {
  return new Promise(resolve => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) { resolve(voices); return; }
    speechSynthesis.addEventListener('voiceschanged', () => {
      resolve(speechSynthesis.getVoices());
    }, { once: true });
  });
}
