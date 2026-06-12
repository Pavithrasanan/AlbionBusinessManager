import { db } from "../db/database";

export interface LatestItem {
  unique_name: string;
  city: string;
  quality: number;
  buy_price: number;
  sell_price: number;
  updated_at: string;
}

export class ItemRepository {
  static getTrackedItems(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT unique_name
        FROM tracked_items
        WHERE enabled = 1
        ORDER BY priority DESC
        `,
        [],
        (err, rows: any[]) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(rows.map((r) => r.unique_name));
        }
      );
    });
  }

  static getLatestItem(
    unique_name: string,
    city: string,
    quality: number
  ): Promise<LatestItem | null> {
    return new Promise((resolve, reject) => {
      db.get(
        `
        SELECT *
        FROM items_latest
        WHERE
          unique_name = ?
          AND city = ?
          AND quality = ?
        `,
        [unique_name, city, quality],
        (err, row: any) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(row ?? null);
        }
      );
    });
  }

  static upsertLatestItem(
    item: LatestItem
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO items_latest
        (
          unique_name,
          city,
          quality,
          buy_price,
          sell_price,
          updated_at
        )
        VALUES
        (?, ?, ?, ?, ?, ?)

        ON CONFLICT(
          unique_name,
          city,
          quality
        )

        DO UPDATE SET
          buy_price = excluded.buy_price,
          sell_price = excluded.sell_price,
          updated_at = excluded.updated_at
        `,
        [
          item.unique_name,
          item.city,
          item.quality,
          item.buy_price,
          item.sell_price,
          item.updated_at,
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

  static hasPriceChanged(
    latest: LatestItem | null,
    buyPrice: number,
    sellPrice: number
  ): boolean {
    if (latest === null) {
      return true;
    }

    return (
      latest.buy_price !== buyPrice ||
      latest.sell_price !== sellPrice
    );
  }
}