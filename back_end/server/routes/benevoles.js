import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const { rows } = await pool.query("SELECT prenom, nom FROM benevole");
	res.json(rows);
});

export default router