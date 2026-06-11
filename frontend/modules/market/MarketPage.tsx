"use client";

import { useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MarketTable from "./components/MarketTable";



import { MarketItem } from "@/types/market";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const items: MarketItem[] = [
    {
      id: "1",
      name: "T4 Bag",
      tier: 4,
      enchantment: 0,
      city: "Bridgewatch",
      buyPrice: 1000,
      sellPrice: 1200,
    },
    {
      id: "2",
      name: "T5 Bag",
      tier: 5,
      enchantment: 0,
      city: "Bridgewatch",
      buyPrice: 2500,
      sellPrice: 2900,
    },
    {
      id: "3",
      name: "T6 Bag",
      tier: 6,
      enchantment: 0,
      city: "Martlock",
      buyPrice: 6200,
      sellPrice: 7100,
    },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCity =
        city === "All" || item.city === city;

      return matchesSearch && matchesCity;
    });
  }, [search, city]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            📊 Market
          </h1>

          <p className="mt-2 text-slate-400">
            Search and analyze market items.
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

        <MarketTable items={filteredItems} />
      </div>
    </main>
  );
}