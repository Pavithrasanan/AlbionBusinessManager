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

        display_name LIKE ?

        OR

        unique_name LIKE ?

        ORDER BY

        tier,
        display_name

        LIMIT ?
        `,

        [
          `%${query}%`,
          `%${query}%`,
          limit,
        ],

        (err, rows:any[]) => {

          if (err) {
            reject(err);
            return;
          }

          resolve(rows);

        }

      );

    });

  }

}