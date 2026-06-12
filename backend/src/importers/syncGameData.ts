import { ImportStatus } from "../types/importStatus";

async function syncGameData() {
  const status: ImportStatus = {
    items: 0,
    recipes: 0,
    ingredients: 0,
    startedAt: new Date(),
  };

  console.log("================================");
  console.log("Albion Business Manager");
  console.log("================================");

  console.log("Starting synchronization...");
  console.log("");

  // download
  // extract
  // import items
  // import recipes
  // import ingredients

  status.finishedAt = new Date();

  console.log("");
  console.log("Synchronization finished");
  console.log(status);
}

syncGameData().catch((err) => {
  console.error(err);
  process.exit(1);
});