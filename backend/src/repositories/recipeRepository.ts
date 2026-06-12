import { db } from "../db/database";

export interface Recipe {
 item_unique_name: string;
  display_name: string;
}

export class RecipeRepository {
  static insert(recipe: Recipe): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO recipes
        (
          item_unique_name,
          display_name
        )
        VALUES (?, ?)

        ON CONFLICT(item_unique_name)
        DO UPDATE SET
          display_name=excluded.display_name
        `,
        [
          recipe.item_unique_name,
          recipe.display_name,
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
        `SELECT COUNT(*) AS total FROM recipes`,
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