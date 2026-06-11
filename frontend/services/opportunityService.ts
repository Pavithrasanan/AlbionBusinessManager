import { searchMarket } from "@/services/marketService";
import { MarketOpportunity } from "@/types/opportunity";
import { MarketItem } from "@/types/market";

export async function searchOpportunities(
  query: string
): Promise<MarketOpportunity[]> {
  const marketItems = await searchMarket(query);

  if (marketItems.length === 0) {
    return [];
  }

  const grouped = new Map<string, MarketItem[]>();

  for (const item of marketItems) {
    if (!grouped.has(item.uniqueName)) {
      grouped.set(item.uniqueName, []);
    }

    grouped.get(item.uniqueName)!.push(item);
  }

  const opportunities: MarketOpportunity[] = [];

  for (const [, items] of grouped) {
    const validItems = items.filter(
      (item) =>
        item.buyPrice > 0 &&
        item.sellPrice > 0
    );

    if (validItems.length < 2) {
      continue;
    }

    const cheapestSell = validItems.reduce(
      (prev, curr) =>
        curr.sellPrice < prev.sellPrice
          ? curr
          : prev
    );

    const highestBuy = validItems.reduce(
      (prev, curr) =>
        curr.buyPrice > prev.buyPrice
          ? curr
          : prev
    );

    const spread =
      highestBuy.buyPrice -
      cheapestSell.sellPrice;

    if (spread <= 0) {
      continue;
    }

    const estimatedTax = Math.round(
      highestBuy.buyPrice * 0.04
    );

    const netProfit =
      spread - estimatedTax;

    const roi =
      Number(
        (
          (netProfit /
            cheapestSell.sellPrice) *
          100
        ).toFixed(2)
      );

    opportunities.push({
      uniqueName:
        cheapestSell.uniqueName,

      displayName:
        cheapestSell.displayName,

      buyCity:
        cheapestSell.city,

      buyPrice:
        cheapestSell.sellPrice,

      sellCity:
        highestBuy.city,

      sellPrice:
        highestBuy.buyPrice,

      spread,

      estimatedTax,

      netProfit,

      roi,
    });
  }

  opportunities.sort(
    (a, b) =>
      b.netProfit - a.netProfit
  );

  return opportunities;
}