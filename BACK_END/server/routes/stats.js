import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows: objetsParStatut } = await pool.query(
      `SELECT statut, COUNT(*) AS total FROM objet GROUP BY statut`,
    );

    const { rows: totalRows } = await pool.query(
      `SELECT COALESCE(SUM(poids_kg), 0) AS poids_total_recu FROM objet`,
    );

    const { rows: detourneRows } = await pool.query(
      `SELECT COALESCE(SUM(poids_kg), 0) AS poids_detourne FROM objet WHERE statut IN ('vendu', 'en_rayon', 'recycle')`,
    );

    return res.json({
      objets_par_statut: objetsParStatut,
      poids_total_recu: totalRows[0].poids_total_recu,
      poids_detourne: detourneRows[0].poids_detourne,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des indicateurs :", err);
    return res.status(500).json({ erreur: "Erreur interne du serveur" });
  }
});

export default router;
