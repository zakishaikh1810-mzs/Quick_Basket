import { Routes, Route, useLocation } from 'react-router-dom'; import { useEffect } from 'react';
import Navbar from './components/Navbar'; import Footer from './components/Footer';
import Home from './pages/Home'; import Shop from './pages/Shop'; import ProductDetails from './pages/ProductDetails'; import Cart from './pages/Cart';
import Login from './pages/Login'; import Register from './pages/Register'; import Checkout from './pages/Checkout';
export default function App() {
  const { pathname } = useLocation(); useEffect(() => window.scrollTo(0, 0), [pathname]);
  return <><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} /><Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/checkout" element={<Checkout />} /></Routes></main><Footer /></>;
}
