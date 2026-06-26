export default function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="flex overflow-hidden rounded-xl glass-card p-0.5">
      <button
        onClick={() => onViewChange('grid')}
        className={`rounded-lg p-2 transition-smooth ${
          viewMode === 'grid'
            ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-sm'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="Grid view"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`rounded-lg p-2 transition-smooth ${
          viewMode === 'list'
            ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-sm'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="List view"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}
