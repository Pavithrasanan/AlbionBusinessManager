import { AlbionPrice } from "@/types/albion";
import { MarketItem } from "@/types/market";

export function mapAlbionPriceToMarketItem(
  price: AlbionPrice
): MarketItem {
  return {
    id: `${price.item_id}-${price.city}`,

    uniqueName: price.item_id,

    displayName: price.item_id,

    tier: 0,

    enchantment: 0,

    quality: price.quality,

    city: price.city,

    buyPrice: price.buy_price_max,

    sellPrice: price.sell_price_min,

    demand: undefined,

    lastUpdated: price.sell_price_min_date,
  };
}