import { db } from "../db/database";

import { MarketStatistics } from "../types/statistics";

export class StatisticsRepository {

  static get(
    uniqueName: string,
    city: string,
    quality: number
  ): Promise<MarketStatistics | null> {

    return new Promise((resolve, reject) => {

      db.get(

        `
        SELECT *

        FROM market_statistics

        WHERE

        unique_name=?

        AND city=?

        AND quality=?
        `,

        [
          uniqueName,
          city,
          quality
        ],

        (err, row:any)=>{

          if(err){

            reject(err);

            return;

          }

          resolve(
            row ?? null
          );

        }

      );

    });

  }

}