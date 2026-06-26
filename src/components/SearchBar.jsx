export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search apps by name, description, or keywords..."
        className="w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-smooth focus:border-brand-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white dark:placeholder-gray-500 dark:focus:border-brand-500 dark:focus:bg-gray-700"
      />
    </div>
  );
}
