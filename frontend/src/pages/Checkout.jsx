import { useState } from 'react'; import { Link, Navigate, useNavigate } from 'react-router-dom'; import { useStore } from '../context/CartContext'; import { placeOrder } from '../services/api'; import { Summary } from './Cart';
export default function Checkout() {
  const { cart, user, clear } = useStore(); const nav = useNavigate(); const [done, setDone] = useState(null); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const [a, setA] = useState({ name: user?.name || '', phone: '', line: '', city: '', pin: '' }); const [pay, setPay] = useState('Cash on delivery');
  if (done) return <div className="wrap sec empty"><h1>Order placed 🎉</h1><p className="muted">Order #{done._id.slice(-6).toUpperCase()} · ₹{done.total}. Arriving in about 30 minutes.</p><Link to="/shop" className="btn lg">Keep shopping</Link></div>;
  if (!cart.length) return <Navigate to="/cart" />;
  if (!user) return <div className="wrap sec empty"><h1>Log in to place your order</h1><button className="btn lg" onClick={() => nav('/login', { state: { from: '/checkout' } })}>Log in</button></div>;
  const set = k => e => setA({ ...a, [k]: e.target.value });
  const submit = async e => { e.preventDefault(); setBusy(true); setErr('');
    try { const o = await placeOrder({ items: cart.map(i => ({ product: i._id, qty: i.qty })), address: a, payment: pay }, user.token); clear(); setDone(o); } catch (x) { setErr(x.message); } setBusy(false); };
  return <form className="wrap sec two" onSubmit={submit}><div><h1 className="ph">Delivery details</h1>{err && <p className="err">{err}</p>}
    <div className="fg"><label>Full name<input required value={a.name} onChange={set('name')} /></label><label>Phone<input required pattern="[0-9]{10}" title="10-digit number" value={a.phone} onChange={set('phone')} /></label>
      <label className="w2">Address<input required value={a.line} onChange={set('line')} /></label><label>City<input required value={a.city} onChange={set('city')} /></label><label>PIN code<input required pattern="[0-9]{6}" title="6-digit PIN" value={a.pin} onChange={set('pin')} /></label></div>
    <h3>Payment</h3>{['Cash on delivery', 'UPI on delivery', 'Card on delivery'].map(m => <label className="radio" key={m}><input type="radio" checked={pay === m} onChange={() => setPay(m)} />{m}</label>)}</div>
    <aside><Summary /><button className="btn lg full" disabled={busy}>{busy ? 'Placing order…' : 'Place order'}</button></aside></form>;
}
