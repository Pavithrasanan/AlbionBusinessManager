"use client";

import { useEffect, useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";
import ItemBrowser from "./components/ItemBrowser";
import FilterPanel from "./components/FilterPanel";
import MarketTable from "./components/MarketTable";
import MarketDetails from "./components/MarketDetails";
import MarketAnalyzer from "./analyzer/MarketAnalyzer";
import OpportunityScanner from "./scanner/OpportunityScanner";
import StatsCards from "./components/StatsCards";

import { searchMarket } from "@/services/marketService";

import { MarketItem } from "@/types/market";
import { ItemDefinition } from "@/types/item";
import { MarketOpportunity } from "@/types/opportunity";
function buildUniqueName(
  base: string,
  tier: string,
  enchantment: string
) {
  // Remove any existing tier prefix
  let normalized = base.replace(/^T\d_/, "");

  // Remove any enchantment suffix
  normalized = normalized.replace(/@\d$/, "");

  // If user hasn't selected a tier yet,
  // don't invent one.
  if (tier === "All") {
    return base;
  }

  let uniqueName = `T${tier}_${normalized}`;

  if (
    enchantment !== "All" &&
    enchantment !== "0"
  ) {
    uniqueName += `@${enchantment}`;
  }

  return uniqueName;
}


export default function MarketPage() {

  const [view, setView] = useState<
    "market" | "analyzer" | "scanner"
  >("market");

  // Search textbox
  const [searchText, setSearchText] =
    useState("");

  // Search results (catalog)
  const [catalogItems, setCatalogItems] =
    useState<ItemDefinition[]>([]);

  // Selected item from catalog
  const [
    selectedDefinition,
    setSelectedDefinition,
  ] =
    useState<ItemDefinition | null>(
      null
    );


  // Actual market rows
  const [marketRows, setMarketRows] =
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

  const [city, setCity] =
    useState("All");

  const [tier, setTier] =
    useState("All");

  const [
    enchantment,
    setEnchantment,
  ] =
    useState("All");

  const [quality, setQuality] =
    useState("All");

  const [sort, setSort] =
    useState("sell");
    const computedUniqueName = useMemo(() => {
  if (!selectedDefinition) return null;

return buildUniqueName(
    selectedDefinition.defaultUniqueName ??
    selectedDefinition.imageUniqueName ??
    selectedDefinition.uniqueName,
    tier,
    enchantment
);
}, [
  selectedDefinition,
  tier,
  enchantment,
]);

  /**
   * Load market rows only after
   * an item has been selected.
   */
  useEffect(() => {

    if (
      view !== "market"
    ) {
      return;
    }

if (!computedUniqueName) {

  setMarketRows([]);
  setSelectedItem(null);

  return;
}

 async function load() {

  try {

    setLoading(true);

    console.log("selectedDefinition =", selectedDefinition);
    console.log("computedUniqueName =", computedUniqueName);

    const rows =
      await searchMarket(
        computedUniqueName!
      );

    console.log("rows =", rows);

    setMarketRows(rows);

  } catch (err) {

    console.error(err);

    setMarketRows([]);

  } finally {

    setLoading(false);

  }

}
    load();

  }, [
  computedUniqueName,
  view,
]);

  /**
   * Catalog filtering
   */

const filteredCatalog = useMemo(() => {
  let data = [...catalogItems];

  // Remove duplicates
  const seen = new Set<string>();
  data = data.filter((item) => {
    if (seen.has(item.uniqueName)) {
      return false;
    }
    seen.add(item.uniqueName);
    return true;
  });


  // Sort alphabetically
  data.sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  return data;
}, [catalogItems]);

  /**
   * Market filtering
   */

  const filteredMarket =
    useMemo(() => {

      let data =
        [...marketRows];

      if (
        city !== "All"
      ) {

        data = data.filter(
          i =>
            i.city === city
        );

      }

      if (
        quality !==
        "All"
      ) {

        data = data.filter(
          i =>
            i.quality ===
            Number(
              quality
            )
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
              b.tier -
              a.tier
          );

          break;

        case "quality":

          data.sort(
            (a, b) =>
              b.quality -
              a.quality
          );

          break;

      }

      return data;

    }, [
      marketRows,
      city,
      quality,
      sort,
    ]);
      /**
   * Browser items come from
   * the catalog, NOT market rows.
   */
const browserItems = useMemo(() => {
  const map = new Map<string, ItemDefinition>();

  filteredCatalog.forEach((item) => {
    const base = item.uniqueName
      .replace(/^T\d_/, "")
      .replace(/@\d$/, "");

    if (!map.has(base)) {
      const displayName = item.displayName
        .replace(/^Novice'?s\s+/i, "")
        .replace(/^Journeyman'?s\s+/i, "")
        .replace(/^Adept'?s\s+/i, "")
        .replace(/^Expert'?s\s+/i, "")
        .replace(/^Master'?s\s+/i, "")
        .replace(/^Grandmaster'?s\s+/i, "")
        .replace(/^Elder'?s\s+/i, "");

map.set(base, {
  ...item,

  // Internal base name
  uniqueName: base,

  // UI name
  displayName,

  // Preserve original backend item
  imageUniqueName: item.uniqueName,

  // Preserve original backend item
  defaultUniqueName: item.uniqueName,
});
    }
  });

  return Array.from(map.values()).sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );
}, [filteredCatalog]);

  useEffect(() => {
    if (
      selectedItem &&
      filteredMarket.some(
        (i) => i.id === selectedItem.id
      )
    ) {
      return;
    }

    setSelectedItem(null);
  }, [filteredMarket, selectedItem]);

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
            onClick={() => setView("scanner")}
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
  value={searchText}
  onChange={setSearchText}
  onResults={setCatalogItems}
/>

            <StatsCards
              items={filteredMarket}
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
                      items={filteredMarket}
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
            items={marketRows}
            onAnalyze={(opportunity) => {
              setSelectedOpportunity(
                opportunity
              );
              setView("analyzer");
            }}
          />

        )}

      </div>
    </main>
  );
}