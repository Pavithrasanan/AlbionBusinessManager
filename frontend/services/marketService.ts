import { searchItems } from "@/services/itemSearchService";
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
  query: string
): Promise<MarketItem[]> {
  if (!query.trim()) {
    return [];
  }

  // Find matching item definitions
  const definitions = searchItems(query, 20);

  if (definitions.length === 0) {
    return [];
  }

  // Fast lookup
  const definitionMap = new Map(
    definitions.map((item) => [
      item.uniqueName,
      item,
    ])
  );

  // Fetch backend data
  const response = await fetch(
    "http://localhost:5000/api/items"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch market data"
    );
  }

  const json = await response.json();
  const rows = json.data ?? [];

  const results: MarketItem[] = [];

  for (const row of rows) {
    const definition =
      definitionMap.get(
        row.unique_name
      );

    if (!definition) {
      continue;
    }

    results.push({
      id: `${row.unique_name}-${row.city}-${row.quality}`,

      uniqueName: row.unique_name,

      displayName:
        definition.displayName,

      tier: parseTier(
        row.unique_name
      ),

      enchantment:
        parseEnchantment(
          row.unique_name
        ),

      quality:
        row.quality ?? 1,

      city:
        row.city ?? "Unknown",

      buyPrice:
        row.buy_price ?? 0,

      sellPrice:
        row.sell_price ?? 0,

      demand: undefined,

      lastUpdated:
        row.updated_at,
    });
  }

  // Sort by display name first,
  // then highest profit
  results.sort((a, b) => {
    if (
      a.displayName !==
      b.displayName
    ) {
      return a.displayName.localeCompare(
        b.displayName
      );
    }

    const profitA =
      a.sellPrice - a.buyPrice;

    const profitB =
      b.sellPrice - b.buyPrice;

    return profitB - profitA;
  });

  return results;
}