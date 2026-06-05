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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
}

export async function getSnippetsData() {
  // get the database connection
  const db = await database;

  // execute the query to count all snippets
  const result = await db.getFirstAsync<{ totalSnippets: number }>(
    'SELECT COUNT(*) as totalSnippets FROM snippets'
  );

  // get the total snippets count from the query result
  const totalSnippets = result?.totalSnippets ?? 0;

  // if there are no snippets, return 0 for both total snippets and storage used
  if (!totalSnippets) return { totalSnippets: 0, favouriteSnippets: 0, storageUsed: 0 };

  // get the file info of the database to calculate storage used
  const dbFileInfo = await db.serializeAsync();

  // return the total snippets count and storage used
  return { totalSnippets, favouriteSnippets: 0, storageUsed: dbFileInfo.byteLength };
}

export async function deleteAllSnippets() {
  // get the database connection
  const db = await database;

  // delete all snippets from the database
  await db.execAsync('DELETE FROM snippets');
}
