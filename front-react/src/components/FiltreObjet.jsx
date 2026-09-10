import { useState, useEffect } from "react";

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
      const donnees = await reponse.json();
      setObjets(donnees);
    } catch (err) {
      console.error("Erreur de récupération :", err);
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

      <ul>
        {objet.map((objet) => (
          <li key={objet.id}>
            [ID: {objet.id}] {objet.libelle} -{" "}
            {objet.prix ? `${objet.prix}€` : ""} - Statut:{" "}
            {objet.statut}
          </li>
        ))}
      </ul>
    </section>
  );
}
