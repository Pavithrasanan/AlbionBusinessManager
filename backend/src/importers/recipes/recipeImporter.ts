import { RecipeRepository } from "../../repositories/recipeRepository";

export class RecipeImporter {
  static async run() {
    console.log("");

    console.log(
      "Recipe importer initialized"
    );

    const total =
      await RecipeRepository.count();

    console.log(
      `Recipes currently in database: ${total}`
    );

    console.log("");
  }
}