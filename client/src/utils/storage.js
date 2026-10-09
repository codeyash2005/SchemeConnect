const KEYS = {
  THEME: 'scheme_connect_theme',
  LANG: 'scheme_connect_language',
  PROFILE: 'scheme_connect_student_profile',
  CHECKLIST: 'scheme_connect_doc_checklist',
};

export const storage = {
  getTheme: () => localStorage.getItem(KEYS.THEME) || 'light',
  setTheme: (theme) => localStorage.setItem(KEYS.THEME, theme),

  getLanguage: () => localStorage.getItem(KEYS.LANG) || 'en',
  setLanguage: (lang) => localStorage.setItem(KEYS.LANG, lang),

  getProfile: () => {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setProfile: (profile) => {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to LocalStorage', e);
    }
  },

  getChecklist: () => {
    try {
      const data = localStorage.getItem(KEYS.CHECKLIST);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setChecklist: (items) => {
    try {
      localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save checklist to LocalStorage', e);
    }
  },
};
