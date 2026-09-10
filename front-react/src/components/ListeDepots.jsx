import { useState, useEffect } from "react";
import "../App.css";

export default function DepotList() {
  const [depots, setDepots] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
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
        body: JSON.stringify({ nom_donateur: nomDonateur, date_depot: dateDepot }),
      });

      if (!reponse.ok) throw new Error("Erreur lors de l'enregistrement");

      setNomDonateur("");
      setDateDepot("");
      setAfficherFormulaire(false);
      fetchDepots();
    } catch (err) {
      alert(err.message);
    }
  };

  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <div className="depot-container">
      <div className="depot-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Dépôts</h2>
        <button 
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="btn-nouveau-depot"
        >
          {afficherFormulaire ? "Annuler" : "Enregistrer un nouveau dépôt"}
        </button>
      </div>

      {afficherFormulaire && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="Nom du donateur" 
            value={nomDonateur} 
            onChange={(e) => setNomDonateur(e.target.value)} 
            required 
          />
          <input 
            type="date" 
            value={dateDepot} 
            onChange={(e) => setDateDepot(e.target.value)} 
            required 
          />
          <button type="submit">Valider</button>
        </form>
      )}
      
      <div className="cards-container">
        {depots?.length === 0 ? (
          <p>Aucun dépôt trouvé.</p>
        ) : (
          depots?.map((depot) => (
            <article key={depot.id} className="card">
              <header className="card-header">
                <span className="card-id"># {depot.id}</span>
              </header>
              <h3 className="card-title">Donateur : {depot.nom_donateur}</h3>
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