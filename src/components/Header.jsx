import { getInitials } from '../utils/helpers';

export default function Header({ darkMode, toggleDark, onAddApp, isAdmin, onAvatarClick, onOpenSettings, searchQuery, onSearchChange }) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 dark:border-gray-700/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20">
            SB
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
              Smart Bookmark Hub
            </h1>
          </div>
        </div>

        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search apps..."
            className="w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-smooth focus:border-brand-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white dark:placeholder-gray-500 dark:focus:border-brand-500 dark:focus:bg-gray-700"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isAdmin && (
            <>
              <button
                onClick={onAddApp}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-3.5 py-2 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add</span>
              </button>

              <button
                onClick={onOpenSettings}
                className="rounded-xl p-2 text-gray-400 transition-smooth hover:bg-white/60 hover:text-gray-600 dark:hover:bg-gray-700/60 dark:hover:text-gray-300"
                aria-label="Category icon settings"
                title="Configure category icons"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </>
          )}

          <button
            onClick={toggleDark}
            className="rounded-xl p-2 text-gray-400 transition-smooth hover:bg-white/60 hover:text-gray-600 dark:hover:bg-gray-700/60 dark:hover:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={onAvatarClick}
            className="relative flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2.5 transition-smooth hover:bg-white/60 dark:hover:bg-gray-700/60"
            title={isAdmin ? 'Admin mode — click to exit' : 'Click to sign in as admin'}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-semibold text-xs transition-smooth ${
              isAdmin
                ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/20'
                : 'bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300'
            }`}>
              {getInitials('John Doe')}
            </div>
            <span className={`hidden text-xs font-medium sm:inline transition-smooth ${
              isAdmin ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isAdmin ? 'Admin' : 'User'}
            </span>
            {isAdmin && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 ring-2 ring-white dark:ring-gray-900 shadow-sm">
                <svg className="h-1.5 w-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
