import cron from "node-cron";

import { takeSnapshot } from "./snapshotService";
import { updateStatistics } from "./statisticsService";

let running = false;

export function startScheduler() {
  console.log(
    "🕒 Market scheduler started"
  );

  cron.schedule("*/5 * * * *", async () => {
    if (running) {
      console.log(
        "⏳ Previous snapshot still running..."
      );
      return;
    }

    running = true;

    try {
      console.log(
        "🚀 Running scheduled snapshot..."
      );

      const result =
        await takeSnapshot();
        await takeSnapshot();

      console.log(
        `✅ Processed: ${result.processed} | Inserted: ${result.inserted} | Failed: ${result.failed}`
      );
    } catch (err) {
      console.error(
        "❌ Scheduler error:",
        err
      );
    } finally {
      running = false;
    }
  });
}