import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT depot.id, personne.nom, ARRAY_AGG(objet.libelle) AS objets
       FROM depot
       JOIN personne ON personne.id = depot.personne_id
       JOIN objet ON objet.depot_id = depot.id
       WHERE depot.id = $1
       GROUP BY depot.id, personne.nom`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erreur: "Dépôt introuvable" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération du dépôt :", err);
  }
});

router.post("/", async (req, res) => {
  const { personne_id, date_depot, type } = req.body;

  if (!personne_id || !date_depot || !type) {
    return res.status(400).json({ erreur: "Champs obligatoires manquants" });
  }

  if (type !== "boutique" && type !== "domicile") {
    return res.status(400).json({
      erreur: "Le type spécifié est invalide. Les valeurs acceptées sont « boutique » ou « domicile »."
    });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO depot(personne_id, date_depot, type) VALUES ($1, $2, $3) RETURNING *`,
      [personne_id, date_depot, type]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la création du dépôt :", err);
  }
});

router.post("/:id/objets", async (req, res) => {
  const { libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, vente_id, prix_paye } = req.body;
  const depotId = req.params.id;

  if (!libelle || !categorie_id || !poids_kg || !etat_arrivee) {
    return res.status(400).json({ 
      erreur: "Les champs obligatoires sont manquants." 
    });
  }

  const Etats = ["bon_etat", "a_reparer", "hors_service"];
  if (!Etats.includes(etat_arrivee)) {
    return res.status(400).json({ erreur: `etat_arrivee doit valoir : ${Etats.join(",")}` });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO objet (libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depot_id, vente_id, prix_paye) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depotId, vente_id, prix_paye]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'objet :", err);
  }
});
export default router;