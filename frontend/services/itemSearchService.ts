import items from "@/data/items.json";
import { ItemDefinition } from "@/types/item";

const ITEM_DATABASE =
  items as ItemDefinition[];

export function searchItems(
  query: string,
  limit: number = 20
): ItemDefinition[] {
  const search = query
    .trim()
    .toLowerCase();

  if (!search) {
    return [];
  }

  // Remove duplicate variants
  const uniqueItems = new Map<
    string,
    ItemDefinition
  >();

  for (const item of ITEM_DATABASE) {
    const name =
      item.displayName.toLowerCase();

    const unique =
      item.uniqueName;

    if (
      !name.includes(search) &&
      !unique
        .toLowerCase()
        .includes(search)
    ) {
      continue;
    }

    // Base key:
    // Remove enchantments (@1,@2...)
    // Remove tier prefix (T4_,T5...)
    const key = unique
      .replace(/^T\d_/, "")
      .replace(/@\d$/, "");

    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, item);
    }
  }

  return Array.from(
    uniqueItems.values()
  )
    .sort((a, b) => {
      const aStarts =
        a.displayName
          .toLowerCase()
          .startsWith(search);

      const bStarts =
        b.displayName
          .toLowerCase()
          .startsWith(search);

      if (aStarts && !bStarts) {
        return -1;
      }

      if (!aStarts && bStarts) {
        return 1;
      }

      return a.displayName.localeCompare(
        b.displayName
      );
    })
    .slice(0, limit);
}

export function getItemByUniqueName(
  uniqueName: string
): ItemDefinition | undefined {
  return ITEM_DATABASE.find(
    (item) =>
      item.uniqueName ===
      uniqueName
  );
}