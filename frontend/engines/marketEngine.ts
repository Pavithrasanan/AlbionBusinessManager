import { MarketItem } from "@/types/market";

export interface BestMarketOpportunity {
  item: string;

  bestBuyCity: string;
  bestBuyPrice: number;

  bestSellCity: string;
  bestSellPrice: number;

  estimatedProfit: number;
}

export function getBestMarketOpportunity(
  items: MarketItem[]
): BestMarketOpportunity | null {
  if (items.length === 0) {
    return null;
  }

  let bestBuy = items[0];
  let bestSell = items[0];

  for (const item of items) {
    if (item.buyPrice < bestBuy.buyPrice) {
      bestBuy = item;
    }

    if (item.sellPrice > bestSell.sellPrice) {
      bestSell = item;
    }
  }

  return {
    item: bestBuy.displayName,

    bestBuyCity: bestBuy.city,
    bestBuyPrice: bestBuy.buyPrice,

    bestSellCity: bestSell.city,
    bestSellPrice: bestSell.sellPrice,

    estimatedProfit:
      bestSell.sellPrice -
      bestBuy.buyPrice,
  };
}