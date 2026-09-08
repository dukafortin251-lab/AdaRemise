import express from "express";
import {pool} from "../db.js";

const router= express.Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM categorie");
  res.json(rows);
});

router.post("/",async(req,res) => {
  const {libelle} = req.body
  const { rows } = await pool.query(`INSERT INTO categorie (libelle) values ($1)`,[libelle]);
  res.json(rows);
})

export default router