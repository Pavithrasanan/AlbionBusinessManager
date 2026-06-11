"use client";

import { useEffect, useState } from "react";

import OpportunityTable from "./OpportunityTable";
import OpportunityDetails from "./OpportunityDetails";

import { searchOpportunities } from "@/services/opportunityService";
import { MarketOpportunity } from "@/types/opportunity";

export default function MarketAnalyzer() {
  const [search, setSearch] = useState("");

  const [opportunities, setOpportunities] =
    useState<MarketOpportunity[]>([]);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<MarketOpportunity | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadData() {
      if (!search.trim()) {
        setOpportunities([]);
        setSelectedOpportunity(null);
        return;
      }

      try {
        setLoading(true);

        const results =
          await searchOpportunities(search);

        setOpportunities(results);

        if (results.length > 0) {
          setSelectedOpportunity(results[0]);
        } else {
          setSelectedOpportunity(null);
        }
      } catch (error) {
        console.error(error);
        setOpportunities([]);
        setSelectedOpportunity(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            📈 Market Analyzer
          </h1>

          <p className="mt-2 text-slate-400">
            Find the best trading opportunities across Albion cities.
          </p>
        </div>

        <input
          type="text"
          value={search}
          placeholder="Search item (e.g. T6 Bag)"
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 outline-none"
        />

        {loading && (
          <div className="text-slate-400">
            Loading opportunities...
          </div>
        )}

        {!loading && (
          <>
            <OpportunityTable
              opportunities={opportunities}
              onSelect={
                setSelectedOpportunity
              }
            />

            <OpportunityDetails
              opportunity={
                selectedOpportunity
              }
            />
          </>
        )}

      </div>
    </main>
  );
}