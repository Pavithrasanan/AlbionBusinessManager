import "../db/database";

import { MasterItemRepository } from "../repositories/masterItemRepository";

async function seed() {
  console.log("🚀 Starting item seed...");

  // Temporary demo dataset
  // This will later be replaced with the complete Albion dataset.

  const items = [
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

  for (const item of items) {
    await MasterItemRepository.insert(item);
  }

  const count =
    await MasterItemRepository.count();

  console.log(
    `✅ Items table contains ${count} items`
  );

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});