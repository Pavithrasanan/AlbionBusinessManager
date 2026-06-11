"use client";

import { useEffect, useState } from "react";
import { searchItems } from "@/services/itemSearchService";
import { ItemDefinition } from "@/types/item";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  const [results, setResults] = useState<
    ItemDefinition[]
  >([]);

  useEffect(() => {
    setResults(searchItems(value));
  }, [value]);

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium">
        Search Item
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search item..."
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      {results.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-700 bg-slate-900">
          {results.map((item) => (
            <button
              key={item.uniqueName}
              type="button"
              className="block w-full px-4 py-2 text-left hover:bg-slate-800"
              onClick={() => {
                onChange(item.displayName);
                setResults([]);
              }}
            >
              {item.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}