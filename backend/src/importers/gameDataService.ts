import axios from "axios";

export interface GameItem {
  unique_name: string;
  display_name: string;
  category: string | null;
  tier: number | null;
  enchantment: number;
}

export class GameDataService {
  static async fetchItems(): Promise<GameItem[]> {
    console.log("Downloading item list...");

    const url =
      "https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/items.txt";

    const response = await axios.get(url);

    const lines = response.data
      .split("\n")
      .map((x: string) => x.trim())
      .filter((x: string) => x.length > 0);

    const items: GameItem[] = [];

    for (const line of lines) {
      // Example:
      // 0: T4_BAG : Adept's Bag

      const parts = line.split(":");

      if (parts.length < 3) continue;

      const uniqueName = parts[1].trim();
      const displayName = parts
        .slice(2)
        .join(":")
        .trim();

      const tierMatch = uniqueName.match(/^T(\d)/);

      const tier = tierMatch
        ? Number(tierMatch[1])
        : null;

      items.push({
        unique_name: uniqueName,
        display_name: displayName,
        category: null,
        tier,
        enchantment: 0,
      });
    }

    console.log(`Loaded ${items.length} items`);

    return items;
  }
}