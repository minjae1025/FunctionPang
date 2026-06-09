/**
 * localStorage keys
 */
export const STORAGE_KEYS = {
  USERS: 'functionpang_users',
  CURRENT_USER: 'functionpang_currentUser', // Legacy: stores name
  CURRENT_USER_ID: 'functionpang_currentUserId',
  CURRENT_LANGUAGE: 'functionpang_currentLanguage',
  HISTORY: 'functionpang_history',
};

/**
 * Generates a unique ID for a new user.
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Saves a practice record for the current user.
 * Limits to 10 records per user.
 */
export const savePracticeRecord = ({ score, type, lang }) => {
  const currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  
  if (!currentUserId) return;

  const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
  let history = savedHistory ? JSON.parse(savedHistory) : {};

  // Lazy migration: Convert old array format to object format
  if (Array.isArray(history)) {
    history = history.reduce((acc, record) => {
      const uid = record.userId;
      if (uid) {
        if (!acc[uid]) acc[uid] = [];
        acc[uid].push(record);
      }
      return acc;
    }, {});
  }

  const userHistory = history[currentUserId] || [];
  const newRecord = {
    score,
    type,
    lang,
    date: new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, ''),
  };

  history[currentUserId] = [newRecord, ...userHistory].slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};
