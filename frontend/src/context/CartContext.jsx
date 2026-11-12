import { createContext, useContext, useEffect, useState } from 'react';
const Ctx = createContext(); export const useStore = () => useContext(Ctx);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('qb_cart', [])); const [user, setUser] = useState(() => load('qb_user', null)); const [toast, setToast] = useState('');
  useEffect(() => localStorage.setItem('qb_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('qb_user', JSON.stringify(user)), [user]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 1800); return () => clearTimeout(t); } }, [toast]);
  const add = (p, n = 1) => { setCart(c => c.find(i => i._id === p._id) ? c.map(i => i._id === p._id ? { ...i, qty: i.qty + n } : i) : [...c, { ...p, qty: n }]); setToast(`${p.name} added to basket`); };
  const setQty = (id, q) => setCart(c => q < 1 ? c.filter(i => i._id !== id) : c.map(i => i._id === id ? { ...i, qty: q } : i));
  const count = cart.reduce((s, i) => s + i.qty, 0), subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 29;
  return <Ctx.Provider value={{ cart, add, setQty, clear: () => setCart([]), count, subtotal, delivery, total: subtotal + delivery, user, setUser, logout: () => setUser(null) }}>
    {children}{toast && <div className="toast" role="status">{toast}</div>}</Ctx.Provider>;
}
