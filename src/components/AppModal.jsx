import { useState, useEffect } from 'react';
import IconPicker from './IconPicker';
import { getCategoryIcon } from '../utils/helpers';

const EMPTY_FORM = { name: '', category: '', icon: '', logo: '', desc: '', url: '', keywords: '' };

export default function AppModal({ isOpen, onClose, onSave, app, existingCategories, categoryIcons }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = !!app;

  useEffect(() => {
    if (isOpen) {
      if (app) {
        setForm({ name: app.name, category: app.category, icon: app.icon || '', logo: app.logo || '', desc: app.desc, url: app.url, keywords: app.keywords || '' });
        const isCustom = !existingCategories.includes(app.category);
        setIsCustomMode(isCustom);
        setCustomCategory(isCustom ? app.category : '');
      } else {
        setForm(EMPTY_FORM);
        setIsCustomMode(false);
        setCustomCategory('');
      }
      setErrors({});
    }
  }, [isOpen, app, existingCategories]);

  if (!isOpen) return null;

  const categoriesToShow = existingCategories.filter(c => c !== 'All');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleCategoryChange = (value) => {
    if (value === '__custom__') {
      setIsCustomMode(true);
      setCustomCategory('');
      handleChange('category', '');
    } else {
      setIsCustomMode(false);
      setCustomCategory('');
      handleChange('category', value);
    }
  };

  const handleCustomCategoryChange = (value) => {
    setCustomCategory(value);
    handleChange('category', value);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.category.trim()) e.category = 'Category is required';
    if (!form.desc.trim()) e.desc = 'Description is required';
    if (!form.url.trim()) e.url = 'URL is required';
    else if (!/^https?:\/\/.+/i.test(form.url.trim())) e.url = 'Enter a valid URL (https://...)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      icon: form.icon.trim(),
      desc: form.desc.trim(),
      url: form.url.trim(),
      keywords: form.keywords.trim(),
    });
    onClose();
  };

  const categoryDefaultIcon = form.category ? getCategoryIcon(form.category, categoryIcons) : '📁';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl glass-card p-6 animate-scale-in">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Application' : 'Add New Application'}
          </h2>
          <button onClick={onClose} className="rounded-xl p-1.5 text-gray-400 transition-smooth hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full rounded-xl glass-input border px-3.5 py-2.5 text-sm outline-none transition-smooth ${
                errors.name ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 'border-white/30 focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:border-gray-600/30'
              } dark:text-white`}
              placeholder="e.g. Jira"
              autoFocus
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Icon / Logo</label>
            <IconPicker
              value={form.icon}
              onChange={(icon) => handleChange('icon', icon)}
              logo={form.logo}
              onLogoChange={(logo) => handleChange('logo', logo)}
              defaultValue={categoryDefaultIcon}
            />
            {!form.icon && !form.logo && form.category && (
              <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                Will use category default: <span className="text-base">{categoryDefaultIcon}</span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
            <select
              value={isCustomMode ? '__custom__' : form.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={`w-full rounded-xl glass-input border px-3.5 py-2.5 text-sm outline-none transition-smooth ${
                errors.category ? 'border-red-400' : 'border-white/30 dark:border-gray-600/30'
              } dark:text-white`}
            >
              <option value="">Select category...</option>
              {categoriesToShow.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="__custom__">Other (custom)...</option>
            </select>
            {isCustomMode && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => handleCustomCategoryChange(e.target.value)}
                className="mt-2 w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white"
                placeholder="Enter custom category..."
                autoFocus
              />
            )}
            {errors.category && <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => handleChange('desc', e.target.value)}
              className={`w-full rounded-xl glass-input border px-3.5 py-2.5 text-sm outline-none transition-smooth ${
                errors.desc ? 'border-red-400' : 'border-white/30 dark:border-gray-600/30'
              } dark:text-white`}
              placeholder="e.g. Project Management Tool"
            />
            {errors.desc && <p className="mt-1.5 text-xs text-red-500">{errors.desc}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">URL *</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => handleChange('url', e.target.value)}
              className={`w-full rounded-xl glass-input border px-3.5 py-2.5 text-sm outline-none transition-smooth ${
                errors.url ? 'border-red-400' : 'border-white/30 dark:border-gray-600/30'
              } dark:text-white`}
              placeholder="https://example.com"
            />
            {errors.url && <p className="mt-1.5 text-xs text-red-500">{errors.url}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
            <input
              type="text"
              value={form.keywords}
              onChange={(e) => handleChange('keywords', e.target.value)}
              className="w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 px-3.5 py-2.5 text-sm outline-none transition-smooth focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white"
              placeholder="Comma-separated keywords..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-smooth hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30"
            >
              {isEditing ? 'Update' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
