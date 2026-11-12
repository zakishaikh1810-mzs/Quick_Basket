import { useEffect, useState } from 'react'; import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; import { getProducts } from '../services/api';
const CATS = ['All','Fruits','Vegetables','Dairy','Bakery','Beverages','Snacks','Staples'];
export default function Shop() {
  const [sp, setSp] = useSearchParams(); const category = sp.get('category') || 'All', search = sp.get('search') || '';
  const [items, setItems] = useState(null); const [err, setErr] = useState(''); const [sort, setSort] = useState('');
  useEffect(() => { setItems(null); getProducts({ category, search }).then(setItems).catch(e => setErr(e.message)); }, [category, search]);
  const list = items && [...items].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0);
  return <div className="wrap sec"><h1 className="ph">{search ? `Results for “${search}”` : category === 'All' ? 'All groceries' : category}</h1>
    <div className="bar"><div className="chips">{CATS.map(c => <button key={c} className={'chip' + (c === category ? ' on' : '')} onClick={() => setSp(c === 'All' ? {} : { category: c })}>{c}</button>)}</div>
      <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort"><option value="">Sort: Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
    {err ? <p className="err">{err}</p> : !list ? <p className="muted">Loading products…</p> : !list.length ? <p className="muted">No products match. Try a different word or aisle.</p> :
      <div className="grid">{list.map(p => <ProductCard key={p._id} p={p} />)}</div>}</div>;
}
