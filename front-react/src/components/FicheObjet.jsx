export default function FicheObjet({ item, onClick }) {
  return (
    <article 
      className="card" 
      onClick={() => onClick(item)}
      style={{ cursor: "pointer" }}
    >
      <header className="card-header">
        <span className="card-id"># {item.id}</span>
        <span className="badge">{item.statut}</span>
      </header>
      <h3 className="card-title">{item.libelle}</h3>
      <p className="card-price">{item.prix ? `${item.prix}€` : ""}</p>
    </article>
  );
}
