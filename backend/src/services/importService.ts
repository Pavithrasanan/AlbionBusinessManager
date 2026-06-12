import { MasterItemRepository } from "../repositories/masterItemRepository";

export interface ImportableItem {
  unique_name: string;
  display_name: string;
  category: string | null;
  tier: number | null;
  enchantment: number;
}

export class ImportService {
  static async importItems(
    items: ImportableItem[]
  ) {
    console.log("");

    console.log(
      `Importing ${items.length} items...`
    );

    let imported = 0;

    for (const item of items) {
      await MasterItemRepository.insert(
        item
      );

      imported++;

      if (
        imported % 100 === 0 ||
        imported === items.length
      ) {
        process.stdout.write(
          `\rImported ${imported}/${items.length}`
        );
      }
    }

    console.log("");

    const total =
      await MasterItemRepository.count();

    console.log("");

    console.log(
      `Database now contains ${total} items`
    );

    console.log("");
  }
}