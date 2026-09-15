
import { useState, useEffect } from "react";
import "../App.css";

const label_statut = {
  vendu: "Vendu",
  recycle: "Recyclé",
  en_reparation: "En réparation",
  en_rayon: "En rayon",
  arrive: "Arrivé",
};

export default function TableauBord() {
  const [statuts, setStatuts] = useState([]);
  const [poids, setPoids] = useState(0);

  const fetchBord = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/stats");
      if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);
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

  // Cherche uniquement le statut "en_rayon" dans le tableau
  const enRayon = statuts.find((ligne) => ligne.statut === "en_rayon");

  // Trouve la valeur max pour calculer la hauteur des barres en proportion
  const maxTotal = Math.max(...statuts.map((s) => Number(s.total)), 1);

  return (
    <section className="dashboard-grid">
      <article className="card dashboard-description">
        <h3>À propos de La Remise</h3>
        <p>
          La Remise est une ressourcerie associative qui collecte, répare et
          revend à petit prix les objets dont on n'a plus l'usage.
        </p>
      </article>

      <article className="card dashboard-graphique">
        <h3>Objets par statut</h3>
        <div className="graphique-barres">
          {statuts.map((ligne) => (
            <div className="barre-groupe" key={ligne.statut}>
              <div
                className="barre"
                style={{ height: `${(ligne.total / maxTotal) * 100}%` }}
              ></div>
              <span className="barre-label">
                {label_statut[ligne.statut] || ligne.statut}
              </span>
              <span className="barre-valeur">{ligne.total}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="card dashboard-poids">
        <h3>Poids total reçu :</h3>
        <p className="dashboard-chiffre">{poids} kg</p>
      </article>

      <article className="card dashboard-rayon">
        <h3>Objets en rayon :</h3>
        <p className="dashboard-chiffre">{enRayon?.total ?? 0}</p>
      </article>
    </section>
  );
}