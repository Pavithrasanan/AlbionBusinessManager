"use client";

import { useEffect, useRef, useState } from "react";

import {
  searchItems,
} from "@/services/itemSearchService";

import { ItemDefinition } from "@/types/item";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
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
      searchItems(value)
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
          <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
            {suggestions.map(
              (item) => (
                <button
                  key={
                    item.uniqueName
                  }
                  type="button"
                  onClick={() => {
                    onChange(
                      item.displayName
                    );
                    setOpen(false);
                  }}
                  className="block w-full border-b border-slate-800 px-4 py-3 text-left hover:bg-slate-800"
                >
                  <div className="font-medium">
                    {
                      item.displayName
                    }
                  </div>

                  <div className="text-xs text-slate-400">
                    {
                      item.uniqueName
                    }
                  </div>
                </button>
              )
            )}
          </div>
        )}
    </div>
  );
}