import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function NouveauDepot() {
  const [personnes, setPersonnes] = useState([]);
  const [personneId, setPersonneId] = useState("");
  const [telephone, setTelephone] = useState("");

  const [dateDepot, setDateDepot] = useState("");
  const [type, setType] = useState("boutique");
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/personnes")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger les donateurs");
        return res.json();
      })
      .then((data) => setPersonnes(data))
      .catch((err) => setErreur(err.message));
  }, []);

  const handleDonateurChange = (e) => {
    const selectedId = e.target.value;
    setPersonneId(selectedId);

    if (selectedId) {
      const donateurTrouve = personnes.find((p) => p.id === parseInt(selectedId, 10));
      if (donateurTrouve) {
        setTelephone(donateurTrouve.telephone || "Aucun numéro");
      }
    } else {
      setTelephone("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!personneId) {
        throw new Error("Veuillez sélectionner un donateur.");
      }

      const reponseDepot = await fetch("http://localhost:3000/api/depots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personne_id: parseInt(personneId, 10),
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
      
      <div className="nouveau-depot-page">
        <h2>Enregistrer un nouveau dépôt</h2>
        {erreur && <p className="message-erreur">Erreur : {erreur}</p>}
        
        <form onSubmit={handleSubmit} className="ajout-objet-form">
          
          <div className="form-group">
            <label>Donateur :</label>
            <select 
              value={personneId} 
              onChange={handleDonateurChange}
              required
            >
              <option value=""> Sélectionner un donateur </option>
              {personnes.map((personne) => (
                <option key={personne.id} value={personne.id}>
                  {personne.prenom} {personne.nom}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Téléphone :</label>
            <input
              type="text"
              value={telephone}
              readOnly
              className="input-readonly"
            />
          </div>
          
          <div className="form-group">
            <label>Date de création :</label>
            <input
              type="date"
              value={dateDepot}
              onChange={(e) => setDateDepot(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Lieu de dépôt :</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="boutique">En boutique</option>
              <option value="domicile">À domicile</option>
            </select>
          </div>

          <div className="actions-formulaire">
            <button type="button" className="btn-secondaire" onClick={() => navigate("/depots")}>
              Annuler
            </button>
            <button type="submit" className="btn-noir">
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}