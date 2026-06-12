
import sqlite3 from "sqlite3";
import path from "path";

sqlite3.verbose();

const databasePath = path.join(
  process.cwd(),
  "albion.db"
);

export const db = new sqlite3.Database(
  databasePath,
  (err) => {
    if (err) {
      console.error(
        "❌ Failed to connect to SQLite:",
        err.message
      );
      return;
    }

    console.log(
      "✅ Connected to SQLite database"
    );

    initializeDatabase();
  }
);

function initializeDatabase() {
  db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");

    // ===========================
    // Tracked Items
    // ===========================

    db.run(`
      CREATE TABLE IF NOT EXISTS tracked_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        unique_name TEXT UNIQUE NOT NULL,

        enabled INTEGER DEFAULT 1,

        priority INTEGER DEFAULT 0,

        category TEXT
      )
    `);
    // ===========================
// Master Items
// ===========================

db.run(`
  CREATE TABLE IF NOT EXISTS items (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    unique_name TEXT UNIQUE NOT NULL,

    display_name TEXT,

    category TEXT,

    tier INTEGER,

    enchantment INTEGER DEFAULT 0
  )
`);

    // ===========================
    // Latest Market State
    // ===========================

    db.run(`
      CREATE TABLE IF NOT EXISTS items_latest (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        unique_name TEXT NOT NULL,

        city TEXT NOT NULL,

        quality INTEGER NOT NULL,

        buy_price INTEGER NOT NULL,

        sell_price INTEGER NOT NULL,

        updated_at TEXT,

        UNIQUE(
          unique_name,
          city,
          quality
        )
      )
    `);

    // ===========================
    // History
    // ===========================

    db.run(`
      CREATE TABLE IF NOT EXISTS market_history (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        unique_name TEXT NOT NULL,

        city TEXT NOT NULL,

        quality INTEGER NOT NULL,

        buy_price INTEGER NOT NULL,

        sell_price INTEGER NOT NULL,

        snapshot_time DATETIME
        DEFAULT CURRENT_TIMESTAMP
      )
    `);
    // ===========================
// Market Statistics
// ===========================

db.run(`
CREATE TABLE IF NOT EXISTS market_statistics (

id INTEGER PRIMARY KEY AUTOINCREMENT,

unique_name TEXT NOT NULL,

city TEXT NOT NULL,

quality INTEGER NOT NULL,

avg_buy_24h REAL DEFAULT 0,

avg_sell_24h REAL DEFAULT 0,

avg_buy_7d REAL DEFAULT 0,

avg_sell_7d REAL DEFAULT 0,

avg_buy_30d REAL DEFAULT 0,

avg_sell_30d REAL DEFAULT 0,

min_buy REAL DEFAULT 0,

max_sell REAL DEFAULT 0,

snapshots INTEGER DEFAULT 0,

trend TEXT DEFAULT 'UNKNOWN',

score REAL DEFAULT 0,

updated_at DATETIME
DEFAULT CURRENT_TIMESTAMP,

UNIQUE(
unique_name,
city,
quality
)

)
`);
// ===========================
// Recipes
// ===========================

db.run(`
CREATE TABLE IF NOT EXISTS recipes (

id INTEGER PRIMARY KEY AUTOINCREMENT,

item_unique_name TEXT UNIQUE NOT NULL,

display_name TEXT,

craft_amount INTEGER DEFAULT 1,

focus_cost INTEGER DEFAULT 0

)
`);
// ===========================
// Recipe Ingredients
// ===========================

db.run(`
CREATE TABLE IF NOT EXISTS recipe_ingredients (

id INTEGER PRIMARY KEY AUTOINCREMENT,

recipe_item TEXT NOT NULL,

ingredient_item TEXT NOT NULL,

quantity INTEGER NOT NULL

)
`);
// ===========================
// Recipe Ingredients
// ===========================

db.run(`
CREATE TABLE IF NOT EXISTS recipe_ingredients (

id INTEGER PRIMARY KEY AUTOINCREMENT,

recipe_item TEXT NOT NULL,

ingredient_item TEXT NOT NULL,

quantity INTEGER NOT NULL

)
`);
// ===========================
// Crafting Stations
// ===========================

db.run(`
CREATE TABLE IF NOT EXISTS crafting_stations (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT UNIQUE NOT NULL

)
`);

    // ===========================
    // Favorites
    // ===========================

    db.run(`
      CREATE TABLE IF NOT EXISTS favorites (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        unique_name TEXT UNIQUE NOT NULL
      )
    `);

    // ===========================
    // Watchlist
    // ===========================

    db.run(`
      CREATE TABLE IF NOT EXISTS watchlist (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        unique_name TEXT UNIQUE NOT NULL,

        target_price INTEGER NOT NULL
      )
    `);

    // ===========================
    // Settings
    // ===========================

    db.run(`
      CREATE TABLE IF NOT EXISTS settings (

        key TEXT PRIMARY KEY,

        value TEXT
      )
    `);

    // ===========================
    // Indexes
    // ===========================

    db.run(`
      CREATE INDEX IF NOT EXISTS idx_latest
      ON items_latest(
        unique_name,
        city,
        quality
      )
    `);
    db.run(`
  CREATE INDEX IF NOT EXISTS idx_items
  ON items(
    unique_name
  )
`);
db.run(`
CREATE INDEX IF NOT EXISTS idx_statistics
ON market_statistics(
unique_name,
city,
quality
)
`);
db.run(`
CREATE INDEX IF NOT EXISTS idx_recipe
ON recipes(
item_unique_name
)
`);

db.run(`
CREATE INDEX IF NOT EXISTS idx_recipe_ing
ON recipe_ingredients(
recipe_item
)
`);

    db.run(`
      CREATE INDEX IF NOT EXISTS idx_history
      ON market_history(
        unique_name,
        snapshot_time
      )
    `);

    db.run(`
      CREATE INDEX IF NOT EXISTS idx_tracked
      ON tracked_items(
        enabled,
        priority
      )
    `);

    console.log(
      "✅ Database initialized successfully"
    );
  });
}

