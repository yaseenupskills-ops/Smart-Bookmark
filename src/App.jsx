import { useState } from 'react';
import { useBookmarkHub } from './hooks/useBookmarkHub';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SortDropdown from './components/SortDropdown';
import ViewToggle from './components/ViewToggle';
import AppGrid from './components/AppGrid';
import AppList from './components/AppList';
import EmptyState from './components/EmptyState';
import AppModal from './components/AppModal';
import DeleteConfirm from './components/DeleteConfirm';
import AdminPinModal from './components/AdminPinModal';
import CategoryIconSettings from './components/CategoryIconSettings';

export default function App() {
  const {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
    viewMode, setViewMode,
    darkMode, toggleDark,
    favorites, toggleFavorite,
    recentApps, launchApp,
    filteredApps, allCategories,
    addApp, updateApp, deleteApp,
    isAdmin, verifyAdmin, exitAdmin,
    categoryIcons, updateCategoryIcon,
  } = useBookmarkHub();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleAdd = () => {
    setEditingApp(null);
    setModalOpen(true);
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingApp) {
      updateApp(editingApp.id, data);
    } else {
      addApp(data);
    }
  };

  const handleAvatarClick = () => {
    if (isAdmin) {
      exitAdmin();
    } else {
      setPinModalOpen(true);
    }
  };

  const handlePinVerify = (pin) => {
    return verifyAdmin(pin);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 ${darkMode ? 'dark' : ''}`}>
      <Header
        darkMode={darkMode}
        toggleDark={toggleDark}
        onAddApp={handleAdd}
        isAdmin={isAdmin}
        onAvatarClick={handleAvatarClick}
        onOpenSettings={() => setSettingsOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} categories={allCategories} />
          <div className="flex items-center gap-2">
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''}
          </p>
          {favorites.length > 0 && (
            <p className="text-sm text-amber-500 dark:text-amber-400">
              {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {filteredApps.length === 0 ? (
          <EmptyState searchQuery={searchQuery} selectedCategory={selectedCategory} />
        ) : viewMode === 'grid' ? (
          <AppGrid
            apps={filteredApps}
            favorites={favorites}
            recentApps={recentApps}
            isAdmin={isAdmin}
            categoryIcons={categoryIcons}
            onToggleFavorite={toggleFavorite}
            onLaunch={launchApp}
            onEdit={handleEdit}
            onDelete={setDeletingApp}
          />
        ) : (
          <AppList
            apps={filteredApps}
            favorites={favorites}
            recentApps={recentApps}
            isAdmin={isAdmin}
            categoryIcons={categoryIcons}
            onToggleFavorite={toggleFavorite}
            onLaunch={launchApp}
            onEdit={handleEdit}
            onDelete={setDeletingApp}
          />
        )}
      </main>

      <AppModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingApp(null); }}
        onSave={handleSave}
        app={editingApp}
        existingCategories={allCategories}
        categoryIcons={categoryIcons}
      />

      <DeleteConfirm
        isOpen={!!deletingApp}
        onClose={() => setDeletingApp(null)}
        onConfirm={() => deleteApp(deletingApp?.id)}
        appName={deletingApp?.name}
      />

      <AdminPinModal
        isOpen={pinModalOpen}
        onClose={() => setPinModalOpen(false)}
        onVerify={handlePinVerify}
      />

      <CategoryIconSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        categoryIcons={categoryIcons}
        onUpdateCategoryIcon={updateCategoryIcon}
        allCategories={allCategories}
      />
    </div>
  );
}
