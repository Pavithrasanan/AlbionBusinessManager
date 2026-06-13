"use client";

import { useEffect } from "react";
import { ItemDefinition } from "@/types/item";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onResults: (items: ItemDefinition[]) => void;
  onSelect?: (item: ItemDefinition) => void;
}

export default function SearchBar({
  value,
  onChange,
  onResults,
}: SearchBarProps) {
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      const query = value.trim();

      if (!query) {
        onResults([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          onResults([]);
          return;
        }

        const data = await response.json();

        const results: ItemDefinition[] = data.map((item: any) => ({
          uniqueName: item.unique_name,
          displayName: item.display_name,
        }));

        onResults(results);
      } catch (err: any) {
        if (err?.name === "AbortError") {
          return;
        }

        console.error(err);
        onResults([]);
      }
    }

    load();

    return () => controller.abort();
  }, [value, onResults]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        placeholder="Search Albion item..."
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}