import { Link, NavLink, useNavigate } from 'react-router-dom'; import { useState } from 'react'; import { useStore } from '../context/CartContext';
export default function Navbar() {
  const { count, user, logout } = useStore(); const nav = useNavigate(); const [q, setQ] = useState('');
  return <header className="nav"><div className="wrap nav-in">
    <Link to="/" className="logo">🧺 Quick<b>Basket</b></Link>
    <form className="search" onSubmit={e => { e.preventDefault(); nav(`/shop?search=${encodeURIComponent(q)}`); }}>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search milk, mangoes, bread…" aria-label="Search products" /></form>
    <nav className="links"><NavLink to="/shop">Shop</NavLink>
      {user ? <><span className="hi">Hi, {user.name.split(' ')[0]}</span><button className="link" onClick={logout}>Log out</button></> : <NavLink to="/login">Log in</NavLink>}
      <NavLink to="/cart" className="cartlink">Basket<span className="badge">{count}</span></NavLink></nav>
  </div></header>;
}
