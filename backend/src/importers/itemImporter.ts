import { GameDataService } from "./gameDataService";
import {
  MasterItem,
  MasterItemRepository,
} from "../repositories/masterItemRepository";

export class ItemImporter {
  static async run() {
    console.log("");
    console.log("Loading dataset...");

    const rawItems =
      await GameDataService.fetchItems();

    const items: MasterItem[] =
      rawItems.map((item) => ({
        unique_name: item.unique_name,
        display_name: item.display_name,
        category:
          item.category ?? null,
        tier:
          item.tier ?? null,
        enchantment:
          item.enchantment ?? 0,
      }));

    console.log(
      `Importing ${items.length} items...`
    );

    await MasterItemRepository.bulkInsert(
      items
    );

    const total =
      await MasterItemRepository.count();

    console.log("");

    console.log(
      `✅ Database now contains ${total} items`
    );

    console.log("");
  }
}