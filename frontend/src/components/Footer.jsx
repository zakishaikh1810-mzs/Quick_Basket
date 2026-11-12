import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="foot"><div className="wrap foot-in"><div><div className="logo">🧺 Quick<b>Basket</b></div><p>Fresh groceries at your door in under 30 minutes.</p></div>
    <div><h4>Shop</h4><Link to="/shop?category=Fruits">Fruits</Link><Link to="/shop?category=Vegetables">Vegetables</Link><Link to="/shop?category=Dairy">Dairy</Link></div>
    <div><h4>Account</h4><Link to="/login">Log in</Link><Link to="/register">Create account</Link><Link to="/cart">Basket</Link></div></div>
    <div className="wrap copy">© {new Date().getFullYear()} QuickBasket. Free delivery above ₹499.</div></footer>;
}
