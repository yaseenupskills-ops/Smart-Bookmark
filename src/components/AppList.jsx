import AppCard from './AppCard';

export default function AppList({ apps, favorites, recentApps, isAdmin, categoryIcons, onToggleFavorite, onLaunch, onEdit, onDelete }) {
  return (
    <div className="flex flex-col gap-3">
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
          viewMode="list"
        />
      ))}
    </div>
  );
}
