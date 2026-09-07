-- =====================================================================
--  Adatabase — La Remise
--  seed.sql — jeu de données de référence
--
--  Les dates sont relatives à CURRENT_DATE : les requêtes de queries.sql
--  renvoient les mêmes résultats quelle que soit la date d'exécution.
--  Insertions dans l'ordre de l'arbre de dépendances.
-- =====================================================================

-- Niveau 0 ------------------------------------------------------------

INSERT INTO categorie (libelle) VALUES
  ('Mobilier'),
  ('Électroménager'),
  ('Vaisselle'),
  ('Textile'),
  ('Livres'),
  ('Jouets'),
  ('Outillage'),
  ('Décoration');

INSERT INTO competence (libelle) VALUES
  ('Électricité'),
  ('Couture'),
  ('Menuiserie'),
  ('Mécanique'),
  ('Informatique'),
  ('Peinture');

-- 22 personnes — donatrices, acheteuses et inscrites aux ateliers
INSERT INTO personne (nom, prenom, telephone, adherente) VALUES
  ('Bernard', 'Malika', '0648911302', true),
  ('Dubois', 'Camille', '0619820725', false),
  ('Moreau', 'Sofia', '0668105556', false),
  ('Laurent', 'Inès', '0699883355', true),
  ('Simon', 'Léa', '0612616959', false),
  ('Michel', 'Nour', '0660940199', false),
  ('Lefebvre', 'Chloé', '0699279902', true),
  ('Leroy', 'Anaïs', '0622613940', false),
  ('Roux', 'Yasmine', '0621990521', false),
  ('David', 'Manon', '0682679200', true),
  ('Bertrand', 'Amina', '0695618876', false),
  ('Morel', 'Julie', '0613102787', false),
  ('Fournier', 'Clara', '0635382387', true),
  ('Girard', 'Fatou', '0615407133', false),
  ('Bonnet', 'Élise', '0628765893', false),
  ('Dupont', 'Rania', '0665963846', true),
  ('Lambert', 'Maëlle', '0669879918', false),
  ('Fontaine', 'Sarah', '0624795097', false),
  ('Rousseau', 'Lucie', '0642210367', true),
  ('Vincent', 'Awa', '0632384191', false),
  ('Muller', 'Céline', '0673960627', false),
  ('Faure', 'Naïma', '0650643331', true);

-- 14 bénévoles
INSERT INTO benevole (nom, prenom, telephone, date_arrivee) VALUES
  ('Petit', 'Hélène', '0653895179', CURRENT_DATE - 120),
  ('Durand', 'Farida', '0613815891', CURRENT_DATE - 215),
  ('Leroux', 'Sonia', '0620438808', CURRENT_DATE - 310),
  ('Garnier', 'Béatrice', '0688664937', CURRENT_DATE - 405),
  ('Chevalier', 'Nadia', '0640047252', CURRENT_DATE - 500),
  ('Robin', 'Claire', '0665645499', CURRENT_DATE - 595),
  ('Masson', 'Myriam', '0699206530', CURRENT_DATE - 690),
  ('Blanc', 'Salomé', '0628672122', CURRENT_DATE - 785),
  ('Guerin', 'Isabelle', '0656833113', CURRENT_DATE - 880),
  ('Boyer', 'Karima', '0652193893', CURRENT_DATE - 975),
  ('Barbier', 'Véronique', '0629532300', CURRENT_DATE - 1070),
  ('Renard', 'Djamila', '0695966333', CURRENT_DATE - 1165),
  ('Colin', 'Agnès', '0640247540', CURRENT_DATE - 1260),
  ('Perrot', 'Louise', '0688850963', CURRENT_DATE - 1355);

-- 10 ventes
INSERT INTO vente (date_vente, mode_paiement) VALUES
  (CURRENT_DATE - 5, 'especes'),
  (CURRENT_DATE - 22, 'carte'),
  (CURRENT_DATE - 39, 'cheque'),
  (CURRENT_DATE - 56, 'especes'),
  (CURRENT_DATE - 73, 'carte'),
  (CURRENT_DATE - 90, 'cheque'),
  (CURRENT_DATE - 107, 'especes'),
  (CURRENT_DATE - 124, 'carte'),
  (CURRENT_DATE - 141, 'cheque'),
  (CURRENT_DATE - 158, 'especes');

-- Niveau 1 ------------------------------------------------------------

-- 30 dépôts. Les 6 premiers sont datés du mois dernier (requête Q1).
-- Chloé (id 7) en cumule 5 et Malika (id 1) 4 : elles ressortent en Q6.
INSERT INTO depot (date_depot, type, personne_id) VALUES
  ((date_trunc('month', CURRENT_DATE) - INTERVAL '1 month')::date + 0, 'boutique', 7),
  ((date_trunc('month', CURRENT_DATE) - INTERVAL '1 month')::date + 4, 'boutique', 1),
  ((date_trunc('month', CURRENT_DATE) - INTERVAL '1 month')::date + 8, 'boutique', 7),
  ((date_trunc('month', CURRENT_DATE) - INTERVAL '1 month')::date + 12, 'boutique', 1),
  ((date_trunc('month', CURRENT_DATE) - INTERVAL '1 month')::date + 16, 'boutique', 7),
  ((date_trunc('month', CURRENT_DATE) - INTERVAL '1 month')::date + 20, 'boutique', 3),
  (CURRENT_DATE - 40, 'boutique', 7),
  (CURRENT_DATE - 51, 'boutique', 1),
  (CURRENT_DATE - 62, 'boutique', 7),
  (CURRENT_DATE - 73, 'boutique', 1),
  (CURRENT_DATE - 84, 'boutique', 2),
  (CURRENT_DATE - 95, 'boutique', 3),
  (CURRENT_DATE - 106, 'domicile', 4),
  (CURRENT_DATE - 117, 'boutique', 5),
  (CURRENT_DATE - 128, 'boutique', 6),
  (CURRENT_DATE - 139, 'domicile', 8),
  (CURRENT_DATE - 150, 'boutique', 9),
  (CURRENT_DATE - 161, 'boutique', 10),
  (CURRENT_DATE - 172, 'boutique', 11),
  (CURRENT_DATE - 183, 'domicile', 12),
  (CURRENT_DATE - 194, 'boutique', 13),
  (CURRENT_DATE - 205, 'boutique', 14),
  (CURRENT_DATE - 216, 'boutique', 15),
  (CURRENT_DATE - 227, 'domicile', 16),
  (CURRENT_DATE - 238, 'boutique', 17),
  (CURRENT_DATE - 249, 'boutique', 18),
  (CURRENT_DATE - 260, 'boutique', 19),
  (CURRENT_DATE - 271, 'domicile', 20),
  (CURRENT_DATE - 282, 'boutique', 21),
  (CURRENT_DATE - 293, 'boutique', 22);

-- Compétences des bénévoles — 4 possèdent « Électricité » (requête Q9)
INSERT INTO benevole_competence (benevole_id, competence_id) VALUES
  (1, 1),
  (1, 3),
  (2, 2),
  (3, 1),
  (3, 6),
  (4, 3),
  (5, 4),
  (6, 2),
  (7, 1),
  (7, 2),
  (8, 5),
  (9, 3),
  (10, 6),
  (11, 1),
  (12, 2),
  (13, 4),
  (14, 5);

-- 4 ateliers
INSERT INTO atelier (intitule, date_debut, duree, places, benevole_id) VALUES
  ('Réparer un grille-pain', CURRENT_DATE - 60, 3.0, 8, 1),
  ('Initiation à la couture', CURRENT_DATE - 45, 4.0, 10, 2),
  ('Entretenir son vélo', CURRENT_DATE - 30, 3.5, 8, 5),
  ('Rénover un meuble', CURRENT_DATE - 15, 5.0, 6, 4);

-- Niveau 2 ------------------------------------------------------------

-- 79 objets : 8 arrivés, 6 en réparation, 32 en rayon, 22 vendus, 11 recyclés
-- Poids total 1118,9 kg dont 97,9 kg recyclés → 1021,0 kg détournés (Q7)
INSERT INTO objet (libelle, poids_kg, etat_arrivee, statut, prix, date_mise_rayon, categorie_id, depot_id, vente_id, prix_paye) VALUES
  ('Jeu de tournevis', 4.3, 'bon_etat', 'recycle', NULL, NULL, 7, 1, NULL, NULL),
  ('Set de couverts', 5.0, 'a_reparer', 'recycle', NULL, NULL, 3, 2, NULL, NULL),
  ('Bouilloire', 6.6, 'hors_service', 'recycle', NULL, NULL, 2, 3, NULL, NULL),
  ('Cafetière italienne', 14.4, 'bon_etat', 'recycle', NULL, NULL, 2, 4, NULL, NULL),
  ('Perceuse filaire', 12.8, 'a_reparer', 'recycle', NULL, NULL, 7, 5, NULL, NULL),
  ('Train en bois', 10.0, 'hors_service', 'recycle', NULL, NULL, 6, 6, NULL, NULL),
  ('Tabouret bar', 5.7, 'bon_etat', 'recycle', NULL, NULL, 1, 7, NULL, NULL),
  ('Livres de cuisine', 11.8, 'a_reparer', 'recycle', NULL, NULL, 5, 8, NULL, NULL),
  ('Lot romans policiers', 11.0, 'hors_service', 'recycle', NULL, NULL, 5, 9, NULL, NULL),
  ('Fauteuil crapaud', 11.6, 'bon_etat', 'recycle', NULL, NULL, 1, 10, NULL, NULL),
  ('Chaise en bois', 4.7, 'a_reparer', 'recycle', NULL, NULL, 1, 11, NULL, NULL),
  ('Plaid polaire', 20.3, 'hors_service', 'arrive', NULL, NULL, 4, 12, NULL, NULL),
  ('Cubes bois', 17.0, 'bon_etat', 'arrive', NULL, NULL, 6, 13, NULL, NULL),
  ('Fer à repasser', 32.8, 'a_reparer', 'arrive', NULL, NULL, 2, 14, NULL, NULL),
  ('Horloge murale', 10.9, 'hors_service', 'arrive', NULL, NULL, 8, 15, NULL, NULL),
  ('Ballon de basket', 10.3, 'bon_etat', 'arrive', NULL, NULL, 6, 16, NULL, NULL),
  ('Puzzle 1000 pièces', 5.8, 'a_reparer', 'arrive', NULL, NULL, 6, 17, NULL, NULL),
  ('Marteau charpentier', 11.3, 'hors_service', 'arrive', NULL, NULL, 7, 18, NULL, NULL),
  ('Commode 3 tiroirs', 18.4, 'bon_etat', 'arrive', NULL, NULL, 1, 19, NULL, NULL),
  ('Trottinette', 35.0, 'a_reparer', 'en_reparation', NULL, NULL, 6, 20, NULL, NULL),
  ('Peluche ours', 25.2, 'a_reparer', 'en_reparation', NULL, NULL, 6, 21, NULL, NULL),
  ('Lot de 6 assiettes', 19.0, 'a_reparer', 'en_reparation', NULL, NULL, 3, 22, NULL, NULL),
  ('Guirlande lumineuse', 7.1, 'a_reparer', 'en_reparation', NULL, NULL, 8, 23, NULL, NULL),
  ('Clé à molette', 29.3, 'a_reparer', 'en_reparation', NULL, NULL, 7, 24, NULL, NULL),
  ('Niveau à bulle', 16.8, 'a_reparer', 'en_reparation', NULL, NULL, 7, 25, NULL, NULL),
  ('Coussin velours', 12.8, 'a_reparer', 'en_rayon', 24.76, CURRENT_DATE - 45, 4, 26, NULL, NULL),
  ('Cocotte en fonte', 4.5, 'hors_service', 'en_rayon', 10.65, CURRENT_DATE - 46, 3, 27, NULL, NULL),
  ('Lampe champignon', 3.4, 'bon_etat', 'en_rayon', 8.78, CURRENT_DATE - 47, 8, 28, NULL, NULL),
  ('Tapis kilim', 4.5, 'a_reparer', 'en_rayon', 10.65, CURRENT_DATE - 284, 8, 29, NULL, NULL),
  ('Rideaux lin', 5.6, 'hors_service', 'en_rayon', 12.52, CURRENT_DATE - 49, 4, 30, NULL, NULL),
  ('Escabeau 3 marches', 15.4, 'bon_etat', 'en_rayon', 29.18, CURRENT_DATE - 50, 7, 1, NULL, NULL),
  ('Vase céramique', 9.2, 'a_reparer', 'en_rayon', 18.64, CURRENT_DATE - 51, 8, 2, NULL, NULL),
  ('Manuels scolaires', 31.4, 'hors_service', 'en_rayon', 56.38, CURRENT_DATE - 296, 5, 3, NULL, NULL),
  ('Pichet en grès', 3.3, 'bon_etat', 'en_rayon', 8.61, CURRENT_DATE - 53, 3, 4, NULL, NULL),
  ('Robe été', 10.6, 'a_reparer', 'en_rayon', 21.02, CURRENT_DATE - 54, 4, 5, NULL, NULL),
  ('Bougeoir laiton', 17.7, 'hors_service', 'en_rayon', 33.09, CURRENT_DATE - 55, 8, 6, NULL, NULL),
  ('Dînette', 22.5, 'bon_etat', 'en_rayon', 41.25, CURRENT_DATE - 308, 6, 7, NULL, NULL),
  ('BD Astérix', 2.3, 'a_reparer', 'en_rayon', 6.91, CURRENT_DATE - 57, 5, 8, NULL, NULL),
  ('Scie sauteuse', 4.8, 'hors_service', 'en_rayon', 11.16, CURRENT_DATE - 58, 7, 9, NULL, NULL),
  ('Cadre photo', 7.5, 'bon_etat', 'en_rayon', 15.75, CURRENT_DATE - 59, 8, 10, NULL, NULL),
  ('Poésie complète', 23.9, 'a_reparer', 'en_rayon', 43.63, CURRENT_DATE - 320, 5, 11, NULL, NULL),
  ('Buffet vintage', 6.9, 'hors_service', 'en_rayon', 14.73, CURRENT_DATE - 61, 1, 12, NULL, NULL),
  ('Moule à tarte', 12.3, 'bon_etat', 'en_rayon', 23.91, CURRENT_DATE - 62, 3, 13, NULL, NULL),
  ('Poupée ancienne', 15.5, 'a_reparer', 'en_rayon', 29.35, CURRENT_DATE - 63, 6, 14, NULL, NULL),
  ('Établi pliant', 9.7, 'hors_service', 'en_rayon', 19.49, CURRENT_DATE - 332, 7, 15, NULL, NULL),
  ('Ponceuse', 27.8, 'bon_etat', 'en_rayon', 50.26, CURRENT_DATE - 65, 7, 16, NULL, NULL),
  ('Bureau écolier', 16.2, 'a_reparer', 'en_rayon', 30.54, CURRENT_DATE - 66, 1, 17, NULL, NULL),
  ('Veste jean', 3.1, 'hors_service', 'en_rayon', 8.27, CURRENT_DATE - 67, 4, 18, NULL, NULL),
  ('Housse de couette', 20.2, 'bon_etat', 'en_rayon', 37.34, CURRENT_DATE - 344, 4, 19, NULL, NULL),
  ('Banc de jardin', 18.2, 'a_reparer', 'en_rayon', 33.94, CURRENT_DATE - 69, 1, 20, NULL, NULL),
  ('Manteau laine', 4.9, 'hors_service', 'en_rayon', 11.33, CURRENT_DATE - 70, 4, 21, NULL, NULL),
  ('Caisse à outils', 26.9, 'bon_etat', 'en_rayon', 48.73, CURRENT_DATE - 71, 7, 22, NULL, NULL),
  ('Jeu de société', 7.3, 'a_reparer', 'en_rayon', 15.41, CURRENT_DATE - 356, 6, 23, NULL, NULL),
  ('Suspension rotin', 23.6, 'hors_service', 'en_rayon', 43.12, CURRENT_DATE - 73, 8, 24, NULL, NULL),
  ('Plat à gratin', 3.3, 'bon_etat', 'en_rayon', 8.61, CURRENT_DATE - 74, 3, 25, NULL, NULL),
  ('Romans jeunesse', 39.1, 'a_reparer', 'en_rayon', 69.47, CURRENT_DATE - 75, 5, 26, NULL, NULL),
  ('Miroir doré', 6.9, 'hors_service', 'en_rayon', 14.73, CURRENT_DATE - 368, 8, 27, NULL, NULL),
  ('Théière émaillée', 40.1, 'bon_etat', 'vendu', 71.17, CURRENT_DATE - 117, 3, 28, 1, 64.05),
  ('Saladier en verre', 11.7, 'a_reparer', 'vendu', 22.89, CURRENT_DATE - 118, 3, 29, 2, 20.6),
  ('Table basse', 36.8, 'hors_service', 'vendu', 65.56, CURRENT_DATE - 119, 1, 30, 3, 59.0),
  ('Beaux livres art', 3.5, 'bon_etat', 'vendu', 8.95, CURRENT_DATE - 120, 5, 1, 4, 8.05),
  ('Grille-pain', 20.3, 'a_reparer', 'vendu', 37.51, CURRENT_DATE - 121, 2, 2, 5, 33.76),
  ('Atlas géographique', 10.0, 'hors_service', 'vendu', 20.0, CURRENT_DATE - 122, 5, 3, 6, 18.0),
  ('Étagère Billy', 8.1, 'bon_etat', 'vendu', 16.77, CURRENT_DATE - 123, 1, 4, 7, 15.09),
  ('Nappe brodée', 2.0, 'a_reparer', 'vendu', 6.4, CURRENT_DATE - 124, 4, 5, 8, 5.76),
  ('Radiateur soufflant', 4.3, 'hors_service', 'vendu', 10.31, CURRENT_DATE - 125, 2, 6, 9, 9.28),
  ('Dictionnaire illustré', 14.8, 'bon_etat', 'vendu', 28.16, CURRENT_DATE - 126, 5, 7, 10, 25.34),
  ('Tablier de cuisine', 26.3, 'a_reparer', 'vendu', 47.71, CURRENT_DATE - 127, 4, 8, 1, 42.94),
  ('Circuit voitures', 24.2, 'hors_service', 'vendu', 44.14, CURRENT_DATE - 128, 6, 9, 2, 39.73),
  ('Encyclopédie 12 vol.', 1.9, 'bon_etat', 'vendu', 6.23, CURRENT_DATE - 129, 5, 10, 3, 5.61),
  ('Porte-manteau', 10.0, 'a_reparer', 'vendu', 20.0, CURRENT_DATE - 130, 1, 11, 4, 18.0),
  ('Robot ménager', 7.7, 'hors_service', 'vendu', 16.09, CURRENT_DATE - 131, 2, 12, 5, 14.48),
  ('Micro-ondes', 34.3, 'bon_etat', 'vendu', 61.31, CURRENT_DATE - 132, 2, 13, 6, 55.18),
  ('Mixeur plongeant', 24.2, 'a_reparer', 'vendu', 44.14, CURRENT_DATE - 133, 2, 14, 7, 39.73),
  ('Ventilateur sur pied', 14.1, 'hors_service', 'vendu', 26.97, CURRENT_DATE - 134, 2, 15, 8, 24.27),
  ('Aspirateur traîneau', 20.7, 'bon_etat', 'vendu', 38.19, CURRENT_DATE - 135, 2, 16, 9, 34.37),
  ('Paravent bois', 14.4, 'a_reparer', 'vendu', 27.48, CURRENT_DATE - 136, 8, 17, 10, 24.73),
  ('Écharpe tricot', 3.0, 'hors_service', 'vendu', 8.1, CURRENT_DATE - 137, 4, 18, 1, 7.29),
  ('Service à thé', 8.1, 'bon_etat', 'vendu', 16.77, CURRENT_DATE - 138, 3, 19, 2, 15.09);

-- 31 inscriptions dont 23 présentes → taux de présence 74,2 % (Q8)
INSERT INTO inscription (personne_id, atelier_id, date_inscription, presente) VALUES
  (1, 1, CURRENT_DATE - 65, true),
  (2, 1, CURRENT_DATE - 65, true),
  (3, 1, CURRENT_DATE - 65, true),
  (4, 1, CURRENT_DATE - 65, true),
  (5, 1, CURRENT_DATE - 65, true),
  (6, 1, CURRENT_DATE - 65, true),
  (7, 1, CURRENT_DATE - 65, true),
  (8, 1, CURRENT_DATE - 65, true),
  (9, 2, CURRENT_DATE - 60, true),
  (10, 2, CURRENT_DATE - 60, true),
  (11, 2, CURRENT_DATE - 60, true),
  (12, 2, CURRENT_DATE - 60, true),
  (13, 2, CURRENT_DATE - 60, true),
  (14, 2, CURRENT_DATE - 60, true),
  (15, 2, CURRENT_DATE - 60, true),
  (16, 2, CURRENT_DATE - 60, true),
  (17, 2, CURRENT_DATE - 60, true),
  (18, 3, CURRENT_DATE - 55, true),
  (19, 3, CURRENT_DATE - 55, true),
  (20, 3, CURRENT_DATE - 55, true),
  (21, 3, CURRENT_DATE - 55, true),
  (22, 3, CURRENT_DATE - 55, true),
  (1, 3, CURRENT_DATE - 55, true),
  (2, 3, CURRENT_DATE - 55, false),
  (3, 4, CURRENT_DATE - 50, false),
  (4, 4, CURRENT_DATE - 50, false),
  (5, 4, CURRENT_DATE - 50, false),
  (6, 4, CURRENT_DATE - 50, false),
  (7, 4, CURRENT_DATE - 50, false),
  (8, 4, CURRENT_DATE - 50, false),
  (9, 4, CURRENT_DATE - 50, false);

-- Niveau 3 ------------------------------------------------------------

-- 25 réparations, 16 réussies → taux global 64,0 % (Q5)
-- Total 144,1 heures, toutes datées de l'année en cours (Q4)
-- L'objet 12 en compte 3 : c'est le cas qui impose REPARATION en entité (RG7)
INSERT INTO reparation (date_repa, duree_h, resultat, objet_id, benevole_id) VALUES
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 0), 4.2, 'reussie', 12, 1),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 11), 6.6, 'reussie', 12, 2),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 22), 4.3, 'reussie', 12, 3),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 33), 2.1, 'reussie', 20, 4),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 44), 10.6, 'reussie', 21, 5),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 55), 9.5, 'reussie', 22, 6),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 66), 9.5, 'reussie', 23, 7),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 77), 6.2, 'reussie', 24, 8),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 88), 5.8, 'reussie', 25, 9),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 99), 3.4, 'reussie', 26, 10),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 110), 3.9, 'reussie', 30, 11),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 121), 8.7, 'reussie', 31, 12),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 132), 3.1, 'reussie', 32, 13),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 143), 3.7, 'reussie', 33, 14),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 154), 6.2, 'reussie', 34, 1),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 165), 4.8, 'reussie', 35, 2),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 176), 3.4, 'echouee', 40, 3),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 187), 4.6, 'echouee', 41, 4),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 198), 2.1, 'echouee', 42, 5),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 209), 8.7, 'echouee', 43, 6),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 220), 1.6, 'echouee', 44, 7),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 231), 11.8, 'echouee', 45, 8),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 242), 9.8, 'echouee', 50, 9),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 253), 6.2, 'echouee', 51, 10),
  (LEAST(CURRENT_DATE, date_trunc('year', CURRENT_DATE)::date + 264), 3.3, 'echouee', 52, 11);