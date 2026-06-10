import { MarketItem } from "./types";

export function calculateProfit(item: MarketItem) {
  return item.sellPrice - item.buyPrice;
}