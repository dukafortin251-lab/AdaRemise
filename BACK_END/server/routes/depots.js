import express from "express";
import { pool } from "../db.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const { personne_id, date_depot, type } = req.body;

  if (!personne_id) {
    return res.status(400).json({ erreur: "L'identifiant de la personne est obligatoire" });
  }

  const typeDepot = type || "boutique";

  if (typeDepot !== "boutique" && typeDepot !== "domicile") {
    return res.status(400).json({
      erreur: "Le type spécifié est invalide. Les valeurs acceptées sont « boutique » ou « domicile »."
    });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO depot (personne_id, date_depot, type) VALUES ($1, COALESCE($2, CURRENT_DATE), $3) RETURNING *`,
      [personne_id, date_depot, typeDepot]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la création du dépôt :", err);
    return res.status(500).json({ erreur: "Erreur interne du serveur" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT depot.id, depot.date_depot, depot.type, personne.nom, personne.prenom, COALESCE(ARRAY_AGG(objet.libelle) FILTER (WHERE objet.id IS NOT NULL), '{}') AS objets
       FROM depot
       JOIN personne ON personne.id = depot.personne_id
       LEFT JOIN objet ON objet.depot_id = depot.id
       WHERE depot.id = $1
       GROUP BY depot.id, depot.date_depot, depot.type, personne.nom, personne.prenom`,
      [req.params.id]
    );
 
    if (rows.length === 0) {
      return res.status(404).json({ erreur: "Dépôt introuvable" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération du dépôt :", err);
    return res.status(500).json({ erreur: "Erreur interne du serveur" });
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
    const depotCheck = await pool.query("SELECT id FROM depot WHERE id = $1", [depotId]);
    if (depotCheck.rows.length === 0) {
      return res.status(404).json({ erreur: "Dépôt parent non trouvé" });
    }

    const { rows } = await pool.query(
      `INSERT INTO objet (libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depot_id, vente_id, prix_paye) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depotId, vente_id, prix_paye]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'objet :", err);
    return res.status(500).json({ erreur: "Erreur interne du serveur" });
  }
});

export default router;