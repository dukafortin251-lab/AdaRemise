import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DepotList() {
  const [depots, setDepots] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [prenom, setPrenom] = useState("");
  const [nomDonateur, setNomDonateur] = useState("");
  const [dateDepot, setDateDepot] = useState("");
  const navigate = useNavigate();
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
        <button className="btn-enregistrer" onClick={() => navigate ("/depots/nouveau")}>
          Enregistrer un nouveau dépôt
        </button>
      </div>
      
      <div className="cards-container">
        {depots?.length === 0 ? (
          <p>Aucun dépôt trouvé.</p>
        ) : (
          depots?.map((depot) => (
            <article key={depot.id} className="carddepot" onClick={() => navigate (`/depots/${depot.id}`)}>
              <div className="card-top-section">
                <h3 className="card-title">
                  {depot.prenom} <br /> {depot.nom_donateur}
                </h3>
              </div>
              
              <hr className="card-divider" />

              <div className="card-infos">
                <div className="card-info-row">
                  <span className="card-label">ID</span>
                  <span className="card-value">#{depot.id}</span>
                </div>
                <div className="card-info-row">
                  <span className="card-label">DATE DE CRÉATION</span>
                  <span className="card-value">
                    {depot.date_depot ? new Date(depot.date_depot).toLocaleDateString('fr-FR') : ""}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}