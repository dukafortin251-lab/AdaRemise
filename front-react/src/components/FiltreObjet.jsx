import { useState, useEffect } from "react";
import "../App.css";

export default function CategorieStatut() {
  const [objet, setObjets] = useState([]);
  const [categories, setCategories] = useState("");
  const [statut, setStatut] = useState("");

  const fetchObjets = async () => {
    const params = new URLSearchParams();
    if (statut) params.append("statut", statut);
    if (categories) params.append("categorie_id", categories);

    try {
      const reponse = await fetch(
        `http://localhost:3000/api/objets?${params.toString()}`,
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

  return (
    <section>
      <button>Filtre</button>
      <section className="filtre-container">
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
          className={
            statut === "en_reparation" ? "bouton-actif" : "bouton-normal"
          }
          onClick={() =>
            setStatut(statut === "en_reparation" ? "" : "en_reparation")
          }
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
      </section>
      <section className="cards-container">
        {objet?.map((item) => (
          <article className="card" key={item.id}>
            <header className="card-header">
              <span className="card-id"># {item.id}</span>
              <span className="badge">{item.statut}</span>
            </header>
            <h3 className="card-title">{item.libelle}</h3>
            <p className="card-price">{item.prix ? `${item.prix}€` : ""}</p>
          </article>
        ))}
      </section>
    </section>
  );
}
