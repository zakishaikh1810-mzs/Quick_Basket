const BASE = import.meta.env.VITE_API_URL || '/api';
async function req(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE + path, { method, headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) }, body: body && JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Try again.');
  return data;
}
export const getProducts = (p = {}) => req('/products?' + new URLSearchParams(Object.entries(p).filter(([, v]) => v)));
export const getProduct = id => req('/products/' + id);
export const login = b => req('/users/login', { method: 'POST', body: b });
export const register = b => req('/users/register', { method: 'POST', body: b });
export const placeOrder = (b, token) => req('/orders', { method: 'POST', body: b, token });
