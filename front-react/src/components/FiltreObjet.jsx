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

      // 1. Bloque l'exécution si le serveur renvoie une erreur (ex: 500)
      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }

      const donnees = await reponse.json();

      // 2. Vérifie que les données sont bien un tableau avant de mettre à jour le state
      if (Array.isArray(donnees)) {
        setObjets(donnees);
      } else {
        console.error("Format inattendu reçu de l'API :", donnees);
        setObjets([]); // Force un tableau vide
      }
    } catch (err) {
      console.error("Erreur de récupération :", err);
      setObjets([]); // Vide la liste en cas de crash du serveur pour éviter le blocage
    }
  };

  useEffect(() => {
    fetchObjets();
  }, [statut, categories]);

  return (
    <section>
      <select
        value={statut}
        onChange={(event) => setStatut(event.target.value)}
      >
        <option value="">Tous les statuts</option>
        <option value="arrive">Arrivé</option>
        <option value="en_reparation">En réparation</option>
        <option value="en_rayon">En rayon</option>
        <option value="vendu">Vendu</option>
        <option value="recycle">Recyclé</option>
      </select>

      <select
        value={categories}
        onChange={(event) => setCategories(event.target.value)}
      >
        <option value="">Toutes les catégories</option>
        <option value="1">Mobilier</option>
        <option value="2">Électroménager</option>
        <option value="3">Vaisselle</option>
        <option value="4">Textile</option>
        <option value="5">Livres</option>
        <option value="6">Jouets</option>
        <option value="7">Outillage</option>
        <option value="8">Décoration</option>
      </select>

      <section className="cards-container">
        {/* 3. Sécurisation avec le point d'interrogation (?.) avant le map */}
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