import { db } from "../db/database";

export interface HistoryRecord {
  unique_name: string;
  city: string;
  quality: number;
  buy_price: number;
  sell_price: number;
  snapshot_time?: string;
}

export class HistoryRepository {
  static insertHistory(
    record: HistoryRecord
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO market_history
        (
          unique_name,
          city,
          quality,
          buy_price,
          sell_price
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          record.unique_name,
          record.city,
          record.quality,
          record.buy_price,
          record.sell_price,
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

  static getPriceHistory(
    unique_name: string,
    city: string,
    quality: number,
    days: number
  ): Promise<HistoryRecord[]> {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT *
        FROM market_history
        WHERE
          unique_name = ?
          AND city = ?
          AND quality = ?
          AND snapshot_time >= datetime(
            'now',
            '-' || ? || ' days'
          )
        ORDER BY snapshot_time ASC
        `,
        [
          unique_name,
          city,
          quality,
          days,
        ],
        (err, rows: any[]) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(rows as HistoryRecord[]);
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