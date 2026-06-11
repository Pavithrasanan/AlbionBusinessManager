"use client";

import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MarketTable from "./components/MarketTable";
import MarketDetails from "./components/MarketDetails";

import { searchMarket } from "@/services/marketService";
import { MarketItem } from "@/types/market";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const [items, setItems] = useState<MarketItem[]>([]);
  const [selectedItem, setSelectedItem] =
    useState<MarketItem | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const results = await searchMarket(search);

        const filtered =
          city === "All"
            ? results
            : results.filter(
                (item) => item.city === city
              );

        setItems(filtered);

        if (filtered.length > 0) {
          setSelectedItem(filtered[0]);
        } else {
          setSelectedItem(null);
        }
      } catch (error) {
        console.error(error);
        setItems([]);
        setSelectedItem(null);
      }
    }

    loadData();
  }, [search, city]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            📊 Albion Market
          </h1>

          <p className="mt-2 text-slate-400">
            Search and analyze Albion market prices.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <Filters
            city={city}
            onCityChange={setCity}
          />
        </div>

        <MarketTable
          items={items}
          onSelect={setSelectedItem}
        />

        <MarketDetails
          item={selectedItem}
        />
      </div>
    </main>
  );
}