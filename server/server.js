import express from "express";
import initDB from "./database.js";

const app = express();
const PORT = 3000;

console.log("🟢 Démarrage du serveur...");

// Initialiser la base de données
let db;
initDB()
    .then((database) => {
        db = database;
        console.log("✅ Base de données SQLite initialisée.");
    })
    .catch((err) => {
        console.error("❌ Erreur lors de l'initialisation de la base :", err);
    });

app.get("/", (req, res) => {
    res.send("✅ Serveur Express avec SQLite fonctionne !");
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
