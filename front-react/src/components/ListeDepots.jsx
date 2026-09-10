import { useState, useEffect } from "react";

export default function DepotList() {
  const [depots, setDepots] = useState([]);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/depots")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de récupérer les dépôts");
        return res.json();
      })
      .then((data) => setDepots(data))
      .catch((err) => setErreur(err.message));
  }, []);

  if (erreur) return <p>Erreur : {erreur}</p>;

  
  const handleNouveauDepot = () => {
    console.log("Clic sur enregistrer un nouveau dépôt");
  };

  return (
    <div className="depot-container">
      <div className="depot-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Dépôts</h2>
        <button 
          onClick={handleNouveauDepot}
          className="btn-nouveau-depot"
          
        >
           enregistrer un nouveau dépôt
        </button>
      </div>
      
      <div className="depots-list">
        {depots.length === 0 ? (
          <p>Aucun dépôt trouvé.</p>
        ) : (
          depots.map((depot) => (
            <div key={depot.id} className="depot-card">
              <p>Dépôt numéro : {depot.id}</p>
              <p>Date dépôt : {depot.date_depot}</p>
              <p>Donateur : {depot.nom_donateur}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}