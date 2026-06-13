import { MarketItem } from "@/types/market";

function parseTier(uniqueName: string): number {
  const match = uniqueName.match(/^T(\d)/);
  return match ? Number(match[1]) : 0;
}

function parseEnchantment(uniqueName: string): number {
  const match = uniqueName.match(/@(\d)$/);
  return match ? Number(match[1]) : 0;
}

export async function searchMarket(
  uniqueName: string
): Promise<MarketItem[]> {
  if (!uniqueName.trim()) {
    return [];
  }

  const response = await fetch(
    `http://localhost:5000/api/items?uniqueName=${encodeURIComponent(
      uniqueName
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch market data"
    );
  }

  const json = await response.json();

  const rows = json.data ?? [];

  return rows.map((row: any) => ({
    id: `${row.unique_name}-${row.city}-${row.quality}`,

    uniqueName: row.unique_name,

    displayName: row.unique_name,

    tier: parseTier(row.unique_name),

    enchantment: parseEnchantment(
      row.unique_name
    ),

    quality: row.quality,

    city: row.city,

    buyPrice: row.buy_price,

    sellPrice: row.sell_price,

    demand: undefined,

    lastUpdated: row.updated_at,
  }));
}