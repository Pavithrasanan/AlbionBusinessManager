
import "./db/database";

import express from "express";
import cors from "cors";

import { takeSnapshot } from "./services/snapshotService";
import marketRoutes from "./routes/market";
import { startScheduler } from "./services/schedulerService";
import analyzerRouter from "./routes/analyzer";
import searchRouter from "./routes/search";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/analyzer",
  analyzerRouter
);
app.use(
  "/api/search",
  searchRouter
);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Albion Business Manager Backend Running",
  });
});

// Market API
app.use("/api", marketRoutes);

// Trigger snapshot manually
app.get("/snapshot", async (_, res) => {
  try {
    const result = await takeSnapshot();
    res.json(result);
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err?.message ?? "Unknown error",
    });
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

  startScheduler();
});

