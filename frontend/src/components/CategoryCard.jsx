import { Link } from 'react-router-dom';
export default function CategoryCard({ name, emoji, tone }) {
  return <Link to={`/shop?category=${name}`} className="cat" style={{ background: tone }}><span>{emoji}</span><b>{name}</b></Link>;
}
