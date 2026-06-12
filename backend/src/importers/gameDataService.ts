import axios from "axios";

export interface GameItem {
  unique_name: string;
  display_name: string;
  category: string;
  tier: number;
  enchantment: number;
}

export class GameDataService {
  static async fetchItems(): Promise<GameItem[]> {
    // Temporary implementation.
    // This will later fetch the verified official dataset.

    console.log("Fetching game data...");

    return [
      {
        unique_name: "T4_BAG",
        display_name: "T4 Bag",
        category: "Bag",
        tier: 4,
        enchantment: 0,
      },
      {
        unique_name: "T5_BAG",
        display_name: "T5 Bag",
        category: "Bag",
        tier: 5,
        enchantment: 0,
      },
    ];
  }
}