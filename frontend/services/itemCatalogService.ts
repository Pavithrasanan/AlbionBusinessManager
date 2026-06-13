export interface CatalogItem {
  unique_name: string;
  display_name: string;
  category: string | null;
  tier: number | null;
  enchantment: number;
}

const API =
  "http://localhost:5000/api/search";

export async function searchCatalog(
  query: string
): Promise<CatalogItem[]> {
  if (!query.trim()) {
    return [];
  }

  const res = await fetch(
    `${API}?q=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to search catalog"
    );
  }

  return await res.json();
}