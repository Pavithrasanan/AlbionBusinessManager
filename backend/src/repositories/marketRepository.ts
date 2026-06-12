import { db } from "../db/database";

export interface MarketHistoryRow {
  id?: number;
  item_id: string;
  city: string;
  quality: number;
  buy_price: number;
  sell_price: number;
  buy_updated_at?: string;
  sell_updated_at?: string;
}

export class MarketRepository {
  static insertHistory(
    row: MarketHistoryRow
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO market_history
        (
          item_id,
          city,
          quality,
          buy_price,
          sell_price,
          buy_updated_at,
          sell_updated_at
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          row.item_id,
          row.city,
          row.quality,
          row.buy_price,
          row.sell_price,
          row.buy_updated_at ?? null,
          row.sell_updated_at ?? null,
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

  static getSnapshotCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.get(
        `
        SELECT COUNT(*) as count
        FROM market_history
        `,
        [],
        (err, row: any) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(row.count);
        }
      );
    });
  }
}