import { db } from "../db/database";

export interface RecipeIngredient {
  recipe_item_unique_name: string;
  ingredient_item_unique_name: string;
  quantity: number;
}

export class RecipeIngredientRepository {
  static insert(
    ingredient: RecipeIngredient
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO recipe_ingredients
        (
          recipe_item_unique_name,
          ingredient_item_unique_name,
          quantity
        )
        VALUES (?, ?, ?)
        `,
        [
          ingredient.recipe_item_unique_name,
          ingredient.ingredient_item_unique_name,
          ingredient.quantity,
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
        `
        SELECT COUNT(*) AS total
        FROM recipe_ingredients
        `,
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