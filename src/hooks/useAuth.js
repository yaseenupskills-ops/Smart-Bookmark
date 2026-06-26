import { useState, useCallback, useEffect } from 'react';
import { api, setAdminToken, getAdminToken, clearAdminToken } from '../api/client';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('bookmarkHub-adminToken');
    if (token) {
      setAdminToken(token);
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const verifyAdmin = useCallback(async (pin) => {
    const result = await api.verifyAdmin(pin);
    if (result.success) {
      setAdminToken(result.token);
      sessionStorage.setItem('bookmarkHub-adminToken', result.token);
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const exitAdmin = useCallback(() => {
    clearAdminToken();
    sessionStorage.removeItem('bookmarkHub-adminToken');
    setIsAdmin(false);
  }, []);

  const changePin = useCallback(async (currentPin, newPin) => {
    await api.changePin(currentPin, newPin);
  }, []);

  return { isAdmin, loading, verifyAdmin, exitAdmin, changePin };
}
