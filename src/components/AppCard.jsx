import { getCategoryColor, getAppIcon } from '../utils/helpers';

const categoryGradients = {
  Engineering: 'from-blue-500/10 via-indigo-500/5 to-purple-500/10',
  HR: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10',
  Sales: 'from-amber-500/10 via-orange-500/5 to-yellow-500/10',
};

const categoryHoverBorders = {
  Engineering: 'hover:border-blue-400/40 dark:hover:border-blue-500/30',
  HR: 'hover:border-emerald-400/40 dark:hover:border-emerald-500/30',
  Sales: 'hover:border-amber-400/40 dark:hover:border-amber-500/30',
};

export default function AppCard({ app, isFavorite, isRecent, isAdmin, categoryIcons, onToggleFavorite, onLaunch, onEdit, onDelete, viewMode }) {
  const icon = getAppIcon(app, categoryIcons);
  const gradient = categoryGradients[app.category] || 'from-gray-500/10 via-gray-400/5 to-gray-500/10';
  const borderHover = categoryHoverBorders[app.category] || 'hover:border-gray-400/40 dark:hover:border-gray-500/30';

  const renderIcon = (sizeClasses) => (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden ${sizeClasses} group/card`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover/card:opacity-100 transition-all duration-300`} />
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-800/40 rounded-2xl" />
      <div className="relative z-10 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
        {app.logo ? (
          <img src={app.logo} alt={`${app.name} logo`} className="h-full w-full object-contain p-1" />
        ) : (
          <span className="text-xl sm:text-2xl drop-shadow-sm">{icon}</span>
        )}
      </div>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className={`group flex items-center gap-3 sm:gap-4 rounded-2xl glass-card p-3 sm:p-4 transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-0.5 animate-card border border-transparent ${borderHover}`}>
        {renderIcon('h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0')}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{app.name}</h3>
            <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[11px] font-medium ${getCategoryColor(app.category)}`}>
              {app.category}
            </span>
            {isRecent && (
              <span className="inline-flex items-center rounded-lg bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 animate-pulse">
                Recent
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{app.description || app.desc}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(app.id)}
            className={`rounded-xl p-1.5 sm:p-2 transition-all duration-200 ${
              isFavorite
                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 scale-110'
                : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500 dark:text-gray-600 dark:hover:bg-gray-700 hover:scale-110'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(app)}
                className="rounded-xl p-1.5 sm:p-2 text-gray-300 transition-all duration-200 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-600 dark:hover:bg-gray-700 hover:scale-110"
                aria-label="Edit application"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                onClick={() => onDelete(app)}
                className="rounded-xl p-1.5 sm:p-2 text-gray-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:text-gray-600 dark:hover:bg-red-900/20 hover:scale-110"
                aria-label="Delete application"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            className="ml-1 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:from-brand-600 hover:to-brand-700 shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/30 hover:scale-105"
          >
            Launch
            <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative flex flex-col rounded-2xl glass-card p-4 sm:p-5 transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1.5 animate-card border border-transparent ${borderHover} overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10 flex flex-col h-full">
        {isAdmin && (
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={`rounded-xl p-1.5 transition-all duration-200 ${
                isFavorite
                  ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500 dark:text-gray-600 dark:hover:bg-gray-700'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className="h-3.5 w-3.5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button
              onClick={() => onEdit(app)}
              className="rounded-xl p-1.5 text-gray-300 transition-all duration-200 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-600 dark:hover:bg-gray-700"
              aria-label="Edit application"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(app)}
              className="rounded-xl p-1.5 text-gray-300 transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:text-gray-600 dark:hover:bg-red-900/20"
              aria-label="Delete application"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}

        {!isAdmin && (
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={`rounded-xl p-1.5 transition-all duration-200 ${
                isFavorite
                  ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  : 'text-gray-300 hover:bg-gray-100 hover:text-amber-500 dark:text-gray-600 dark:hover:bg-gray-700'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className="h-3.5 w-3.5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>
        )}

        {renderIcon('mb-3 sm:mb-4 h-12 w-12 sm:h-14 sm:w-14')}

        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white truncate">{app.name}</h3>
          {isRecent && (
            <span className="inline-flex items-center rounded-lg bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 animate-pulse flex-shrink-0">
              Recent
            </span>
          )}
        </div>

        <p className="mb-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{app.description || app.desc}</p>
        <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs text-gray-400/70 dark:text-gray-500/70 truncate">{app.keywords}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] sm:text-[11px] font-medium ${getCategoryColor(app.category)}`}>
            {app.category}
          </span>

          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLaunch(app.id)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:from-brand-600 hover:to-brand-700 shadow-sm shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/30 hover:scale-105"
          >
            Launch
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
