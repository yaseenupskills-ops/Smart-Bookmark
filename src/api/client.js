const BASE_URL = '';

let adminToken = null;

export function setAdminToken(token) {
  adminToken = token;
}

export function getAdminToken() {
  return adminToken;
}

export function clearAdminToken() {
  adminToken = null;
}

async function request(method, url, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminToken) {
    headers['Authorization'] = `Bearer ${adminToken}`;
  }
  const browserId = localStorage.getItem('bookmarkHub-browserId');
  if (browserId) {
    headers['X-Browser-Id'] = browserId;
  }
  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${url}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  getApps: () => request('GET', '/api/apps'),
  createApp: (data) => request('POST', '/api/apps', data),
  updateApp: (id, data) => request('PUT', `/api/apps/${id}`, data),
  deleteApp: (id) => request('DELETE', `/api/apps/${id}`),
  getRecent: () => request('GET', '/api/apps/recent'),
  trackLaunch: (id) => request('POST', `/api/apps/launch/${id}`),
  verifyAdmin: (pin) => request('POST', '/api/admin/verify', { pin }),
  changePin: (currentPin, newPin) => request('PUT', '/api/admin/change-pin', { currentPin, newPin }),
};
