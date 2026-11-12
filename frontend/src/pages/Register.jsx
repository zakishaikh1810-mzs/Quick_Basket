import { useState } from 'react'; import { Link, useNavigate } from 'react-router-dom'; import { register } from '../services/api'; import { useStore } from '../context/CartContext';
export default function Register() {
  const { setUser } = useStore(); const nav = useNavigate(); const [f, setF] = useState({ name: '', email: '', password: '' }); const [err, setErr] = useState('');
  const submit = async e => { e.preventDefault(); try { setUser(await register(f)); nav('/'); } catch (x) { setErr(x.message); } };
  return <div className="wrap sec"><form className="auth" onSubmit={submit}><h1>Create your account</h1>{err && <p className="err">{err}</p>}
    <label>Full name<input required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></label>
    <label>Email<input type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></label>
    <label>Password (6+ characters)<input type="password" minLength={6} required value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></label>
    <button className="btn lg full">Create account</button><p className="muted">Have an account? <Link to="/login" className="more">Log in</Link></p></form></div>;
}
