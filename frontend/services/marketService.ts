import { getMarketPrices } from "@/services/albionApi";
import { searchItems } from "@/services/itemSearchService";

import { MarketItem } from "@/types/market";
import { AlbionPrice } from "@/types/albion";

function parseTier(uniqueName: string): number {
  const match = uniqueName.match(/^T(\d)/);
  return match ? Number(match[1]) : 0;
}

function parseEnchantment(uniqueName: string): number {
  const match = uniqueName.match(/@(\d)$/);
  return match ? Number(match[1]) : 1;
}

export async function searchMarket(
  query: string
): Promise<MarketItem[]> {
  if (!query.trim()) {
    return [];
  }

  const matches = searchItems(query);

  if (matches.length === 0) {
    return [];
  }

  const apiData = (await getMarketPrices(
    matches.map((item) => item.uniqueName)
  )) as AlbionPrice[];

  const marketItems: MarketItem[] = [];

  for (const price of apiData) {
    // Ignore invalid market entries
    if (
      price.buy_price_max <= 0 ||
      price.sell_price_min <= 0
    ) {
      continue;
    }

    const definition = matches.find(
      (item) =>
        item.uniqueName === price.item_id
    );

    marketItems.push({
      id: `${price.item_id}-${price.city}-${price.quality}`,

      uniqueName: price.item_id,

      displayName:
        definition?.displayName ??
        price.item_id,

      tier: parseTier(price.item_id),

      enchantment: parseEnchantment(
        price.item_id
      ),

      quality: price.quality,

      city: price.city,

      buyPrice: price.buy_price_max,

      sellPrice: price.sell_price_min,

      demand: undefined,

      lastUpdated:
        price.sell_price_min_date,
    });
  }

  marketItems.sort((a, b) => {
    const spreadA =
      a.sellPrice - a.buyPrice;

    const spreadB =
      b.sellPrice - b.buyPrice;

    return spreadB - spreadA;
  });

  return marketItems;
}