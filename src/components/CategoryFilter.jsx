export default function CategoryFilter({ selected, onSelect, categories }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap rounded-xl px-4 py-1.5 text-sm font-medium transition-smooth ${
            selected === cat
              ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/25'
              : 'glass-card text-gray-600 hover:bg-white/80 dark:text-gray-300 dark:hover:bg-gray-700/80'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
