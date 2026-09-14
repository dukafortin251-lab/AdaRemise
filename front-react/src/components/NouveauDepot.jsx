import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function NouveauDepot() {
  const [estNouveauDonateur, setEstNouveauDonateur] = useState(false);
  const [personneId, setPersonneId] = useState("");
  
  // Champs pour un nouveau donateur
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");

  const [dateDepot, setDateDepot] = useState("");
  const [type, setType] = useState("boutique");
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let idDonateurFinal = personneId;

      if (estNouveauDonateur) {
        const reponseDonateur = await fetch("http://localhost:3000/api/personnes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prenom, nom, telephone }),
        });

        if (!reponseDonateur.ok) throw new Error("Erreur lors de la création du donateur");
        
        const nouveauDonateur = await reponseDonateur.json();
        idDonateurFinal = nouveauDonateur.id; 
      }

      const reponseDepot = await fetch("http://localhost:3000/api/depots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personne_id: parseInt(idDonateurFinal, 10),
          date_depot: dateDepot || null,
          type,
        }),
      });

      if (!reponseDepot.ok) throw new Error("Erreur lors de la création du dépôt");

      const nouveauDepot = await reponseDepot.json();
      navigate(`/depots/${nouveauDepot.id}`);
      
    } catch (err) {
      setErreur(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h2>Enregistrer un nouveau dépôt</h2>
        {erreur && <p style={{ color: "red" }}>Erreur : {erreur}</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <button 
              type="button" 
              onClick={() => setEstNouveauDonateur(!estNouveauDonateur)}
            >
              {estNouveauDonateur ? "← Choisir un donateur existant" : "+ Créer un nouveau donateur"}
            </button>
          </div>

          {estNouveauDonateur ? (
            <>
              <div>
                <label>Prénom :</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Nom :</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div>
                <label>Téléphone :</label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div>
              <label>ID du donateur existant :</label>
              <input
                type="number"
                value={personneId}
                onChange={(e) => setPersonneId(e.target.value)}
                required={!estNouveauDonateur}
              />
            </div>
          )}
          
          <div>
            <label>Date de création :</label>
            <input
              type="date"
              value={dateDepot}
              onChange={(e) => setDateDepot(e.target.value)}
            />
          </div>
          
          <div>
            <label>Lieu de dépôt :</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="boutique">En boutique</option>
              <option value="domicile">À domicile</option>
            </select>
          </div>

          <div className="boutons-formulaire" style={{ marginTop: "20px" }}>
            <button type="button" onClick={() => navigate("/depots")} style={{ marginRight: "10px" }}>
              Annuler
            </button>
            <button type="submit">
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}