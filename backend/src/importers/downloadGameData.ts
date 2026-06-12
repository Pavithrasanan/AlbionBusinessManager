import axios from "axios";
import fs from "fs";
import path from "path";

export async function downloadGameData() {
  const cacheDir = path.join(
    process.cwd(),
    "storage",
    "cache"
  );

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, {
      recursive: true,
    });
  }

  console.log("Downloading game data...");

  // We'll replace this URL with the verified official dataset
  const url =
    "https://example.com/game-data.json";

  const output = path.join(
    cacheDir,
    "game-data.json"
  );

  try {
    const response = await axios.get(url);

    fs.writeFileSync(
      output,
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    console.log(
      "✅ Dataset saved:",
      output
    );
  } catch (err) {
    console.log(
      "⚠ Download step ready (URL will be configured next)"
    );
  }
}