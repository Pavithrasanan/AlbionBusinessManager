import { MarketItem } from "@/types/market";

export interface MarketAnalysis {
  item: string;

  bestBuy: MarketItem;

  bestSell: MarketItem;

  estimatedProfit: number;
}

export function analyzeMarket(
  items: MarketItem[]
): MarketAnalysis | null {
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

    bestBuy,

    bestSell,

    estimatedProfit:
      bestSell.sellPrice -
      bestBuy.buyPrice,
  };
}