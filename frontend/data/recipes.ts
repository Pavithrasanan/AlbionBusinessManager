import { CraftingRecipe } from "@/types/recipe";

export const RECIPES: CraftingRecipe[] = [
  {
    itemId: "T4_BAG",
    displayName: "T4 Bag",
    ingredients: [
      {
        itemId: "T4_CLOTH",
        quantity: 24,
      },
      {
        itemId: "T4_LEATHER",
        quantity: 16,
      },
    ],
  },

  {
    itemId: "T5_BAG",
    displayName: "T5 Bag",
    ingredients: [
      {
        itemId: "T5_CLOTH",
        quantity: 24,
      },
      {
        itemId: "T5_LEATHER",
        quantity: 16,
      },
    ],
  },
];