

CREATE TYPE type_depot          AS ENUM ('boutique', 'domicile');                                -- RG1
CREATE TYPE etat_objet          AS ENUM ('bon_etat', 'a_reparer', 'hors_service');               -- RG5
CREATE TYPE statut_objet        AS ENUM ('arrive', 'en_reparation', 'en_rayon', 'vendu', 'recycle'); -- RG6
CREATE TYPE resultat_reparation AS ENUM ('reussie', 'echouee');                                  -- RG8
CREATE TYPE mode_paiement       AS ENUM ('especes', 'carte', 'cheque');                          -- RG10



CREATE TABLE personne (
  id         SERIAL PRIMARY KEY,
  nom        VARCHAR(100) NOT NULL,
  prenom     VARCHAR(100) NOT NULL,
  telephone  VARCHAR(20),
  adherente  BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE benevole (
  id            SERIAL PRIMARY KEY,
  nom           VARCHAR(100) NOT NULL,
  prenom        VARCHAR(100) NOT NULL,
  telephone     VARCHAR(20),
  date_arrivee  DATE NOT NULL
);

CREATE TABLE competence (
  id       SERIAL PRIMARY KEY,
  libelle  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE categorie (
  id       SERIAL PRIMARY KEY,
  libelle  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE vente (
  id             SERIAL PRIMARY KEY,
  date_vente     DATE NOT NULL,
  mode_paiement  mode_paiement NOT NULL          -- RG10
);


CREATE TABLE depot (
  id           SERIAL PRIMARY KEY,
  date_depot   DATE NOT NULL,
  type         type_depot NOT NULL,             -- RG1
  personne_id  INTEGER NOT NULL REFERENCES personne(id)   -- RG2 : 1,1 côté dépôt
);

CREATE TABLE atelier (
  id           SERIAL PRIMARY KEY,
  intitule     VARCHAR(255) NOT NULL,
  date_debut   DATE NOT NULL,
  duree        NUMERIC(4,1) NOT NULL,
  places       INTEGER NOT NULL,
  benevole_id  INTEGER NOT NULL REFERENCES benevole(id)   -- RG12 : 1,1 côté atelier
);

CREATE TABLE benevole_competence (               -- R3 — RG11
  benevole_id    INTEGER NOT NULL REFERENCES benevole(id)   ON DELETE CASCADE,
  competence_id  INTEGER NOT NULL REFERENCES competence(id) ON DELETE CASCADE,
  PRIMARY KEY (benevole_id, competence_id)
);


-- ---------------------------------------------------------------------
--  Niveau 2 — dépend des niveaux 0 et 1
-- ---------------------------------------------------------------------

CREATE TABLE objet (
  id               SERIAL PRIMARY KEY,
  libelle          VARCHAR(255) NOT NULL,
  poids_kg         NUMERIC(6,2) NOT NULL,
  etat_arrivee     etat_objet NOT NULL,                      -- RG5
  statut           statut_objet NOT NULL DEFAULT 'arrive',   -- RG6
  prix             NUMERIC(8,2),
  date_mise_rayon  DATE,
  categorie_id     INTEGER NOT NULL REFERENCES categorie(id), -- RG4 : 1,1 côté objet
  depot_id         INTEGER NOT NULL REFERENCES depot(id),     -- RG3 : 1,1 côté objet
  vente_id         INTEGER          REFERENCES vente(id),     -- RG9 : 0,1 — NULLABLE
  prix_paye        NUMERIC(8,2)                               -- RG10 : attribut du lien objet-vente
);

CREATE TABLE inscription (                       -- R3 porteuse — RG13, RG14
  personne_id       INTEGER NOT NULL REFERENCES personne(id) ON DELETE CASCADE,
  atelier_id        INTEGER NOT NULL REFERENCES atelier(id)  ON DELETE CASCADE,
  date_inscription  DATE NOT NULL,
  presente          BOOLEAN NOT NULL DEFAULT false,           -- RG14
  PRIMARY KEY (personne_id, atelier_id)
);




CREATE TABLE reparation (                        -- entité, pas association — RG7
  id           SERIAL PRIMARY KEY,
  date_repa    DATE NOT NULL,
  duree_h      NUMERIC(4,1) NOT NULL,
  resultat     resultat_reparation NOT NULL,                 -- RG8
  objet_id     INTEGER NOT NULL REFERENCES objet(id),        -- RG7 : 1,1 côté réparation
  benevole_id  INTEGER NOT NULL REFERENCES benevole(id)      -- RG8 : 1,1 côté réparation
);
