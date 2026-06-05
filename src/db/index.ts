// external-imports
import * as SQLite from 'expo-sqlite';

// open the database connection
const database = SQLite.openDatabaseAsync('devsnippets.db');

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
    favourite INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
}

export async function getSnippetsData() {
  // get the database connection
  const db = await database;

  // execute the query to get all snippets
  const [query] = await db.getAllAsync<{
    totalSnippets: number;
    favouriteSnippets: number;
  }>(
    `SELECT COUNT(*) as totalSnippets, COALESCE(SUM(favourite), 0) as favouriteSnippets FROM snippets`
  );

  // get the file info of the database to calculate storage used
  const dbFileInfo = await db.serializeAsync();

  // return the calculated data
  return {
    totalSnippets: query!.totalSnippets,
    favouriteSnippets: query!.favouriteSnippets,
    storageUsed: dbFileInfo.byteLength,
  };
}

export async function deleteAllSnippets() {
  // get the database connection
  const db = await database;

  // delete all snippets from the database
  await db.execAsync('DELETE FROM snippets');
}
