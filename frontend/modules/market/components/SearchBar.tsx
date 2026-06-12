"use client";

import { useEffect, useRef, useState } from "react";

import {
  searchItems,
} from "@/services/itemSearchService";

import { ItemDefinition } from "@/types/item";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (
    item: ItemDefinition
  ) => void;
}

export default function SearchBar({
  value,
  onChange,
  onSelect,
}: SearchBarProps) {
  const [suggestions, setSuggestions] =
    useState<ItemDefinition[]>([]);

  const [open, setOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      searchItems(value, 20)
    );
  }, [value]);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      className="relative"
      ref={wrapperRef}
    >
      <input
        type="text"
        value={value}
        placeholder="Search Albion item..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none"
      />

      {open &&
        suggestions.length > 0 && (
          <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
            {suggestions.map((item) => {
              const image = `https://render.albiononline.com/v1/item/${item.uniqueName}.png`;

              return (
                <button
                  key={item.uniqueName}
                  type="button"
                  onClick={() => {
                    onSelect?.(item);

                    onChange(
                      item.displayName
                    );

                    setOpen(false);
                    setSuggestions([]);
                  }}
                  className="flex w-full items-center gap-3 border-b border-slate-800 px-4 py-3 text-left hover:bg-slate-800"
                >
                  <img
                    src={image}
                    alt={
                      item.displayName
                    }
                    className="h-10 w-10"
                  />

                  <div>
                    <div className="font-medium">
                      {item.displayName}
                    </div>

                    <div className="text-xs text-slate-400">
                      {item.uniqueName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
    </div>
  );
}