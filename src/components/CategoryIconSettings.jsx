import { useState, useEffect } from 'react';
import IconPicker from './IconPicker';

export default function CategoryIconSettings({ isOpen, onClose, categoryIcons, onUpdateCategoryIcon, allCategories }) {
  const [draft, setDraft] = useState({});
  const categories = allCategories.filter(c => c !== 'All');

  useEffect(() => {
    if (isOpen) {
      setDraft({ ...categoryIcons });
    }
  }, [isOpen, categoryIcons]);

  if (!isOpen) return null;

  const handleIconChange = (category, icon) => {
    setDraft(prev => ({ ...prev, [category]: icon }));
  };

  const handleSave = () => {
    for (const cat of categories) {
      if (draft[cat] !== undefined) {
        onUpdateCategoryIcon(cat, draft[cat]);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl glass-card p-6 animate-scale-in">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Category Icons</h2>
          <button onClick={onClose} className="rounded-xl p-1.5 text-gray-400 transition-smooth hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Set the default icon for each category. Apps without a custom icon will use their category icon.
        </p>

        <div className="space-y-5">
          {categories.map((cat) => (
            <div key={cat}>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">{cat}</label>
              <IconPicker
                value={draft[cat] || ''}
                onChange={(icon) => handleIconChange(cat, icon)}
                defaultValue={categoryIcons[cat]}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-smooth hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/20"
          >
            Save Icons
          </button>
        </div>
      </div>
    </div>
  );
}
