import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function BenevolesListe() {
  // Un seul state : un tableau qui contiendra tous les bénévoles
  const [benevoles, setBenevoles] = useState([]);

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
    <section className="cards-container">
      {benevoles.map((benevole) => (
        <Link to="/tableau-de-bord" key={benevole.id}>
          <article className="card">
            <header className="card-header">
              <span className="card-titre">{benevole.prenom} {benevole.nom}</span>
            </header>
          </article>
        </Link>
      ))}
    </section>
  );
}