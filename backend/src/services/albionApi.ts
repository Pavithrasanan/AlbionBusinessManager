
const API_BASE =
  "https://west.albion-online-data.com/api/v2/stats/prices";

export interface AlbionPrice {
  item_id: string;
  city: string;
  quality: number;

  sell_price_min: number;
  sell_price_min_date: string;

  buy_price_max: number;
  buy_price_max_date: string;
}

const DEFAULT_CITIES = [
  "Bridgewatch",
  "Caerleon",
  "Fort Sterling",
  "Lymhurst",
  "Martlock",
  "Thetford",
];
export async function fetchMarketPrices(
  itemIds: string[]
): Promise<AlbionPrice[]> {
  if (itemIds.length === 0) {
    return [];
  }

  const url =
    `${API_BASE}/${itemIds.join(",")}` +
    `?locations=${DEFAULT_CITIES.join(",")}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Albion API error: ${response.status}`
    );
  }

  return await response.json();
}
