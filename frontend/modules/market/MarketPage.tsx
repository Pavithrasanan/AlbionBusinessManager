"use client";

import { useEffect, useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";
import ItemBrowser from "./components/ItemBrowser";
import FilterPanel from "./components/FilterPanel";
import MarketTable from "./components/MarketTable";
import MarketDetails from "./components/MarketDetails";
import MarketAnalyzer from "./analyzer/MarketAnalyzer";

import { searchMarket } from "@/services/marketService";
import { MarketItem } from "@/types/market";
import { ItemDefinition } from "@/types/item";
import StatsCards from "./components/StatsCards";
import OpportunityScanner from "./scanner/OpportunityScanner";
import { MarketOpportunity } from "@/types/opportunity";

export default function MarketPage() {
 const [view, setView] =
  useState<
    "market" |
    "analyzer" |
    "scanner"
  >("market");

  const [search, setSearch] =
    useState("");

  const [
    selectedDefinition,
    setSelectedDefinition,
  ] =
    useState<ItemDefinition | null>(
      null
    );

  const [city, setCity] =
    useState("All");

  const [tier, setTier] =
    useState("All");

  const [
    enchantment,
    setEnchantment,
  ] = useState("All");

  const [quality, setQuality] =
    useState("All");

  const [sort, setSort] =
    useState("profit");

const [items, setItems] =
  useState<MarketItem[]>([]);

const [loading, setLoading] =
  useState(false);

  const [
    selectedItem,
    setSelectedItem,
  ] =
    useState<MarketItem | null>(
      null
    );
    const [
  selectedOpportunity,
  setSelectedOpportunity,
] =
  useState<MarketOpportunity | null>(
    null
  );

  useEffect(() => {
    if (view !== "market") return;

    async function load() {
  try {
    setLoading(true);

    if (!search.trim()) {
      setItems([]);
      setSelectedItem(null);
      return;
    }

    const results =
      await searchMarket(search);

    setItems(results);
  } catch (err) {
    console.error(err);
    setItems([]);
  } finally {
    setLoading(false);
  }
}

    load();
  }, [search, view]);

  const filteredItems =
    useMemo(() => {
      let data = [...items];

      if (city !== "All") {
        data = data.filter(
          (i) => i.city === city
        );
      }

      if (tier !== "All") {
        data = data.filter(
          (i) =>
            i.tier === Number(tier)
        );
      }

      if (
        enchantment !== "All"
      ) {
        data = data.filter(
          (i) =>
            i.enchantment ===
            Number(enchantment)
        );
      }

      if (quality !== "All") {
        data = data.filter(
          (i) =>
            i.quality ===
            Number(quality)
        );
      }

      switch (sort) {
        case "buy":
          data.sort(
            (a, b) =>
              b.buyPrice -
              a.buyPrice
          );
          break;

        case "sell":
          data.sort(
            (a, b) =>
              b.sellPrice -
              a.sellPrice
          );
          break;

        case "tier":
          data.sort(
            (a, b) =>
              b.tier - a.tier
          );
          break;

        case "quality":
          data.sort(
            (a, b) =>
              b.quality -
              a.quality
          );
          break;

        default:
          data.sort((a, b) => {
            const pa =
              a.sellPrice -
              a.buyPrice;

            const pb =
              b.sellPrice -
              b.buyPrice;

            return pb - pa;
          });
      }

      return data;
    }, [
      items,
      city,
      tier,
      enchantment,
      quality,
      sort,
    ]);

  const browserItems =
    useMemo(() => {
      const seen =
        new Set<string>();

      return filteredItems
        .filter((item) => {
          if (
            seen.has(
              item.uniqueName
            )
          ) {
            return false;
          }

          seen.add(
            item.uniqueName
          );

          return true;
        })
        .map((item) => ({
          uniqueName:
            item.uniqueName,
          displayName:
            item.displayName,
          category:
            "Albion Item",
        }));
    }, [filteredItems]);
      useEffect(() => {
    if (
      selectedItem &&
      filteredItems.some(
        (i) => i.id === selectedItem.id
      )
    ) {
      return;
    }

    setSelectedItem(null);
  }, [filteredItems, selectedItem]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-[1800px] space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            📊 Albion Business Manager
          </h1>

          <p className="mt-2 text-slate-400">
            Market Analysis & Trading Tools
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setView("market")}
            className={`rounded-lg px-4 py-2 ${
              view === "market"
                ? "bg-blue-600"
                : "bg-slate-800"
            }`}
          >
            📊 Raw Market
          </button>

          <button
            onClick={() => setView("analyzer")}
            className={`rounded-lg px-4 py-2 ${
              view === "analyzer"
                ? "bg-blue-600"
                : "bg-slate-800"
            }`}
          >
            📈 Analyzer
          </button>
          <button
  onClick={() =>
    setView("scanner")
  }
  className={`rounded-lg px-4 py-2 ${
    view === "scanner"
      ? "bg-blue-600"
      : "bg-slate-800"
  }`}
>
  🔥 Scanner
</button>

        </div>

        {view === "market" ? (
  <>

    <SearchBar
      value={search}
      onChange={setSearch}
      onSelect={(item) => {
        setSelectedDefinition(item);
        setSearch(item.displayName);
        setSelectedItem(null);
      }}
    />

    <StatsCards
      items={
        selectedDefinition
          ? filteredItems.filter(
              (item) =>
                item.uniqueName ===
                selectedDefinition.uniqueName
            )
          : filteredItems
      }
    />

    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-3">

        <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">

          <h2 className="mb-4 text-xl font-bold">
            Items
          </h2>

          <ItemBrowser
            items={browserItems}
            selected={
              selectedDefinition?.uniqueName
            }
            onSelect={(item) => {
              setSelectedDefinition(item);
              setSearch(item.displayName);
              setSelectedItem(null);
            }}
          />

        </div>

      </div>

      <div className="col-span-5">

        <FilterPanel
          city={city}
          tier={tier}
          enchantment={enchantment}
          quality={quality}
          sort={sort}
          onCityChange={setCity}
          onTierChange={setTier}
          onEnchantmentChange={
            setEnchantment
          }
          onQualityChange={
            setQuality
          }
          onSortChange={setSort}
        />

        <div className="mt-4">

          {loading ? (

            <div className="flex h-[500px] items-center justify-center rounded-xl border border-slate-700 bg-slate-900">

              <div className="text-center">

                <div className="text-5xl animate-pulse">
                  ⏳
                </div>

                <p className="mt-4 text-slate-400">
                  Loading market data...
                </p>

              </div>

            </div>

          ) : (

            <MarketTable
              items={
                selectedDefinition
                  ? filteredItems.filter(
                      (item) =>
                        item.uniqueName ===
                        selectedDefinition.uniqueName
                    )
                  : filteredItems
              }
              onSelect={setSelectedItem}
            />

          )}

        </div>

      </div>

      <div className="col-span-4">

        <MarketDetails
          item={selectedItem}
        />

      </div>

    </div>

  </>
) : view === "analyzer" ? (
  <MarketAnalyzer
  opportunity={
    selectedOpportunity
  }
/>
) : (
 <OpportunityScanner
  items={items}
  onAnalyze={(opportunity) => {
    setSelectedOpportunity(opportunity);
    setView("analyzer");
  }}
/>
)}
      </div>
    </main>
  );
}