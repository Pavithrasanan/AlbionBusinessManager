import { getMarketPrices } from "@/services/albionApi";
import { searchItems } from "@/services/itemSearchService";

import { MarketItem } from "@/types/market";
import { AlbionPrice } from "@/types/albion";

function getTier(uniqueName: string): number {
  const match = uniqueName.match(/^T(\d)/);

  if (!match) {
    return 0;
  }

  return Number(match[1]);
}

function getEnchantment(uniqueName: string): number {
  const match = uniqueName.match(/@(\d)$/);

  if (!match) {
    return 0;
  }

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

  const apiData: AlbionPrice[] =
    await getMarketPrices(itemIds);

  return apiData.map((price, index) => {
    const item =
      matches.find(
        (x) => x.uniqueName === price.item_id
      );

    return {
      id: `${price.item_id}-${price.city}-${index}`,

      uniqueName: price.item_id,

      displayName:
        item?.displayName ?? price.item_id,

      tier: getTier(price.item_id),

      enchantment: getEnchantment(
        price.item_id
      ),

      quality: price.quality,

      city: price.city,

      buyPrice: price.buy_price_max,

      sellPrice: price.sell_price_min,

      demand: undefined,

      lastUpdated:
        price.sell_price_min_date,
    };
  });
}