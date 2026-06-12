import { ItemImporter } from "./itemImporter";
import { RecipeImporter } from "./recipes/recipeImporter";
import { RecipeIngredientImporter } from "./recipes/recipeIngredientImporter";

async function syncGameData() {
  console.log("");
  console.log("================================");
  console.log("Albion Business Manager");
  console.log("================================");

  await ItemImporter.run();

  await RecipeImporter.run();

  await RecipeIngredientImporter.run();

  console.log("");
  console.log("Synchronization Complete");
}

syncGameData().catch((err) => {
  console.error(err);
  process.exit(1);
});