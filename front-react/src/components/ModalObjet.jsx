import { useState, useEffect } from "react";

export default function ModalObjet({ item, onClose, onUpdate }) {
  if (!item) return null;

  const [status, setStatus] = useState(item.statut || "");

  const dateFormatee = item.date_mise_rayon
    ? new Date(item.date_mise_rayon).toLocaleDateString("fr-FR")
    : "-";

  useEffect(() => {
    const fetchObjets = async () => {
      try {
        const reponse = await fetch(
          `http://localhost:3000/api/objets/${item.id}/statut`,
        );
        const data = await reponse.json();
        if (data.statut) {
          setStatus(data.statut);
        }
      } catch (err) {
        console.error("Erreur de récupération :", err);
      }
    };
    if (item.id) {
      fetchObjets();
    }
  }, [item.id]);

  const updateStatus = async (e) => {
    const nouveauStatut = e.target.value;
    const ancienStatut = status;

    setStatus(nouveauStatut);

    try {
      const reponse = await fetch(
        `http://localhost:3000/api/objets/${item.id}/statut`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ statut: nouveauStatut }),
        },
      );

      if (!reponse.ok) {
        throw new Error("Erreur lors de la mise à jour du statut");
      }
      
      onUpdate();

    } catch (err) {
      console.error("Erreur de modification :", err);
      setStatus(ancienStatut);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          {item.libelle}
          <p>#{item.id}</p>
        </h2>
        <p>
          <strong>Statut actuel :</strong> {status || "-"}
        </p>
        <p>
          <strong>Date de mise en rayon :</strong> {dateFormatee}
        </p>
        <p>
          <strong>Prix :</strong> {item.prix ? `${item.prix}€` : "-"}
        </p>
        <p>
          <strong>Poids :</strong> {item.poids_kg ? `${item.poids_kg} kg` : "-"}
        </p>
        <p>
          <strong>Catégorie :</strong> {item.categorie}
        </p>

        <select
          className="select-statut"
          value={status}
          onChange={updateStatus}
        >
          <option value="arrive">🔵 Arrivé</option>
          <option value="en_reparation">🟠 En réparation</option>
          <option value="en_rayon">🟢 En rayon</option>
          <option value="vendu">🔴 Vendu</option>
          <option value="recycle">♻️ Recyclé</option>
        </select>

        <button className="bouton-reset" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}
