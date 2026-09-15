export default function ModalObjet({ item, onClose }) {
  if (!item) return null;

  const dateFormatee = item.date_mise_rayon
    ? new Date(item.date_mise_rayon).toLocaleDateString("fr-FR")
    : "-";
  ``;
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          {item.libelle}
          <p>#{item.id}</p>
        </h2>
        <p>
          <strong>Statut :</strong> {item.statut}
        </p>
        <p>
          <strong>Date de mise en rayon :</strong>
          {dateFormatee}
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
          value={statut}
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
