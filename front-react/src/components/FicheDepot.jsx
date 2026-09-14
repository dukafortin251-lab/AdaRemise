import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function FicheDepot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [depot, setDepot] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [succesMsg, setSuccesMsg] = useState(null);

  const [nouvelObjet, setNouvelObjet] = useState({
    libelle: "",
    etat_arrivee: "bon_etat",
    categorie_id: 1,
    date_mise_rayon: "",
    poids_kg: "",
    statut: "en_stock",
    prix: ""
  });

  const chargerDepot = () => {
    fetch(`http://localhost:3000/api/depots/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de charger le dépôt");
        return res.json();
      })
      .then((data) => setDepot(data))
      .catch((err) => setErreur(err.message));
  };

  useEffect(() => {
    chargerDepot();
  }, [id]);

  const handleAjoutObjet = async (e) => {
    e.preventDefault();
    setErreur(null);
    setSuccesMsg(null);

    try {
      const response = await fetch(`http://localhost:3000/api/depots/${id}/objets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libelle: nouvelObjet.libelle,
          poids_kg: parseFloat(nouvelObjet.poids_kg),
          etat_arrivee: nouvelObjet.etat_arrivee,
          statut: nouvelObjet.statut,
          prix: nouvelObjet.prix ? parseFloat(nouvelObjet.prix) : null,
          date_mise_rayon: nouvelObjet.date_mise_rayon || null,
          categorie_id: parseInt(nouvelObjet.categorie_id, 10)
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.erreur || "Erreur lors de l'ajout de l'objet");
      }

      setSuccesMsg("Objet ajouté avec succès !");
      chargerDepot(); 
      setNouvelObjet({
        libelle: "",
        etat_arrivee: "bon_etat",
        categorie_id: 1,
        date_mise_rayon: "",
        poids_kg: "",
        statut: "en_stock",
        prix: ""
      });
    } catch (err) {
      setErreur(err.message);
    }
  };

  if (erreur && !depot) return <p>Erreur : {erreur}</p>;
  if (!depot) return <p>Chargement de la fiche...</p>;

  return (
    <div>
      <Navbar />
      <div className="fiche-depot-page">
        <header className="fiche-header">
          <button onClick={() => navigate("/depots")} className="btn-retour">
            Dépôts
          </button>
          <h1>FICHE DEPOT</h1>
        </header>

        {erreur && <p style={{ color: "red", textAlign: "center" }}>{erreur}</p>}
        {succesMsg && <p style={{ color: "green", textAlign: "center" }}>{succesMsg}</p>}

        <div className="fiche-content">
          <aside className="colonne-gauche">
            <div className="info-card">
              <p><strong>ID</strong> #{depot.id}</p>
              <p><strong>Donneur</strong> {depot.prenom} {depot.nom_donateur}</p>
              <p><strong>Date de création</strong> {depot.date_depot ? new Date(depot.date_depot).toLocaleDateString('fr-FR') : ""}</p>
              <p><strong>Lieu de dépôt</strong> {depot.type === "boutique" ? "En boutique" : "À domicile"}</p>
              <p><strong>Statut</strong> En cours d'inventaire</p>
            </div>

            <div className="elements-card">
              <h3>Éléments dans ce dépôt</h3>
              <div className="elements-list">
                {depot.objets && depot.objets.length > 0 ? (
                  depot.objets.map((obj, index) => (
                    <p key={index}>- {typeof obj === 'string' ? obj : `#${obj.id} - ${obj.libelle}`}</p>
                  ))
                ) : (
                  <p>Aucun objet enregistré pour l'instant.</p>
                )}
              </div>
            </div>
          </aside>

          <main className="colonne-droite">
            <form className="ajout-objet-form" onSubmit={handleAjoutObjet}>
              <div className="form-row">
                <div className="form-group">
                  <label>Libellé</label>
                  <input 
                    type="text" 
                    value={nouvelObjet.libelle}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, libelle: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>État d'arrivée</label>
                  <select 
                    value={nouvelObjet.etat_arrivee}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, etat_arrivee: e.target.value})}
                  >
                    <option value="bon_etat">Bon état</option>
                    <option value="a_reparer">À réparer</option>
                    <option value="hors_service">Hors service</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie (ID)</label>
                  <input 
                    type="number" 
                    value={nouvelObjet.categorie_id}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, categorie_id: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date de mise en rayon</label>
                  <input 
                    type="date" 
                    value={nouvelObjet.date_mise_rayon}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, date_mise_rayon: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Statut</label>
                  <input 
                    type="text" 
                    value={nouvelObjet.statut}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, statut: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Poids (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={nouvelObjet.poids_kg}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, poids_kg: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix (€)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={nouvelObjet.prix}
                    onChange={(e) => setNouvelObjet({...nouvelObjet, prix: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="btn-noir">
                ajouter un objet
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}