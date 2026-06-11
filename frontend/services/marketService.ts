import { getMarketPrices } from "@/services/albionApi";
import { searchItems } from "@/services/itemSearchService";

import { MarketItem } from "@/types/market";
import { AlbionMarketResponse } from "@/types/albionApi";

function parseTier(uniqueName: string): number {
  const match = uniqueName.match(/^T(\d)/);

  if (!match) return 0;

  return Number(match[1]);
}

function parseEnchantment(uniqueName: string): number {
  const match = uniqueName.match(/@(\d)$/);

  if (!match) return 0;

  return Number(match[1]);
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

  const itemIds = matches.map(
    (item) => item.uniqueName
  );

  const apiData: AlbionMarketResponse[] =
    await getMarketPrices(itemIds);

  return apiData.map((item, index) => ({
    id: `${item.item_id}-${item.city}-${index}`,

    uniqueName: item.item_id,

    displayName:
      matches.find(
        (x) => x.uniqueName === item.item_id
      )?.displayName ?? item.item_id,

    tier: parseTier(item.item_id),

    enchantment: parseEnchantment(
      item.item_id
    ),

    quality: item.quality,

    city: item.city,

    buyPrice: item.buy_price_max,

    sellPrice: item.sell_price_min,

    demand: undefined,

    lastUpdated: item.sell_price_min_date,
  }));
}