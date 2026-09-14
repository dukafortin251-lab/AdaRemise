import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import CategorieStatut from '../components/FiltreObjet.jsx';

export default function Inventaire() {
  const { prenom, nom } = useParams();

  return (
    <main>
      <Navbar prenom={prenom} nom={nom} />
      <h1>Inventaire</h1>
      <CategorieStatut />
    </main>
  );
}