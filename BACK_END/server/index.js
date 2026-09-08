import cors from 'cors';
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

import { objets } from "./db_objet.js"; 
import categoriesRouter from "./routes/categories.js";
import objetsRouter from "./routes/objets.js";
import personnesRouter from "./routes/personnes.js";
import depotRouter from "./routes/depots.js";
import statsRouter from "./routes/stats.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/categories", categoriesRouter);
app.use("/api/objets", objetsRouter);
app.use("/api/personnes", personnesRouter);
app.use("/api/depots", depotRouter);
app.use("/api/stats", statsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erreur: "Erreur interne du serveur" });
});

app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
  console.log("Swagger dispo sur http://localhost:3000/api-docs");
});

app.use(cors());