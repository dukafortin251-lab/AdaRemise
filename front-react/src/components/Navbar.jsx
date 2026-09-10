import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/">
				<img className="logo" src={logo} alt="Accueil" />
			</Link>
			<ul className="navbarlink">
			 <li><NavLink to="/inventaire">Inventaire</NavLink></li>
    	<li><NavLink to="/depots">Dépôts</NavLink></li>
    	<li><NavLink to="/tableau-de-bord">Tableau de bord</NavLink></li>
			</ul>
		</nav>
	)
}

export default Navbar;