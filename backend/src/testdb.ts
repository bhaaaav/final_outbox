import { db } from "./db";

(async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log(rows);
  } catch (err) {
    console.error(err);
  }
})();