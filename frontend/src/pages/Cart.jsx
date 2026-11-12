import { Link, useNavigate } from 'react-router-dom'; import { useStore } from '../context/CartContext'; import { Img } from '../components/ProductCard';
export function Summary() {
  const { subtotal, delivery, total } = useStore();
  return <div className="sum"><h3>Order summary</h3><div className="r"><span>Subtotal</span><span>₹{subtotal}</span></div>
    <div className="r"><span>Delivery</span><span>{delivery ? `₹${delivery}` : 'Free'}</span></div>
    {delivery > 0 && <p className="note">Add ₹{499 - subtotal} more for free delivery.</p>}<div className="r tot"><span>Total</span><span>₹{total}</span></div></div>;
}
export default function Cart() {
  const { cart, setQty } = useStore(); const nav = useNavigate();
  if (!cart.length) return <div className="wrap sec empty"><h1>Your basket is empty</h1><p className="muted">Add something fresh to get started.</p><Link to="/shop" className="btn lg">Browse groceries</Link></div>;
  return <div className="wrap sec two"><div><h1 className="ph">Your basket</h1>{cart.map(i => <div className="line" key={i._id}><Img p={i} className="thumb" />
    <div className="grow"><b>{i.name}</b><span className="muted">{i.unit} · ₹{i.price}</span></div>
    <div className="qty"><button onClick={() => setQty(i._id, i.qty - 1)} aria-label="Less">−</button><span>{i.qty}</span><button onClick={() => setQty(i._id, i.qty + 1)} aria-label="More">+</button></div>
    <b className="lt">₹{i.price * i.qty}</b></div>)}</div>
    <aside><Summary /><button className="btn lg full" onClick={() => nav('/checkout')}>Go to checkout</button></aside></div>;
}
