import { db } from "../db/database";

export interface MarketAnalytics {
  snapshots: number;

  avgBuy: number;

  avgSell: number;

  minBuy: number;

  maxSell: number;
}

export function getAnalytics(
  uniqueName: string,
  city: string,
  quality: number,
  days: number
): Promise<MarketAnalytics> {
  return new Promise((resolve, reject) => {

    db.get(

      `
      SELECT

      COUNT(*) as snapshots,

      AVG(buy_price) as avgBuy,

      AVG(sell_price) as avgSell,

      MIN(buy_price) as minBuy,

      MAX(sell_price) as maxSell

      FROM market_history

      WHERE

      unique_name=?

      AND city=?

      AND quality=?

      AND snapshot_time>=datetime(
        'now',
        '-'||?||' days'
      )
      `,

      [
        uniqueName,
        city,
        quality,
        days,
      ],

      (err, row: any) => {

        if (err) {
          reject(err);
          return;
        }

        resolve({

          snapshots:
            row?.snapshots ?? 0,

          avgBuy:
            row?.avgBuy ?? 0,

          avgSell:
            row?.avgSell ?? 0,

          minBuy:
            row?.minBuy ?? 0,

          maxSell:
            row?.maxSell ?? 0,

        });

      }

    );

  });
}