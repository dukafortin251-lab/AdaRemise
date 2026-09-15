const label_statut = {
  vendu: "Vendu",
  recycle: "Recyclé",
  en_reparation: "En réparation",
  en_rayon: "En rayon",
  arrive: "Arrivé",
};

const classe_statut = {
  vendu: "badge-vendu",
  recycle: "badge-recycle",
  en_reparation: "badge-reparation",
  en_rayon: "badge-rayon",
  arrive: "badge-arrive",
};

export default function ListeObjets({ objets, onCardClick }) {
  if (!objets || objets.length === 0) {
    return (
      <p className="message-vide">
        Aucun objet ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <section className="depot-container">
      <section className="cards-container">
        {objets.map((item) => {
          const badgeClass = classe_statut[item.statut] || "badge-defaut";
          const statutLabel = label_statut[item.statut] || item.statut || "Non défini";

          return (
            <article
              key={item.id}
              className="carddepot carte-cliquable"
              onClick={() => onCardClick && onCardClick(item)}
            >
              <div className="card-top-section">
                <h3 className="card-title">
                  {item.libelle || item.nom || "Objet sans nom"}
                </h3>
              </div>
              
              <hr className="card-divider" />
              
              <div className="card-infos">
                <div className="card-info-row">
                  <span className="card-label">ID</span>
                  <span className="card-value">#{item.id}</span>
                </div>
                
                <div className="card-info-row">
                  <span className="card-label">STATUT</span>
                  <span className={`badge ${badgeClass}`}>
                    {statutLabel}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}