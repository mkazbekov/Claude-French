import { useApp } from '../context/AppContext';
import { vocabulary } from '../data/vocabulary';

export function useProgress() {
  const { state, dispatch } = useApp();
  const { progress, settings } = state;

  const totalWords = vocabulary.filter(w => !w.isContextWord).length;
  const learnedCount = progress.wordsLearned.length;
  const coveragePercent = Math.round((learnedCount / 3000) * 100);
  const localPercent = Math.round((learnedCount / totalWords) * 100);

  const dailyGoalPercent = Math.min(
    100,
    Math.round((progress.dailyGoalProgress / settings.dailyGoal) * 100)
  );

  function markLearned(wordId) {
    dispatch({ type: 'MARK_WORD_LEARNED', payload: wordId });
    updateStreak();
  }

  function unmarkLearned(wordId) {
    dispatch({ type: 'UNMARK_WORD_LEARNED', payload: wordId });
  }

  function isLearned(wordId) {
    return progress.wordsLearned.includes(wordId);
  }

  function completeGrammar(lessonId) {
    dispatch({ type: 'COMPLETE_GRAMMAR', payload: lessonId });
  }

  function isGrammarComplete(lessonId) {
    return progress.grammarCompleted.includes(lessonId);
  }

  function addQuizScore(score, total, type) {
    dispatch({ type: 'ADD_QUIZ_SCORE', payload: { score, total, type } });
  }

  function updateStreak() {
    const last = progress.lastStudied ? new Date(progress.lastStudied) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!last) {
      dispatch({ type: 'UPDATE_STREAK', payload: 1 });
    } else {
      const lastDay = new Date(last);
      lastDay.setHours(0, 0, 0, 0);
      const diff = (today - lastDay) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        dispatch({ type: 'UPDATE_STREAK', payload: progress.streak + 1 });
      } else if (diff > 1) {
        dispatch({ type: 'UPDATE_STREAK', payload: 1 });
      }
    }
  }

  return {
    progress,
    learnedCount,
    totalWords,
    coveragePercent,
    localPercent,
    dailyGoalPercent,
    markLearned,
    unmarkLearned,
    isLearned,
    completeGrammar,
    isGrammarComplete,
    addQuizScore,
  };
}
