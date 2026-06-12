const fs = require("fs");

const SOURCE =
  "https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/items.json";

async function main() {
  console.log("Downloading Albion item database...");

  const response = await fetch(SOURCE);

  if (!response.ok) {
    throw new Error("Failed to download item database");
  }

  const data = await response.json();

  const items = data
    .filter(
      (item) =>
        item.UniqueName &&
        item.LocalizedNames &&
        item.LocalizedNames["EN-US"]
    )
    .map((item) => ({
      uniqueName: item.UniqueName,
      displayName: item.LocalizedNames["EN-US"],
    }))
    .sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    );

  fs.writeFileSync(
    "./data/items.json",
    JSON.stringify(items, null, 2)
  );

  console.log(
    `Generated ${items.length} items successfully.`
  );
}

main().catch(console.error);