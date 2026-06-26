export default function DeleteConfirm({ isOpen, onClose, onConfirm, appName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-sm rounded-3xl glass-card p-6 animate-scale-in">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20">
          <svg className="h-6 w-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Delete Application</h3>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <span className="font-semibold text-gray-700 dark:text-gray-200">{appName}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-smooth hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-medium text-white transition-smooth hover:from-red-600 hover:to-red-700 shadow-md shadow-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
