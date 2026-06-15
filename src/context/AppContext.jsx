import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

const initialProgress = {
  wordsLearned: [],
  grammarCompleted: [],
  streak: 0,
  lastStudied: null,
  totalXP: 0,
  quizScores: [],
  dailyGoalProgress: 0,
  lastGoalDate: null,
};

const initialState = {
  darkMode: false,
  progress: initialProgress,
  settings: { dailyGoal: 10, showPronunciation: true, voiceLang: 'fr-CA' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'MARK_WORD_LEARNED': {
      const wordsLearned = [...new Set([...state.progress.wordsLearned, action.payload])];
      const today = new Date().toDateString();
      const dailyGoalProgress = state.progress.lastGoalDate === today
        ? state.progress.dailyGoalProgress + 1
        : 1;
      return {
        ...state,
        progress: {
          ...state.progress,
          wordsLearned,
          dailyGoalProgress,
          lastGoalDate: today,
          totalXP: state.progress.totalXP + 10,
        },
      };
    }

    case 'UNMARK_WORD_LEARNED': {
      const wordsLearned = state.progress.wordsLearned.filter(id => id !== action.payload);
      return { ...state, progress: { ...state.progress, wordsLearned } };
    }

    case 'COMPLETE_GRAMMAR': {
      const grammarCompleted = [...new Set([...state.progress.grammarCompleted, action.payload])];
      return {
        ...state,
        progress: { ...state.progress, grammarCompleted, totalXP: state.progress.totalXP + 50 },
      };
    }

    case 'ADD_QUIZ_SCORE': {
      const quizScores = [...state.progress.quizScores, { ...action.payload, date: new Date().toISOString() }];
      return {
        ...state,
        progress: { ...state.progress, quizScores, totalXP: state.progress.totalXP + action.payload.score },
      };
    }

    case 'UPDATE_STREAK':
      return { ...state, progress: { ...state.progress, streak: action.payload, lastStudied: new Date().toISOString() } };

    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'RESET_PROGRESS':
      return { ...state, progress: initialProgress };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('frenchApp_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('frenchApp_v1', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
