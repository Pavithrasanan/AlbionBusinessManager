import { Router } from "express";

import { getAnalytics } from "../services/analyticsService";

const router = Router();

router.get(
  "/",
  async (req, res) => {
    try {
      const uniqueName =
        String(req.query.item ?? "");

      const city =
        String(req.query.city ?? "");

      const quality =
        Number(req.query.quality ?? 1);

      const days =
        Number(req.query.days ?? 1);

      if (!uniqueName || !city) {
        return res.status(400).json({
          error:
            "item and city are required",
        });
      }

      const result =
        await getAnalytics(
          uniqueName,
          city,
          quality,
          days
        );

      res.json(result);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error:
          "Failed to analyze market",
      });
    }
  }
);

export default router;