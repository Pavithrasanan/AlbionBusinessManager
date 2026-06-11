import { ITEM_DATABASE } from "@/data/items";
import { ItemDefinition } from "@/types/item";

export function searchItems(
  query: string,
  limit: number = 10
): ItemDefinition[] {
  if (!query.trim()) {
    return [];
  }

  const normalized = query.toLowerCase();

  return ITEM_DATABASE
    .filter((item) =>
      item.displayName
        .toLowerCase()
        .includes(normalized)
    )
    .sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    )
    .slice(0, limit);
}

export function getItemByUniqueName(
  uniqueName: string
): ItemDefinition | undefined {
  return ITEM_DATABASE.find(
    (item) => item.uniqueName === uniqueName
  );
}