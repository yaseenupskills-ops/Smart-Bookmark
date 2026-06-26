import { useState, useRef } from 'react';

const PRESET_ICONS = [
  '📁', '💼', '⚙️', '👥', '💻', '🔧', '📊', '🎯', '💬', '🔗',
  '📋', '🗂️', '📡', '🛡️', '🚀', '📣', '🎨', '🧪', '📦', '🔑',
  '📞', '🗂', '📰', '🖥️', '🖨️', '🗄️', '⏱️', '📱', '🌐', '🔍',
];

const MAX_FILE_SIZE = 200 * 1024;
const MAX_DIMENSION = 128;

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height / width) * MAX_DIMENSION);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width / height) * MAX_DIMENSION);
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function IconPicker({ value, onChange, logo, onLogoChange, defaultValue }) {
  const [customEmoji, setCustomEmoji] = useState('');
  const [logoError, setLogoError] = useState('');
  const fileInputRef = useRef(null);

  const handlePresetClick = (emoji) => {
    onChange(emoji);
    setCustomEmoji('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomEmoji(val);
    if (val.trim()) {
      onChange(val.trim());
    } else {
      onChange('');
    }
  };

  const handleClearEmoji = () => {
    onChange('');
    setCustomEmoji('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError('');

    if (file.size > MAX_FILE_SIZE) {
      setLogoError(`File too large (${Math.round(file.size / 1024)}KB). Max 200KB.`);
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
      setLogoError('Unsupported format. Use PNG, JPG, SVG, or WebP.');
      return;
    }

    try {
      const base64 = await resizeImage(file);
      onLogoChange(base64);
      onChange('');
      setCustomEmoji('');
    } catch {
      setLogoError('Failed to process image. Try another file.');
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveLogo = () => {
    onLogoChange('');
    setLogoError('');
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {PRESET_ICONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => handlePresetClick(emoji)}
            disabled={!!logo}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-all ${
              !logo && value === emoji
                ? 'bg-brand-100 ring-2 ring-brand-500 dark:bg-brand-900/40'
                : logo
                  ? 'bg-gray-50 opacity-40 cursor-not-allowed dark:bg-gray-800'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={customEmoji}
          onChange={handleCustomChange}
          disabled={!!logo}
          className={`w-full rounded-lg border px-3 py-1.5 text-sm outline-none transition-colors dark:bg-gray-700 dark:text-white ${
            logo
              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-800'
              : 'border-gray-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-gray-600'
          }`}
          placeholder={logo ? 'Logo uploaded — remove to use emoji' : 'Or paste any emoji...'}
        />
        {value && !logo && (
          <button
            type="button"
            onClick={handleClearEmoji}
            className="flex-shrink-0 rounded-lg px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-1.5">
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
          <span>OR</span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
        </div>

        {logo ? (
          <div className="flex items-center gap-3 rounded-lg border border-brand-200 bg-brand-50 p-2 dark:border-brand-800 dark:bg-brand-900/20">
            <img src={logo} alt="Uploaded logo" className="h-10 w-10 rounded-lg object-contain" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-brand-700 dark:text-brand-300">Custom logo uploaded</p>
            </div>
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="flex-shrink-0 rounded-lg px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-brand-500 dark:hover:bg-brand-900/20"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <span>Upload custom logo</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        {logoError && <p className="mt-1 text-xs text-red-500">{logoError}</p>}
        {!logo && (
          <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">PNG, JPG, SVG, or WebP — max 200KB</p>
        )}
      </div>

      {value && !logo && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Selected: <span className="text-lg">{value}</span>
          {value === defaultValue && ' (category default)'}
        </p>
      )}
    </div>
  );
}
