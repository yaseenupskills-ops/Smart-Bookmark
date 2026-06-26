import AppCard from './AppCard';

export default function AppGrid({ apps, favorites, recentApps, isAdmin, categoryIcons, onToggleFavorite, onLaunch, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
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
