import { Link } from 'react-router-dom'; import { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard'; import ProductCard from '../components/ProductCard'; import { getProducts } from '../services/api';
const cats = [['Fruits','🍎','#FFE3DC'],['Vegetables','🥦','#DDF1E2'],['Dairy','🥛','#E6EEFA'],['Bakery','🥐','#FFF0CC'],['Beverages','🧃','#FDE6F0'],['Snacks','🍫','#EBE3F7'],['Staples','🍚','#F1EBDD']];
export default function Home() {
  const [items, setItems] = useState([]); const [err, setErr] = useState('');
  useEffect(() => { getProducts().then(d => setItems(d.slice(0, 8))).catch(e => setErr(e.message)); }, []);
  return <>
    <section className="hero"><div className="wrap hero-in">
      <h1 className="text-yellow-300 underline">Dinner is 28 minutes away.</h1>
      <div><h1>Dinner is 28 minutes away.</h1><p>Farm-fresh produce, dairy and pantry staples, packed cold and delivered to your door.</p>
        <div className="cta"><Link to="/shop" className="btn lg">Start shopping</Link><span className="note">Free delivery above ₹499</span></div></div>
      <div className="collage"><img src="https://loremflickr.com/700/700/vegetables,market?lock=3" alt="Fresh vegetables" onError={e => e.target.style.display = 'none'} /><span className="sticker s1">🍅</span><span className="sticker s2">🥑</span><span className="sticker s3">🍋</span></div>
    </div></section>
    <section className="wrap sec"><h2>Shop by aisle</h2><div className="cats">{cats.map(([n, e, t]) => <CategoryCard key={n} name={n} emoji={e} tone={t} />)}</div></section>
    <section className="wrap sec"><div className="sec-h"><h2>Picked for today</h2><Link to="/shop" className="more">See all products</Link></div>
      {err ? <p className="err">{err}. Make sure the backend is running on port 5000.</p> : <div className="grid">{items.map(p => <ProductCard key={p._id} p={p} />)}</div>}</section>
    <section className="wrap sec perks">{[['⚡','30-minute delivery','From our dark store to your door.'],['❄️','Cold-chain packed','Dairy and produce stay fresh.'],['↩️','Instant refunds','Not happy? We credit it back.']].map(([i, t, d]) => <div key={t}><span>{i}</span><b>{t}</b><p>{d}</p></div>)}</section>
  </>;
}
