import { db } from "../db/database";

export interface SearchItem {
  unique_name: string;
  display_name: string;
  category: string | null;
  tier: number | null;
  enchantment: number;
}

export class SearchRepository {
  static search(
    query: string,
    limit = 50
  ): Promise<SearchItem[]> {
    return new Promise((resolve, reject) => {
      const q = query.trim().toLowerCase();

      db.all(
        `
        SELECT
          unique_name,
          display_name,
          category,
          tier,
          enchantment
        FROM items
        WHERE
          LOWER(display_name) LIKE ?
          OR LOWER(unique_name) LIKE ?
        `,
        [
          `%${q}%`,
          `%${q}%`
        ],
        (err, rows: any[]) => {
          if (err) {
            reject(err);
            return;
          }

          const seen = new Set<string>();

          const result = rows
            .filter((item) => {
              const u = item.unique_name.toUpperCase();

              return !(
                u.includes("LOOTBAG") ||
                u.includes("SILVERBAG") ||
                u.includes("NONTRADABLE") ||
                u.includes("TOKEN") ||
                u.includes("QUEST") ||
                u.includes("TEST")
              );
            })
            .sort((a, b) => {
              const aStarts = a.display_name.toLowerCase().startsWith(q);
              const bStarts = b.display_name.toLowerCase().startsWith(q);

              if (aStarts && !bStarts) return -1;
              if (!aStarts && bStarts) return 1;

              return (a.tier ?? 99) - (b.tier ?? 99);
            })
            .filter((item) => {
              if (seen.has(item.display_name)) {
                return false;
              }
              seen.add(item.display_name);
              return true;
            })
            .slice(0, limit);

          resolve(result);
        }
      );
    });
  }
}