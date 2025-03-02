import fs from "fs";
import path from "path";

import { is } from "@electron-toolkit/utils";
import sqlite from "better-sqlite3";

const dbPath = is.dev
  ? "./data.db"
  : path.join(process.resourcesPath, "./data.db");
const migrationsPath = is.dev
  ? "./resources/migrations"
  : path.join(process.resourcesPath, "./resources/migrations");
const DB = new sqlite(dbPath, {
  verbose: message => is.dev && console.log(message),
});
DB.pragma("journal_mode = WAL");
DB.pragma("foreign_keys = ON");

// RUN MIGRATIONS
for (const filename of fs.readdirSync(migrationsPath)) {
  const migration = fs.readFileSync(path.join(migrationsPath, filename), {
    encoding: "utf-8",
  });
  DB.exec(migration);
}

export default DB;
