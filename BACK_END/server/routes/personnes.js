import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM personne ORDER BY nom ASC");
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des personnes :", err);
    return res.status(500).json({ erreur: "Erreur interne du serveur" });
  }
});
 
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query("SELECT * FROM personne WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erreur: "Personne non trouvée" });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération de la personne :", err);
    return res.status(500).json({ erreur: "Erreur interne du serveur" });
  }
});

export default router;