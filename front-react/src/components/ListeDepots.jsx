import { useState, useEffect } from "react";
import "../App.css";

export default function DepotList() {
  const [depots, setDepots] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [prenom, setPrenom] = useState("");
  const [nomDonateur, setNomDonateur] = useState("");
  const [dateDepot, setDateDepot] = useState("");

  const fetchDepots = async () => {
    try {
      const reponse = await fetch("http://localhost:3000/api/depots");

      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }

      const donnees = await reponse.json();

      if (Array.isArray(donnees)) {
        setDepots(donnees);
        setErreur(null);
      } else {
        console.error("Format inattendu reçu de l'API :", donnees);
        setDepots([]);
      }
    } catch (err) {
      console.error("Erreur de récupération :", err);
      setErreur(err.message);
      setDepots([]);
    }
  };

  useEffect(() => {
    fetchDepots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:3000/api/depots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: prenom, nom_donateur: nomDonateur, date_depot: dateDepot }),
      });

      if (!reponse.ok) throw new Error("Erreur lors de l'enregistrement");

      setNomDonateur("");
      setPrenom("");
      setDateDepot("");
      fetchDepots();
    } catch (err) {
      alert(err.message);
    }
  };

  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <div className="depot-container">
      <div className="depot-header">
        <h2>Dépôts</h2>
        <button>
          enregistrer un nouveau depot
        </button>
      </div>
      
      <div className="cards-container">
        {depots?.length === 0 ? (
          <p>Aucun dépôt trouvé.</p>
        ) : (
          depots?.map((depot) => (
            <article key={depot.id} className="card">
              <header className="card-header">
                <span className="card-id"># {depot.id}</span>
              </header>
              <h3 className="card-title">Donateur : {depot.prenom} {depot.nom_donateur}</h3>
              <p className="card-price">
                Date dépôt : {depot.date_depot ? new Date(depot.date_depot).toLocaleDateString('fr-FR') : ""}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}