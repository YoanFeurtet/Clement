import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// Gérer les chemins en mode ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le chemin absolu pour éviter l'erreur SQLITE_CANTOPEN
const dbPath = path.join(__dirname, "database.sqlite");

async function initDB() {
  const db = await open({
    filename: dbPath, // Chemin absolu du fichier SQLite
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log(`✅ Base de données SQLite initialisée à : ${dbPath}`);
  return db;
}

export default initDB;
