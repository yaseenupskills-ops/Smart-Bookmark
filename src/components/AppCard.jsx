import { getCategoryColor, getAppIcon } from '../utils/helpers';

export default function AppCard({ app, isFavorite, isRecent, isAdmin, categoryIcons, onToggleFavorite, onLaunch, onEdit, onDelete, viewMode }) {
  const icon = getAppIcon(app, categoryIcons);

  const renderIcon = (sizeClasses) => (
    <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50/80 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/10 overflow-hidden ${sizeClasses}`}>
      {app.logo ? (
        <img src={app.logo} alt={`${app.name} logo`} className="h-full w-full object-contain p-1" />
      ) : (
        <span className="text-2xl">{icon}</span>
      )}
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="group flex items-center gap-4 rounded-2xl glass-card p-4 transition-smooth hover:shadow-glass-lg hover:-translate-y-0.5 animate-card">
        {renderIcon('h-11 w-11 flex-shrink-0')}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{app.name}</h3>
            <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[11px] font-medium ${getCategoryColor(app.category)}`}>
              {app.category}
            </span>
            {isRecent && (
              <span className="inline-flex items-center rounded-lg bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                Recent
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{app.desc}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(app.id)}
            className={`rounded-xl p-2 transition-smooth ${
              isFavorite
                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500 dark:text-gray-600 dark:hover:bg-gray-700'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(app)}
                className="rounded-xl p-2 text-gray-300 transition-smooth hover:bg-gray-100 hover:text-brand-500 dark:text-gray-600 dark:hover:bg-gray-700"
                aria-label="Edit application"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                onClick={() => onDelete(app)}
                className="rounded-xl p-2 text-gray-300 transition-smooth hover:bg-red-50 hover:text-red-500 dark:text-gray-600 dark:hover:bg-red-900/20"
                aria-label="Delete application"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}

          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLaunch(app.id)}
            className="ml-1 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-3.5 py-1.5 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/30"
          >
            Launch
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl glass-card p-5 transition-smooth hover:shadow-glass-hover hover:-translate-y-1 animate-card">
      {isAdmin && (
        <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-smooth group-hover:opacity-100">
          <button
            onClick={() => onToggleFavorite(app.id)}
            className={`rounded-xl p-1.5 transition-smooth ${
              isFavorite
                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500 dark:text-gray-600 dark:hover:bg-gray-700'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(app)}
            className="rounded-xl p-1.5 text-gray-300 transition-smooth hover:bg-gray-100 hover:text-brand-500 dark:text-gray-600 dark:hover:bg-gray-700"
            aria-label="Edit application"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(app)}
            className="rounded-xl p-1.5 text-gray-300 transition-smooth hover:bg-red-50 hover:text-red-500 dark:text-gray-600 dark:hover:bg-red-900/20"
            aria-label="Delete application"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {!isAdmin && (
        <div className="absolute right-3 top-3 opacity-0 transition-smooth group-hover:opacity-100">
          <button
            onClick={() => onToggleFavorite(app.id)}
            className={`rounded-xl p-1.5 transition-smooth ${
              isFavorite
                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500 dark:text-gray-600 dark:hover:bg-gray-700'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      )}

      {renderIcon('mb-4 h-14 w-14')}

      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">{app.name}</h3>
        {isRecent && (
          <span className="inline-flex items-center rounded-lg bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            Recent
          </span>
        )}
      </div>

      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{app.desc}</p>
      <p className="mb-4 text-xs text-gray-400/70 dark:text-gray-500/70 truncate">{app.keywords}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-[11px] font-medium ${getCategoryColor(app.category)}`}>
          {app.category}
        </span>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onLaunch(app.id)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-3.5 py-1.5 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/30"
        >
          Launch
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
