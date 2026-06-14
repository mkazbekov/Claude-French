export function validateVocabulary(vocabulary) {
  const issues = [];
  const seen = new Set();

  vocabulary.forEach((word, i) => {
    if (seen.has(word.french.toLowerCase())) {
      issues.push({ type: 'duplicate', word: word.french, index: i, message: `Duplicate word: "${word.french}"` });
    }
    seen.add(word.french.toLowerCase());

    if (!word.english || word.english.trim() === '') {
      issues.push({ type: 'missing-translation', word: word.french, index: i, message: `Missing translation for "${word.french}"` });
    }

    if (!word.exampleSentence || word.exampleSentence.trim() === '') {
      issues.push({ type: 'missing-example', word: word.french, index: i, message: `Missing example sentence for "${word.french}"` });
    }

    if (!word.isContextWord && word.french.length <= 2 && word.partOfSpeech !== 'number') {
      issues.push({ type: 'short-word', word: word.french, index: i, message: `Very short non-context word: "${word.french}" — consider teaching through context` });
    }

    if (!word.partOfSpeech) {
      issues.push({ type: 'missing-pos', word: word.french, index: i, message: `Missing part of speech for "${word.french}"` });
    }
  });

  return { valid: issues.length === 0, issues };
}

export function validateGrammar(lessons) {
  const issues = [];
  lessons.forEach((lesson, i) => {
    if (!lesson.examples || lesson.examples.length === 0) {
      issues.push({ type: 'no-examples', lesson: lesson.title, message: `Lesson "${lesson.title}" has no examples` });
    }
    if (!lesson.quiz || lesson.quiz.length === 0) {
      issues.push({ type: 'no-quiz', lesson: lesson.title, message: `Lesson "${lesson.title}" has no quiz` });
    }
    if (!lesson.commonMistakes || lesson.commonMistakes.length === 0) {
      issues.push({ type: 'no-mistakes', lesson: lesson.title, message: `Lesson "${lesson.title}" has no common mistakes` });
    }
  });
  return { valid: issues.length === 0, issues };
}

export function validateMontreal(phrases) {
  const issues = [];
  phrases.forEach((phrase, i) => {
    if (!phrase.dialogue || phrase.dialogue.length === 0) {
      issues.push({ type: 'no-dialogue', phrase: phrase.french, message: `Phrase "${phrase.french}" has no dialogue` });
    }
    if (!phrase.pronunciationHint) {
      issues.push({ type: 'no-pronunciation', phrase: phrase.french, message: `Phrase "${phrase.french}" has no pronunciation hint` });
    }
  });
  return { valid: issues.length === 0, issues };
}

export function runAllValidations(vocabulary, grammar, montreal) {
  const vocabResult = validateVocabulary(vocabulary);
  const grammarResult = validateGrammar(grammar);
  const montrealResult = validateMontreal(montreal);

  const allIssues = [
    ...vocabResult.issues.map(i => ({ ...i, dataset: 'vocabulary' })),
    ...grammarResult.issues.map(i => ({ ...i, dataset: 'grammar' })),
    ...montrealResult.issues.map(i => ({ ...i, dataset: 'montreal' })),
  ];

  const summary = {
    vocabulary: { total: vocabulary.length, issues: vocabResult.issues.length, valid: vocabResult.valid },
    grammar: { total: grammar.length, issues: grammarResult.issues.length, valid: grammarResult.valid },
    montreal: { total: montreal.length, issues: montrealResult.issues.length, valid: montrealResult.valid },
    allIssues,
    overallValid: allIssues.length === 0,
  };

  return summary;
}
