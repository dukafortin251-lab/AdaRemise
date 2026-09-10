import Navbar from '../components/Navbar.jsx'
import CategorieStatut from '../components/FiltreObjet.jsx';

export default function Inventaire() {
  return (
    <main>
      <h1>Inventaire</h1>
      <Navbar />
      <CategorieStatut />
    </main>
  );
}