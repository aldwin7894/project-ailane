import database from "./database";
import migrationRollback from "./migration-rollback";
import migrationRollout from "./migration-rollout";

const DB = database();

// RUN MIGRATIONS
migrationRollout(DB);

export default DB;
export { migrationRollout, migrationRollback };
