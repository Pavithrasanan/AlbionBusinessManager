export interface RecipeIngredient {
  itemId: string;
  quantity: number;
}

export interface CraftingRecipe {
  itemId: string;
  displayName: string;
  ingredients: RecipeIngredient[];
}