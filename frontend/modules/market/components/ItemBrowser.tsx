"use client";

import ItemCard from "./ItemCard";

import { ItemDefinition } from "@/types/item";

interface Props {
  items: ItemDefinition[];
  selected?: string;
  imageUniqueName?: string;
  onSelect: (item: ItemDefinition) => void;
}
export default function ItemBrowser({
  items,
  selected,
  imageUniqueName,
  onSelect,
}: Props){
  // Remove duplicates
  const uniqueItems = items.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (i) =>
          i.uniqueName ===
          item.uniqueName
      )
  );

  if (uniqueItems.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center text-slate-400">
        Search for an item to begin.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900">

      <div className="border-b border-slate-700 bg-slate-800 px-4 py-3">
        <h2 className="text-xl font-bold">
          Items
        </h2>
      </div>

      <div className="max-h-[700px] overflow-y-auto p-2 space-y-2">

        {uniqueItems.map((item) => (
<ItemCard
  key={item.uniqueName}
  uniqueName={
    selected === item.uniqueName
      ? (imageUniqueName ??
          item.imageUniqueName ??
          item.defaultUniqueName ??
          item.uniqueName)
      : (item.imageUniqueName ??
          item.defaultUniqueName ??
          item.uniqueName)
  }
  displayName={item.displayName}
  category={item.category}
  selected={
    selected === item.uniqueName
  }
  onClick={() => onSelect(item)}
/>
        ))}

      </div>

    </div>
  );
}