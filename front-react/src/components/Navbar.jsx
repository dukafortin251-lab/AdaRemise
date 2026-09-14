import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Navbar = ({ prenom, nom }) => {
	return (
		<nav className="navbar">
			<Link to="/">
				<img className="logo" src={logo} alt="Accueil" />
			</Link>
			<ul className="navbarlink">
			 <li><NavLink to={`/inventaire/${prenom || ''}/${nom || ''}`}>Inventaire</NavLink></li>
    	<li><NavLink to={`/depots/${prenom || ''}/${nom || ''}`}>Dépôts</NavLink></li>
    	<li><NavLink to={`/tableau-de-bord/${prenom || ''}/${nom || ''}`}>Tableau de bord</NavLink></li>
			</ul>
			<span className="prenom-benevole">{prenom} {nom}</span>
		</nav>
	)
}

export default Navbar;