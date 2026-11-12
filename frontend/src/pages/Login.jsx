import { useState } from 'react'; import { Link, useLocation, useNavigate } from 'react-router-dom'; import { login } from '../services/api'; import { useStore } from '../context/CartContext';
export default function Login() {
  const { setUser } = useStore(); const nav = useNavigate(); const from = useLocation().state?.from || '/';
  const [f, setF] = useState({ email: '', password: '' }); const [err, setErr] = useState('');
  const submit = async e => { e.preventDefault(); try { setUser(await login(f)); nav(from); } catch (x) { setErr(x.message); } };
  return <div className="wrap sec"><form className="auth" onSubmit={submit}><h1>Welcome back</h1>{err && <p className="err">{err}</p>}
    <label>Email<input type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></label>
    <label>Password<input type="password" required value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></label>
    <button className="btn lg full">Log in</button><p className="muted">New here? <Link to="/register" className="more">Create an account</Link></p></form></div>;
}
