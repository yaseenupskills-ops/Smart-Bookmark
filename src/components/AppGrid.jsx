import AppCard from './AppCard';

export default function AppGrid({ apps, favorites, recentApps, isAdmin, categoryIcons, onToggleFavorite, onLaunch, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          isFavorite={favorites.includes(app.id)}
          isRecent={recentApps.includes(app.id)}
          isAdmin={isAdmin}
          categoryIcons={categoryIcons}
          onToggleFavorite={onToggleFavorite}
          onLaunch={onLaunch}
          onEdit={onEdit}
          onDelete={onDelete}
          viewMode="grid"
        />
      ))}
    </div>
  );
}
