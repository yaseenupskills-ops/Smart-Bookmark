import { useState } from 'react';

export default function AdminPinModal({ isOpen, onClose, onVerify }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onVerify(pin)) {
      setPin('');
      setError('');
      onClose();
    } else {
      setError('Incorrect PIN. Try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-in" onClick={handleClose} />

      <div className={`relative w-full max-w-sm rounded-3xl glass-card p-6 animate-scale-in ${shake ? 'animate-shake' : ''}`}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/20">
          <svg className="h-6 w-6 text-brand-500 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">Admin Access</h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Enter the admin PIN to manage applications.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError(''); }}
            placeholder="* * * *"
            className={`mb-3 w-full rounded-xl glass-input border px-4 py-3 text-center text-lg tracking-[0.5em] font-mono outline-none transition-smooth ${
              error ? 'border-red-400 focus:border-red-500' : 'border-white/30 focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:border-gray-600/30'
            } dark:text-white`}
            autoFocus
          />
          {error && <p className="mb-3 text-xs text-red-500 text-center">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-smooth hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pin.length < 4}
              className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-brand-500 disabled:hover:to-brand-600"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
