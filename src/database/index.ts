import sqlite from "better-sqlite3";
import { is } from "@electron-toolkit/utils";
import path from "path";

const dbPath = is.dev
  ? "./data.db"
  : path.join(process.resourcesPath, "./data.db");
const DB = new sqlite(dbPath, {
  verbose: message => is.dev && console.log(message),
});
DB.pragma("journal_mode = WAL");

// RUN MIGRATIONS
const query = DB.prepare(`
  CREATE TABLE IF NOT EXISTS sales (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    total   REAL DEFAULT 0
  )
`);
query.run();

export default DB;
