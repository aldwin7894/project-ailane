import fs from "fs";
import path from "path";

import { is } from "@electron-toolkit/utils";
import { Database } from "better-sqlite3";

import database from "./database";

const migrationsPath = is.dev
  ? "./resources/migrations"
  : path.join(process.resourcesPath, "./resources/migrations");

export default function migrationRollback(DB?: Database) {
  DB = DB ? DB : database();

  const lastMigration = fs.readFileSync(
    path.join(migrationsPath, "version.txt"),
    {
      encoding: "utf-8",
    },
  );

  console.log(lastMigration);
  if (lastMigration.length < 1) {
    return console.log("No migrations to rollback");
  }

  const migration = fs.readFileSync(
    path.join(migrationsPath, "rollback", lastMigration),
    {
      encoding: "utf-8",
    },
  );
  DB.exec(migration);

  const filenames = fs
    .readdirSync(path.join(migrationsPath, "rollback"))
    .sort((a, b) => a.localeCompare(b));
  const currentVersion = filenames?.[filenames.indexOf(lastMigration) - 1];
  fs.writeFileSync(
    path.join(migrationsPath, "version.txt"),
    currentVersion ?? "",
    {
      encoding: "utf-8",
    },
  );
  console.log(`Rollback: Ran migration ${lastMigration}\n`);
}
