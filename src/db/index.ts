// external-imports
import * as SQLite from 'expo-sqlite';

// open the database connection
export const database = SQLite.openDatabaseAsync('devsnippets.db');

export async function initDB() {
  // get the database connection
  const db = await database;

  // create the snippets table if it doesn't exist
  await db.execAsync(`CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
}
