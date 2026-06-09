// external-imports
import * as SQLite from 'expo-sqlite';

// type-imports
import type { Snippet, SnippetPreview, SnippetsCount, StoredSnippet } from '@/types/snippet';

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

export async function getSnippetsCount() {
  // get the database connection
  const db = await database;

  // execute the query to get all snippets
  const [query] = await db.getAllAsync<SnippetsCount>(
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

export async function getAllSnippets() {
  // get the database connection
  const db = await database;

  // execute the query to get all snippets
  return await db.getAllAsync<SnippetPreview>(
    `SELECT id, title, language, favourite, created_at FROM snippets ORDER BY created_at DESC`
  );
}

export async function getSnippet(id: number) {
  // get the database connection
  const db = await database;

  // execute the query to get the snippet with the specified id
  return await db.getFirstAsync<StoredSnippet>(`SELECT * FROM snippets WHERE id = ?`, [id]);
}

export async function createSnippet(data: Snippet) {
  // get the database connection
  const db = await database;

  // insert the new snippet into the database
  const query = await db.runAsync(
    `INSERT INTO snippets (title, code, language, tags, favourite) VALUES (?, ?, ?, ?, ?)`,
    [data.title, data.code, data.language, data.tags ?? null, data.favourite ? 1 : 0]
  );

  // return the id of the newly created snippet
  return query.lastInsertRowId;
}

export async function updateSnippet({ id, data }: { id: number; data: Snippet }) {
  // get the database connection
  const db = await database;

  // update the snippet with the specified id in the database
  await db.runAsync(
    `UPDATE snippets SET title = ?, code = ?, language = ?, tags = ?, favourite = ? WHERE id = ?`,
    [data.title, data.code, data.language, data.tags ?? null, data.favourite ? 1 : 0, id]
  );
}

export async function deleteSnippet(id: number) {
  // get the database connection
  const db = await database;

  // delete the snippet with the specified id from the database
  await db.runAsync(`DELETE FROM snippets WHERE id = ?`, [id]);
}
