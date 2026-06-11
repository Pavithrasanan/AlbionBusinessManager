import {
  ITEM_DATABASE,
  ItemDefinition,
} from "@/data/items";

export function searchItems(
  query: string
): ItemDefinition[] {
  if (!query.trim()) {
    return [];
  }

  return ITEM_DATABASE.filter((item) =>
    item.displayName
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}

export function getItemByUniqueName(
  uniqueName: string
): ItemDefinition | undefined {
  return ITEM_DATABASE.find(
    (item) => item.uniqueName === uniqueName
  );
}