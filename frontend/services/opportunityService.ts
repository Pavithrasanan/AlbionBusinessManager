import { searchMarket } from "@/services/marketService";
import { MarketOpportunity } from "@/types/opportunity";
import { MarketItem } from "@/types/market";

const MARKET_TAX = 0.04;

export async function searchOpportunities(
  query: string
): Promise<MarketOpportunity[]> {
  const marketItems = await searchMarket(query);
  console.log("QUERY:", query);
console.log("MARKET ITEMS:", marketItems.length);
console.log(marketItems.slice(0, 10));

  if (!marketItems.length) {
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
    if (items.length < 2) {
      continue;
    }

    const buyCandidates = items.filter(
      (i) => i.sellPrice > 0
    );

    const sellCandidates = items.filter(
      (i) => i.buyPrice > 0
    );

    if (
      buyCandidates.length === 0 ||
      sellCandidates.length === 0
    ) {
      continue;
    }

    const cheapestSell = buyCandidates.reduce(
      (a, b) =>
        a.sellPrice < b.sellPrice ? a : b
    );

    const highestBuy = sellCandidates.reduce(
      (a, b) =>
        a.buyPrice > b.buyPrice ? a : b
    );

    if (
      cheapestSell.city === highestBuy.city
    ) {
      continue;
    }

    const spread =
      highestBuy.buyPrice -
      cheapestSell.sellPrice;

    const estimatedTax = Math.round(
      highestBuy.buyPrice * MARKET_TAX
    );

    const netProfit =
      spread - estimatedTax;

    const roi =
      cheapestSell.sellPrice > 0
        ? Number(
            (
              (netProfit /
                cheapestSell.sellPrice) *
              100
            ).toFixed(2)
          )
        : 0;

    let recommendation:
      | "BUY"
      | "HOLD"
      | "SKIP";

    if (roi >= 10) {
      recommendation = "BUY";
    } else if (roi >= 3) {
      recommendation = "HOLD";
    } else {
      recommendation = "SKIP";
    }

    opportunities.push({
      uniqueName:
        cheapestSell.uniqueName,

      displayName:
        cheapestSell.displayName,

      tier:
        cheapestSell.tier,

      enchantment:
        cheapestSell.enchantment,

      quality:
        cheapestSell.quality,

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

      recommendation,
    });
  }

  opportunities.sort((a, b) => {
    if (b.roi !== a.roi) {
      return b.roi - a.roi;
    }

    return b.netProfit - a.netProfit;
  });
  console.log("OPPORTUNITIES:", opportunities.length);
console.log(opportunities);
  return opportunities;
}