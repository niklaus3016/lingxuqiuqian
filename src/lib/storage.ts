let favoritesCache: any[] | null = null;
let settingsCache: any = null;

export const storage = {
  getFavorites: (): any[] => {
    if (favoritesCache === null) {
      favoritesCache = JSON.parse(localStorage.getItem('app_favorites') || '[]');
    }
    return favoritesCache;
  },

  setFavorites: (favorites: any[]): void => {
    favoritesCache = favorites;
    localStorage.setItem('app_favorites', JSON.stringify(favorites));
  },

  getSettings: (): any => {
    if (settingsCache === null) {
      const saved = localStorage.getItem('app_settings');
      settingsCache = saved ? JSON.parse(saved) : null;
    }
    return settingsCache;
  },

  setSettings: (settings: any): void => {
    settingsCache = settings;
    localStorage.setItem('app_settings', JSON.stringify(settings));
  },

  clearCache: (): void => {
    favoritesCache = null;
    settingsCache = null;
  }
};