import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function BenevolesListe() {
  // Un seul state : un tableau qui contiendra tous les bénévoles
  const [benevoles, setBenevoles] = useState([]);
  const emojis = ["🦊", "🐻", "🐼", "🦁", "🐨", "🐸", "🐵", "🐰", "🐯", "🐺", "🐹", "🐷", "🐮", "🐔"];
  
  function getEmoji(id) {
  return emojis[id % emojis.length];
}
  
  const fetchBenevoles = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/benevoles");
      const donnees = await reponse.json();
      setBenevoles(donnees); // on stocke ce qu'on reçoit
    } catch (err) {
      console.error("Erreur de récupération :", err);
    }
  };

  useEffect(() => {
    fetchBenevoles();
  }, []);

  return (
    <section className="cards-container cards-accueil">
      {benevoles.map((benevole) => (
        <Link to={`/tableau-de-bord/${benevole.prenom}/${benevole.nom}`} key={benevole.id} className="lien-carte">
            <article className="card card-grand">
              <span className="avatar-rond">{getEmoji(benevole.id)}</span>
              <span className="card-titre">{benevole.prenom} {benevole.nom}</span>
            </article>
        </Link>
      ))}
    </section>
  );
}