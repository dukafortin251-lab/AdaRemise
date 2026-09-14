import Navbar from '../components/Navbar.jsx'
import CategorieStatut from '../components/FiltreObjet.jsx';

export default function Inventaire() {
  return (
    <main>
      <Navbar />
      <h1>Inventaire</h1>
      <CategorieStatut />
    </main>
  );
}