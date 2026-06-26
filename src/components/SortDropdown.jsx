export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl glass-input border border-white/30 dark:border-gray-600/30 px-3 py-2 text-sm text-gray-700 outline-none transition-smooth focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-gray-300 dark:focus:border-brand-500"
    >
      <option value="name">Name (A-Z)</option>
      <option value="category">Category</option>
      <option value="recent">Recently Launched</option>
    </select>
  );
}
