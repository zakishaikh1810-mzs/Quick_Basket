import { useEffect, useState } from 'react'; import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../services/api'; import { useStore } from '../context/CartContext'; import { Img } from '../components/ProductCard';
export default function ProductDetails() {
  const { id } = useParams(); const { add } = useStore(); const [p, setP] = useState(null); const [err, setErr] = useState(''); const [n, setN] = useState(1);
  useEffect(() => { getProduct(id).then(setP).catch(e => setErr(e.message)); }, [id]);
  if (err) return <div className="wrap sec"><p className="err">{err}</p><Link to="/shop">Back to shop</Link></div>;
  if (!p) return <div className="wrap sec"><p className="muted">Loading…</p></div>;
  return <div className="wrap sec detail"><div className="dimg"><Img p={p} /></div>
    <div><Link to={`/shop?category=${p.category}`} className="more">{p.category}</Link><h1>{p.name}</h1><p className="muted">{p.unit} · ★ {p.rating}</p>
      <div className="price"><b>₹{p.price}</b> <s>₹{p.mrp}</s> <span className="off in">Save ₹{p.mrp - p.price}</span></div><p className="desc">{p.description}</p>
      <div className="row gap"><div className="qty"><button onClick={() => setN(Math.max(1, n - 1))} aria-label="Less">−</button><span>{n}</span><button onClick={() => setN(n + 1)} aria-label="More">+</button></div>
        <button className="btn lg" onClick={() => add(p, n)}>Add {n} to basket</button></div></div></div>;
}
