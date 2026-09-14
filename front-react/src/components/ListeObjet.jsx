import FicheObjet from "./FicheObjet";

export default function ListeObjets({ objets, onCardClick }) {
  if (!objets || objets.length === 0) {
    return <p>Aucun objet trouvé.</p>;
  }

  return (
    <section className="cards-container">
      {objets.map((item) => (
        <FicheObjet 
          key={item.id} 
          item={item} 
          onClick={onCardClick} 
        />
      ))}
    </section>
  );
}