import { NavLink } from 'react-router-dom';
import './index.scss';

const Navigation = () => {
  return (
    <div>
      <div className="navbar">
        <h4 className="navbar-brand">React x Express</h4>
        <ul className="link-wrapper">
          <li className="link">
            <NavLink exact to="/">Home v1</NavLink>
          </li>
          <li className="link">
            <NavLink to="/tambah">Tambah v1</NavLink>
          </li>
          <li className="link">
            <NavLink exact to="/v2">Home v2</NavLink>
          </li>
          <li className="link">
            <NavLink to="/v2/tambah">Tambah v2</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation;