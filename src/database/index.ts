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
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number    TEXT NOT NULL,
    total_amount      REAL DEFAULT 0,
    discount_amount   REAL DEFAULT 0,
    tax_amount        REAL DEFAULT 0,
    created_at        DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
  )
`);
query.run();

export default DB;
