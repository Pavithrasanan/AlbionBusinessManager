import items from "@/data/items.json";
import { ItemDefinition } from "@/types/item";

const ITEM_DATABASE: ItemDefinition[] =
  items as ItemDefinition[];

export function searchItems(
  query: string,
  limit: number = 10
): ItemDefinition[] {
  const search = query.trim().toLowerCase();

  if (!search) {
    return [];
  }

  return ITEM_DATABASE.filter((item) => {
    return (
      item.displayName
        .toLowerCase()
        .includes(search) ||
      item.uniqueName
        .toLowerCase()
        .includes(search)
    );
  })
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