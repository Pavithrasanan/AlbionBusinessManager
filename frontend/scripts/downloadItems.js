const fs = require("fs");

const items = [
  {
    uniqueName: "T4_BAG",
    displayName: "T4 Bag",
  },
  {
    uniqueName: "T5_BAG",
    displayName: "T5 Bag",
  },
  {
    uniqueName: "T6_BAG",
    displayName: "T6 Bag",
  },
  {
    uniqueName: "T7_BAG",
    displayName: "T7 Bag",
  },
  {
    uniqueName: "T8_BAG",
    displayName: "T8 Bag",
  },
];

fs.writeFileSync(
  "./data/items.json",
  JSON.stringify(items, null, 2)
);

console.log("items.json generated");