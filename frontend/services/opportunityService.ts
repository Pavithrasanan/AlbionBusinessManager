import { searchMarket } from "@/services/marketService";
import { MarketOpportunity } from "@/types/opportunity";
import { MarketItem } from "@/types/market";

const MARKET_TAX = 0.04;

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

    // Cheapest place to BUY
    const cheapestSell = validItems.reduce(
      (prev, curr) =>
        curr.sellPrice < prev.sellPrice
          ? curr
          : prev
    );

    // Best place to SELL
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
      highestBuy.buyPrice * MARKET_TAX
    );

    const netProfit =
      spread - estimatedTax;

    const roi = Number(
      (
        (netProfit /
          cheapestSell.sellPrice) *
        100
      ).toFixed(2)
    );

    let recommendation:
      | "BUY"
      | "HOLD"
      | "SKIP";

    if (roi >= 15) {
      recommendation = "BUY";
    } else if (roi >= 8) {
      recommendation = "HOLD";
    } else {
      recommendation = "SKIP";
    }
    console.log({
  uniqueName: cheapestSell.uniqueName,
  tier: cheapestSell.tier,
  enchantment: cheapestSell.enchantment,
  quality: cheapestSell.quality,
});

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

  return opportunities;
}