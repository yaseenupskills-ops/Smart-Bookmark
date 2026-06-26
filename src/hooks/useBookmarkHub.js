import { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { api } from '../api/client';
import { getBrowserId } from '../utils/browserId';

export function useBookmarkHub() {
  const { isAdmin, verifyAdmin, exitAdmin, changePin } = useAuth();
  const [apps, setApps] = useState([]);
  const [recentApps, setRecentApps] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [categoryIcons, setCategoryIcons] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useLocalStorage('bookmarkHub-sortBy', 'name');
  const [viewMode, setViewMode] = useLocalStorage('bookmarkHub-viewMode', 'grid');
  const [darkMode, setDarkMode] = useLocalStorage('bookmarkHub-darkMode', false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrowserId();
  }, []);

  const loadAll = useCallback(async () => {
    try {
      const [fetchedApps, fetchedRecent, fetchedFavs, fetchedIcons] = await Promise.all([
        api.getApps(),
        api.getRecent(),
        api.getFavorites(),
        api.getCategoryIcons(),
      ]);
      setApps(fetchedApps);
      setRecentApps(fetchedRecent.map(a => a.id));
      setFavoriteIds(fetchedFavs.map(f => f.app_id));
      setCategoryIcons(fetchedIcons);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const allCategories = useMemo(() => {
    const cats = [...new Set(apps.map(a => a.category))];
    cats.sort();
    return ['All', ...cats];
  }, [apps]);

  const toggleDark = useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  const toggleFavorite = useCallback(async (id) => {
    const isFav = favoriteIds.includes(id);
    try {
      if (isFav) {
        await api.removeFavorite(id);
        setFavoriteIds(prev => prev.filter(fId => fId !== id));
      } else {
        await api.addFavorite(id);
        setFavoriteIds(prev => [...prev, id]);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  }, [favoriteIds]);

  const launchApp = useCallback(async (id) => {
    try {
      await api.trackLaunch(id);
      setRecentApps(prev => {
        const filtered = prev.filter(rId => rId !== id);
        return [id, ...filtered].slice(0, 10);
      });
    } catch (err) {
      console.error('Failed to track launch:', err);
    }
  }, []);

  const addApp = useCallback(async (appData) => {
    try {
      const newApp = await api.createApp(appData);
      setApps(prev => [...prev, newApp]);
      await loadAll();
    } catch (err) {
      console.error('Failed to add app:', err);
      throw err;
    }
  }, [loadAll]);

  const updateApp = useCallback(async (id, appData) => {
    try {
      await api.updateApp(id, appData);
      setApps(prev => prev.map(a => a.id === id ? { ...a, ...appData } : a));
    } catch (err) {
      console.error('Failed to update app:', err);
      throw err;
    }
  }, []);

  const deleteApp = useCallback(async (id) => {
    try {
      await api.deleteApp(id);
      setApps(prev => prev.filter(a => a.id !== id));
      setFavoriteIds(prev => prev.filter(fId => fId !== id));
      setRecentApps(prev => prev.filter(rId => rId !== id));
    } catch (err) {
      console.error('Failed to delete app:', err);
      throw err;
    }
  }, []);

  const updateCategoryIcon = useCallback(async (category, icon) => {
    try {
      await api.updateCategoryIcon(category, icon);
      setCategoryIcons(prev => ({ ...prev, [category]: icon }));
    } catch (err) {
      console.error('Failed to update category icon:', err);
    }
  }, []);

  const filteredApps = useMemo(() => {
    let result = [...apps];

    if (selectedCategory !== 'All') {
      result = result.filter(app => app.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(app =>
        app.name.toLowerCase().includes(q) ||
        (app.description || '').toLowerCase().includes(q) ||
        (app.keywords || '').toLowerCase().includes(q) ||
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
    favorites: favoriteIds,
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
    changePin,
    categoryIcons,
    updateCategoryIcon,
    loading,
  };
}
