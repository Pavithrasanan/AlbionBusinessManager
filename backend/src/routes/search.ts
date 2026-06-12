import { Router } from "express";

import { SearchRepository } from "../repositories/searchRepository";

const router = Router();

router.get("/", async (req, res) => {

  try {

    const q = String(
      req.query.q ?? ""
    );

    if (!q.trim()) {

      return res.json([]);

    }

    const items =
      await SearchRepository.search(q);

    res.json(items);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({

      error:
        "Search failed",

    });

  }

});

export default router;