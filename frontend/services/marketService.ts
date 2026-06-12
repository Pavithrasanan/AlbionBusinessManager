import { MarketItem } from "@/types/market";

function parseTier(uniqueName: string): number {
  const match = uniqueName.match(/^T(\d)/);
  return match ? Number(match[1]) : 0;
}

function parseEnchantment(uniqueName: string): number {
  const match = uniqueName.match(/@(\d)$/);
  return match ? Number(match[1]) : 0;
}

interface SearchResult {
  unique_name: string;
  display_name: string;
  category: string | null;
  tier: number | null;
  enchantment: number;
}

export async function searchMarket(
  query: string
): Promise<MarketItem[]> {
  if (!query.trim()) {
    return [];
  }

  // Search backend
  const searchResponse = await fetch(
    `http://localhost:5000/api/search?q=${encodeURIComponent(
      query
    )}`
  );

  if (!searchResponse.ok) {
    throw new Error("Failed to search items");
  }

  const definitions: SearchResult[] =
    await searchResponse.json();

  if (definitions.length === 0) {
    return [];
  }

  const definitionMap = new Map<
    string,
    SearchResult
  >(
    definitions.map((item) => [
      item.unique_name,
      item,
    ])
  );

  // Fetch market data
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
        definition.display_name,

      tier:
        definition.tier ??
        parseTier(row.unique_name),

      enchantment:
        definition.enchantment ??
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

  // Sort results
  results.sort((a, b) => {
    if (a.displayName !== b.displayName) {
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