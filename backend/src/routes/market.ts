import { Router } from "express";
import { db } from "../db/database";

const router = Router();

router.get("/items", (req, res) => {
  const {
    search,
    uniqueName,
    city,
    quality,
  } = req.query;

  let sql = `
    SELECT *
    FROM items_latest
  `;

  const conditions: string[] = [];
  const params: any[] = [];

  if (uniqueName) {
    conditions.push(
      "unique_name = ?"
    );
    params.push(uniqueName);
  }

  if (search) {
    conditions.push(
      "unique_name LIKE ?"
    );
    params.push(`%${search}%`);
  }

  if (city) {
    conditions.push(
      "city = ?"
    );
    params.push(city);
  }

  if (quality) {
    conditions.push(
      "quality = ?"
    );
    params.push(
      Number(quality)
    );
  }

  if (conditions.length > 0) {
    sql +=
      " WHERE " +
      conditions.join(
        " AND "
      );
  }

  sql += `
    ORDER BY
      unique_name,
      city,
      quality
  `;

  db.all(
    sql,
    params,
    (err, rows) => {
      if (err) {
        res.status(500).json({
          success: false,
          error:
            err.message,
        });

        return;
      }

      res.json({
        success: true,
        count:
          rows.length,
        data: rows,
      });
    }
  );
});

export default router;