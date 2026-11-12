import { Link } from 'react-router-dom'; import { useState } from 'react'; import { useStore } from '../context/CartContext';
export function Img({ p, className }) {
  const [bad, setBad] = useState(false);
  return bad ? <div className={'emoji ' + (className || '')}>{p.emoji}</div> : <img className={className} src={p.image} alt={p.name} loading="lazy" onError={() => setBad(true)} />;
}
export default function ProductCard({ p }) {
  const { add } = useStore(); const off = Math.round((1 - p.price / p.mrp) * 100);
  return <article className="card"><Link to={`/product/${p._id}`} className="pic"><Img p={p} />{off > 0 && <span className="off">{off}% off</span>}</Link>
    <div className="cb"><Link to={`/product/${p._id}`} className="pn">{p.name}</Link><span className="unit">{p.unit} · ★ {p.rating}</span>
      <div className="row"><div><b>₹{p.price}</b> <s>₹{p.mrp}</s></div><button className="btn sm" onClick={() => add(p)}>Add</button></div></div></article>;
}
