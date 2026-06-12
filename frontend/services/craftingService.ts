import { RECIPES } from "@/data/recipes";
import { getMarketPrices } from "@/services/albionApi";

export interface CraftingResult {
  itemId: string;
  displayName: string;

  materialCost: number;
  craftingFee: number;
  totalCost: number;

  marketPrice: number;

  estimatedTax: number;

  netProfit: number;

  roi: number;
}

const CRAFTING_FEE = 5000;
const MARKET_TAX = 0.04;

export async function calculateCraftProfit(
  itemId: string
): Promise<CraftingResult | null> {
  const recipe = RECIPES.find(
    (r) => r.itemId === itemId
  );

  if (!recipe) {
    return null;
  }

  const ingredientIds = recipe.ingredients.map(
    (i) => i.itemId
  );

  const marketData = await getMarketPrices([
    ...ingredientIds,
    itemId,
  ]);

  let materialCost = 0;

  for (const ingredient of recipe.ingredients) {
    const price = marketData.find(
      (p: any) =>
        p.item_id === ingredient.itemId &&
        p.sell_price_min > 0
    );

    if (!price) {
      return null;
    }

    materialCost +=
      price.sell_price_min *
      ingredient.quantity;
  }

  const craftedItem = marketData.find(
    (p: any) =>
      p.item_id === itemId &&
      p.buy_price_max > 0
  );

  if (!craftedItem) {
    return null;
  }

  const marketPrice =
    craftedItem.buy_price_max;

  const totalCost =
    materialCost + CRAFTING_FEE;

  const estimatedTax = Math.round(
    marketPrice * MARKET_TAX
  );

  const netProfit =
    marketPrice -
    totalCost -
    estimatedTax;

  const roi = Number(
    (
      (netProfit / totalCost) *
      100
    ).toFixed(2)
  );

  return {
    itemId,
    displayName: recipe.displayName,

    materialCost,

    craftingFee: CRAFTING_FEE,

    totalCost,

    marketPrice,

    estimatedTax,

    netProfit,

    roi,
  };
}