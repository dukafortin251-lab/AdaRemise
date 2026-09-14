import { useState, useEffect } from "react";
import "../App.css";

export default function TableauBord() {
  const [statuts, setStatuts] = useState([]);
  const [poids, setPoids] = useState(0);

  const fetchBord = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/stats");

      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }

      const donnees = await reponse.json();
      setStatuts(donnees.objets_par_statut);
      setPoids(donnees.poids_total_recu);
    } catch (err) {
      console.error("Erreur de récupération :", err);
      setStatuts([]);
      setPoids(0);
    }
  };

  useEffect(() => {
    fetchBord();
  }, []);

  return (
    <section className="cards-container">

			<article className="card">
 				 <p> La Remise est une ressourcerie associative qui collecte, répare et
    revend à petit prix les objets dont on n'a plus l'usage.</p>
			</article>
      <article className="card">
        <h3>Poids total reçu</h3>
        <p>{poids} kg</p>
      </article>

      <article className="card">
        <h3>Objets par statut</h3>
        <ul>
          {statuts.map((ligne) => (
            <li key={ligne.statut}>
              {ligne.statut} : {ligne.total}
            </li>
          ))}
        </ul>
      </article>

        
			
    </section>
  );
}