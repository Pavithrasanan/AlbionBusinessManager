import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

sqlite3.verbose();

const db = new sqlite3.Database(
  path.join(process.cwd(), "albion.db")
);

const itemsPath = path.join(
  process.cwd(),
  "..",
  "frontend",
  "data",
  "items.json"
);

const items = JSON.parse(
  fs.readFileSync(itemsPath, "utf8")
);

db.serialize(() => {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO tracked_items
    (
      unique_name,
      enabled,
      priority,
      category
    )
    VALUES (?, 1, 0, ?)
  `);

  let count = 0;

  for (const item of items) {
    stmt.run(
      item.uniqueName,
      item.category ?? "Unknown"
    );

    count++;
  }

  stmt.finalize();

  console.log(
    `✅ Loaded ${count} tracked items`
  );

  db.close();
});