// LocalStorage persistence for test sessions and user preferences

const SESSIONS_STORAGE_KEY = 'matikkapeli_sessions_v1';
const SETTINGS_STORAGE_KEY = 'matikkapeli_last_settings';

export function getSavedSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error loading history from localStorage', err);
    return [];
  }
}

export function saveSessionResult(session) {
  try {
    const sessions = getSavedSessions();
    const newSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      operations: session.operations || [],
      questionCount: session.questionCount || 10,
      score: session.score || 0,
      percentage: Math.round(((session.score || 0) / (session.questionCount || 1)) * 100),
      timeTakenSeconds: session.timeTakenSeconds || 0,
      feedbackMode: session.feedbackMode || 'immediate',
      configSnapshot: session.config || {},
      items: session.items || [], // array of { problem, userAnswer, correctAnswer, isCorrect, attempts }
    };

    const updated = [newSession, ...sessions];
    // Keep up to 100 recent sessions to prevent infinite growth
    const trimmed = updated.slice(0, 100);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(trimmed));
    return newSession;
  } catch (err) {
    console.error('Error saving session to localStorage', err);
    return null;
  }
}

export function deleteSessionById(id) {
  try {
    const sessions = getSavedSessions().filter(s => s.id !== id);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    return sessions;
  } catch (err) {
    console.error('Error deleting session', err);
    return [];
  }
}

export function clearAllSessions() {
  try {
    localStorage.removeItem(SESSIONS_STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Error clearing history', err);
    return [];
  }
}

export function getHistoryStats() {
  const sessions = getSavedSessions();
  if (sessions.length === 0) {
    return {
      totalTests: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averagePercentage: 0,
      totalTimeSeconds: 0,
    };
  }

  const totalTests = sessions.length;
  const totalQuestions = sessions.reduce((sum, s) => sum + (s.questionCount || 0), 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + (s.score || 0), 0);
  const totalTimeSeconds = sessions.reduce((sum, s) => sum + (s.timeTakenSeconds || 0), 0);
  const averagePercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return {
    totalTests,
    totalQuestions,
    totalCorrect,
    averagePercentage,
    totalTimeSeconds,
  };
}

export function saveLastConfig(config) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn(e);
  }
}

export function getLastConfig() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

