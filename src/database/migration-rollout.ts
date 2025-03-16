import fs from "fs";
import path from "path";

import { is } from "@electron-toolkit/utils";
import { Database } from "better-sqlite3";

import database from "./database";

const migrationsPath = is.dev
  ? "./resources/migrations"
  : path.join(process.resourcesPath, "./resources/migrations");

export default function migrationRollout(DB?: Database) {
  DB = DB ? DB : database();

  for (const filename of fs
    .readdirSync(path.join(migrationsPath, "rollout"))
    .sort((a, b) => a.localeCompare(b))) {
    const migration = fs.readFileSync(
      path.join(migrationsPath, "rollout", filename),
      {
        encoding: "utf-8",
      },
    );
    DB.exec(migration);
    fs.writeFileSync(path.join(migrationsPath, "version.txt"), filename, {
      encoding: "utf-8",
    });
    console.log(`Rollout: Ran migration ${filename}\n`);
  }
}
