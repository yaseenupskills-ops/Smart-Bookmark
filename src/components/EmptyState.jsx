export default function EmptyState({ searchQuery, selectedCategory }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700/50 shadow-glass">
        <svg className="h-7 w-7 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 className="mb-1.5 text-lg font-semibold text-gray-900 dark:text-white">No apps found</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        {searchQuery
          ? `No results for "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}. Try a different search.`
          : `No apps in the ${selectedCategory} category.`}
      </p>
    </div>
  );
}
