import { RecipeIngredientRepository } from "../../repositories/recipeIngredientRepository";

export class RecipeIngredientImporter {
  static async run() {
    console.log("");

    console.log(
      "Recipe ingredient importer initialized"
    );

    const total =
      await RecipeIngredientRepository.count();

    console.log(
      `Recipe ingredients currently in database: ${total}`
    );

    console.log("");
  }
}