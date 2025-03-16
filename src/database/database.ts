import path from "path";

import { is } from "@electron-toolkit/utils";
import sqlite from "better-sqlite3";

export default function database() {
  const dbPath = is.dev
    ? "./data.db"
    : path.join(process.resourcesPath, "./data.db");

  const DB = new sqlite(dbPath, {
    verbose: message => is.dev && console.log(message),
  });
  DB.pragma("journal_mode = WAL");
  DB.pragma("foreign_keys = ON");

  return DB;
}
