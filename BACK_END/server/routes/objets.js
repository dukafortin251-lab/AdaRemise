import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { statut, categorie_id } = req.query;

  try {
    const { rows } = await pool.query(
      `SELECT objet.id, objet.libelle, objet.poids_kg,objet.etat_arrivee, 
              objet.statut, objet.prix, objet.date_mise_rayon, objet.categorie_id, 
              objet.depot_id, objet.vente_id, objet.prix_paye, 
              categorie.libelle AS categorie 
      FROM objet 
      JOIN categorie ON categorie.id = objet.categorie_id
      WHERE ($1::text IS NULL OR objet.statut::text = $1)
      AND ($2::int IS NULL OR objet.categorie_id = $2)
      ORDER BY objet.id`,
      [statut || null, categorie_id || null]
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des objets :", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT objet.categorie_id, objet.depot_id, categorie.libelle AS categorie, depot.personne_id, personne.nom, personne.prenom
      FROM objet
      JOIN categorie ON categorie.id = objet.categorie_id 
      JOIN depot ON depot.id = objet.depot_id
      JOIN personne ON personne.id = depot.personne_id
      WHERE objet.id = $1
      ORDER BY objet.id`,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ erreur: "Objet introuvable" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'objet :", err);
  }
});

router.patch("/:id/statut", async (req, res) => {
  const { statut, prix } = req.body;
  const objetId = req.params.id;
  const STATUTS = ["arrive", "en_reparation", "en_rayon", "vendu", "recycle"];

  if (!STATUTS.includes(statut)) {
    return res.status(400).json({ erreur: "Statut invalide" });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE objet
       SET statut = $2::statut_objet,
           prix = COALESCE($3, prix),
           date_mise_rayon = CASE WHEN $2 = 'en_rayon' THEN CURRENT_DATE ELSE date_mise_rayon END
       WHERE id = $1 RETURNING *`,
      [objetId, statut, prix ?? null],
    );

    if (rows.length === 0)
      return res.status(404).json({ erreur: "Introuvable" });

    return res.json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut :", err);
  }
});

export default router;
