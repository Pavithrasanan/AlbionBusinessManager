import { db } from "../db/database";

export async function updateStatistics(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {

      db.run(
        `
        DELETE FROM market_statistics
        `,
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          db.run(
            `
INSERT INTO market_statistics(

unique_name,
city,
quality,

avg_buy_24h,
avg_sell_24h,

avg_buy_7d,
avg_sell_7d,

avg_buy_30d,
avg_sell_30d,

min_buy,
max_sell,

snapshots,

updated_at

)

SELECT

m.unique_name,
m.city,
m.quality,

AVG(
CASE
WHEN snapshot_time>=datetime(
'now',
'-1 day'
)
THEN buy_price
END
),

AVG(
CASE
WHEN snapshot_time>=datetime(
'now',
'-1 day'
)
THEN sell_price
END
),

AVG(
CASE
WHEN snapshot_time>=datetime(
'now',
'-7 day'
)
THEN buy_price
END
),

AVG(
CASE
WHEN snapshot_time>=datetime(
'now',
'-7 day'
)
THEN sell_price
END
),

AVG(
CASE
WHEN snapshot_time>=datetime(
'now',
'-30 day'
)
THEN buy_price
END
),

AVG(
CASE
WHEN snapshot_time>=datetime(
'now',
'-30 day'
)
THEN sell_price
END
),

MIN(buy_price),

MAX(sell_price),

COUNT(*),

CURRENT_TIMESTAMP

FROM market_history m

GROUP BY

m.unique_name,
m.city,
m.quality
`,
            (err2) => {

              if (err2) {
                reject(err2);
                return;
              }

              console.log(
                "✅ market_statistics updated"
              );

              resolve();

            }
          );
        }
      );

    });
  });
}