import { useState, useEffect } from "react";
import "../App.css";
import filtre from "../assets/filtre.png";
import ListeObjet from "./ListeObjet";
import ModalObjet from "./ModalObjet";

export default function FiltreObjet() {
  const [objet, setObjets] = useState([]);
  const [categories, setCategories] = useState("");
  const [statut, setStatut] = useState("");

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchObjets = async () => {
    const params = new URLSearchParams();
    if (statut) params.append("statut", statut);
    if (categories) params.append("categorie_id", categories);

    try {
      const reponse = await fetch(
        `http://localhost:3000/api/objets?${params.toString()}`
      );

      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }

      const donnees = await reponse.json();

      if (Array.isArray(donnees)) {
        setObjets(donnees);
      } else {
        console.error("Format inattendu reçu de l'API :", donnees);
        setObjets([]);
      }
    } catch (err) {
      console.error("Erreur de récupération :", err);
      setObjets([]);
    }
  };

  useEffect(() => {
    fetchObjets();
  }, [statut, categories]);

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  return (
    <section>
      <button
        className="bouton-filtre"
        onClick={() => setIsFilterModalOpen(true)}
      >
        <img className="filtrePng" src={filtre} alt="image filtre" />
        Filtres
      </button>

      {isFilterModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsFilterModalOpen(false)}
        >
          <section
            className="filtre-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Filtres</h2>
            <section className="filtre-statuts">
              <button
                className={statut === "" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setStatut(statut === "" ? "" : "")}
              >
                Tout les statuts
              </button>
              <button
                className={statut === "arrive" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setStatut(statut === "arrive" ? "" : "arrive")}
              >
                🔵 Arrivé
              </button>
              <button
                className={statut === "en_reparation" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setStatut(statut === "en_reparation" ? "" : "en_reparation")}
              >
                🟠 En réparation
              </button>
              <button
                className={statut === "en_rayon" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setStatut(statut === "en_rayon" ? "" : "en_rayon")}
              >
                🟢 En rayon
              </button>
              <button
                className={statut === "vendu" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setStatut(statut === "vendu" ? "" : "vendu")}
              >
                🔴 Vendu
              </button>
              <button
                className={statut === "recycle" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setStatut(statut === "recycle" ? "" : "recycle")}
              >
                ♻️ Recyclé
              </button>
            </section>

            <section className="filtre-categories">
              <button
                className={categories === "" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories("")}
              >
                Toutes les catégories
              </button>
              <button
                className={categories === "1" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "1" ? "" : "1")}
              >
                Mobilier
              </button>
              <button
                className={categories === "2" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "2" ? "" : "2")}
              >
                Électroménager
              </button>
              <button
                className={categories === "3" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "3" ? "" : "3")}
              >
                Vaiselle
              </button>
              <button
                className={categories === "4" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "4" ? "" : "4")}
              >
                Textile
              </button>
              <button
                className={categories === "5" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "5" ? "" : "5")}
              >
                Livres
              </button>
              <button
                className={categories === "6" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "6" ? "" : "6")}
              >
                Jouets
              </button>
              <button
                className={categories === "7" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "7" ? "" : "7")}
              >
                Outillage
              </button>
              <button
                className={categories === "8" ? "bouton-actif" : "bouton-normal"}
                onClick={() => setCategories(categories === "8" ? "" : "8")}
              >
                Décoration
              </button>
            </section>
            <button
              className="bouton-reset"
              onClick={() => setIsFilterModalOpen(false)}
            >
              Fermer
            </button>
          </section>
        </div>
      )}

      {objet.length === 0 ? (
        <section className="message-vide">
          <p>Aucun objet ne correspond à vos critères de recherche.</p>
        </section>
      ) : (
        <ListeObjet objets={objet} onCardClick={handleOpenDetails} />
      )}
      {isDetailsModalOpen && (
        <ModalObjet 
          item={selectedItem} 
          onClose={() => setIsDetailsModalOpen(false)} 
        />
      )}
    </section>
  );
}