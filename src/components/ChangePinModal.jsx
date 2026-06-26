import { useState } from 'react';

export default function ChangePinModal({ isOpen, onClose, onChangePin }) {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{4}$/.test(currentPin) || !/^\d{4}$/.test(newPin) || !/^\d{4}$/.test(confirmPin)) {
      setError('All PINs must be exactly 4 digits');
      return;
    }
    if (newPin !== confirmPin) {
      setError('New PINs do not match');
      return;
    }

    try {
      await onChangePin(currentPin, newPin);
      setSuccess(true);
      setTimeout(() => {
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-in" onClick={handleClose} />
      <div className="relative w-full max-w-sm rounded-3xl glass-card p-6 animate-scale-in">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/20">
          <svg className="h-6 w-6 text-brand-500 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          {success ? 'PIN Changed!' : 'Change Admin PIN'}
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {success ? 'Your admin PIN has been updated successfully.' : 'Enter your current PIN and a new 4-digit PIN.'}
        </p>

        {success ? (
          <div className="flex items-center justify-center py-4">
            <svg className="h-12 w-12 text-emerald-500 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Current PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={currentPin}
                  onChange={(e) => { setCurrentPin(e.target.value.replace(/\D/g, '')); setError(''); }}
                  placeholder="* * * *"
                  className="w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 px-4 py-2.5 text-center text-lg tracking-[0.5em] font-mono outline-none transition-smooth focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">New PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => { setNewPin(e.target.value.replace(/\D/g, '')); setError(''); }}
                  placeholder="* * * *"
                  className="w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 px-4 py-2.5 text-center text-lg tracking-[0.5em] font-mono outline-none transition-smooth focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Confirm New PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '')); setError(''); }}
                  placeholder="* * * *"
                  className="w-full rounded-xl glass-input border border-white/30 dark:border-gray-600/30 px-4 py-2.5 text-center text-lg tracking-[0.5em] font-mono outline-none transition-smooth focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:text-white"
                />
              </div>
            </div>
            {error && <p className="mb-3 text-xs text-red-500 text-center">{error}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={handleClose} className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-smooth hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button
                type="submit"
                disabled={!currentPin || !newPin || !confirmPin}
                className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-smooth hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Change PIN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
