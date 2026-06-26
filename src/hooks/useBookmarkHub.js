import { useState, useMemo, useCallback } from 'react';
import { initialApps, defaultCategoryIcons } from '../data/apps';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT = 10;
const ADMIN_PIN = '1234';

export function useBookmarkHub() {
  const [apps, setApps] = useLocalStorage('bookmarkHub-apps', initialApps);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useLocalStorage('bookmarkHub-darkMode', false);
  const [favorites, setFavorites] = useLocalStorage('bookmarkHub-favorites', []);
  const [recentApps, setRecentApps] = useLocalStorage('bookmarkHub-recent', []);
  const [isAdmin, setIsAdmin] = useLocalStorage('bookmarkHub-admin', false);
  const [categoryIcons, setCategoryIcons] = useLocalStorage('bookmarkHub-categoryIcons', defaultCategoryIcons);

  const allCategories = useMemo(() => {
    const cats = [...new Set(apps.map(a => a.category))];
    cats.sort();
    return ['All', ...cats];
  }, [apps]);

  const toggleDark = useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  const verifyAdmin = useCallback((pin) => {
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, [setIsAdmin]);

  const exitAdmin = useCallback(() => {
    setIsAdmin(false);
  }, [setIsAdmin]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  }, [setFavorites]);

  const launchApp = useCallback((id) => {
    setRecentApps(prev => {
      const filtered = prev.filter(rId => rId !== id);
      return [id, ...filtered].slice(0, MAX_RECENT);
    });
  }, [setRecentApps]);

  const addApp = useCallback((appData) => {
    setApps(prev => {
      const maxId = prev.reduce((max, a) => Math.max(max, a.id), 0);
      return [...prev, { ...appData, id: maxId + 1 }];
    });
  }, [setApps]);

  const updateApp = useCallback((id, appData) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, ...appData } : a));
  }, [setApps]);

  const deleteApp = useCallback((id) => {
    setApps(prev => prev.filter(a => a.id !== id));
    setFavorites(prev => prev.filter(fId => fId !== id));
    setRecentApps(prev => prev.filter(rId => rId !== id));
  }, [setApps, setFavorites, setRecentApps]);

  const updateCategoryIcon = useCallback((category, icon) => {
    setCategoryIcons(prev => ({ ...prev, [category]: icon }));
  }, [setCategoryIcons]);

  const filteredApps = useMemo(() => {
    let result = [...apps];

    if (selectedCategory !== 'All') {
      result = result.filter(app => app.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(app =>
        app.name.toLowerCase().includes(q) ||
        app.desc.toLowerCase().includes(q) ||
        app.keywords.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
        break;
      case 'recent':
        result.sort((a, b) => {
          const aIdx = recentApps.indexOf(a.id);
          const bIdx = recentApps.indexOf(b.id);
          const aRank = aIdx === -1 ? Infinity : aIdx;
          const bRank = bIdx === -1 ? Infinity : bIdx;
          return aRank - bRank;
        });
        break;
      default:
        break;
    }

    return result;
  }, [apps, searchQuery, selectedCategory, sortBy, recentApps]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    darkMode,
    toggleDark,
    favorites,
    toggleFavorite,
    recentApps,
    launchApp,
    filteredApps,
    allCategories,
    addApp,
    updateApp,
    deleteApp,
    isAdmin,
    verifyAdmin,
    exitAdmin,
    categoryIcons,
    updateCategoryIcon,
  };
}
