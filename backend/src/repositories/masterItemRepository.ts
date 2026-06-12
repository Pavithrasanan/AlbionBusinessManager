import { db } from "../db/database";

export interface MasterItem {
  unique_name: string;
  display_name: string;
  category: string | null;
  tier: number | null;
  enchantment: number;
}

export class MasterItemRepository {
  static insert(item: MasterItem): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO items
        (
          unique_name,
          display_name,
          category,
          tier,
          enchantment
        )
        VALUES (?, ?, ?, ?, ?)

        ON CONFLICT(unique_name)
        DO UPDATE SET
          display_name=excluded.display_name,
          category=excluded.category,
          tier=excluded.tier,
          enchantment=excluded.enchantment
        `,
        [
          item.unique_name,
          item.display_name,
          item.category,
          item.tier,
          item.enchantment,
        ],
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  }

  static count(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) AS total FROM items`,
        (err: any, row: any) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(row.total);
        }
      );
    });
  }
}