import {
  fetchMarketPrices,
} from "./albionApi";

import {
  ItemRepository,
} from "../repositories/itemRepository";

import {
  HistoryRepository,
} from "../repositories/historyRepository";
import { MasterItemRepository } from "../repositories/masterItemRepository";

export interface SnapshotResult {
  processed: number;
  inserted: number;
  failed: number;
}

export async function takeSnapshot(): Promise<SnapshotResult> {
  let processed = 0;
  let inserted = 0;
  let failed = 0;

  try {
const trackedItems =
  await MasterItemRepository.getAllUniqueNames();

console.log(
  "Tracked count:",
  trackedItems.length
);

console.log(
  "First 20 tracked items:"
);

console.log(
  trackedItems.slice(0, 20)
);
  console.log("Tracked count:", trackedItems.length);
console.log("First 20 tracked items:");
console.log(trackedItems.slice(0, 20));
console.log(
  "Contains T2_BAG:",
  trackedItems.includes("T2_BAG")
);  

    if (trackedItems.length === 0) {
      return {
        processed: 0,
        inserted: 0,
        failed: 0,
      };
    }

    const BATCH_SIZE = 25;

    for (
      let i = 0;
      i < trackedItems.length;
      i += BATCH_SIZE
    ) {
      const batch = trackedItems.slice(
        i,
        i + BATCH_SIZE
      );

      console.log(
        `Processing batch ${
          Math.floor(i / BATCH_SIZE) + 1
        }`
      );

      try {
        const prices =
          await fetchMarketPrices(batch);

        for (const price of prices) {
          processed++;

          try {
            const latest =
              await ItemRepository.getLatestItem(
                price.item_id,
                price.city,
                price.quality
              );

            const changed =
              ItemRepository.hasPriceChanged(
                latest,
                price.buy_price_max,
                price.sell_price_min
              );

            if (!changed) {
              continue;
            }

            await ItemRepository.upsertLatestItem({
              unique_name: price.item_id,
              city: price.city,
              quality: price.quality,
              buy_price: price.buy_price_max,
              sell_price: price.sell_price_min,
              updated_at:
                new Date().toISOString(),
            });

            await HistoryRepository.insertHistory({
              unique_name: price.item_id,
              city: price.city,
              quality: price.quality,
              buy_price: price.buy_price_max,
              sell_price: price.sell_price_min,
            });

            inserted++;
          } catch (err) {
            console.error(err);
            failed++;
          }
        }
      } catch (err) {
        console.error(
          "Batch failed:",
          err
        );
        failed += batch.length;
      }
    }

    console.log(
      `Processed: ${processed}`
    );
    console.log(
      `Inserted: ${inserted}`
    );
    console.log(
      `Failed: ${failed}`
    );

    return {
      processed,
      inserted,
      failed,
    };
  } catch (err) {
    console.error(err);

    return {
      processed,
      inserted,
      failed,
    };
  }
}